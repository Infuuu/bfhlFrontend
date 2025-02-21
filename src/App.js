import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filterOptions = [
    { value: 'numbers', label: 'Numbers' },
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'highest_alphabet', label: 'Highest Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (!inputData.trim()) {
        setError('Input cannot be empty');
        return;
      }

      const parsedData = JSON.parse(inputData);

      const apiResponse = await fetch('https://bfhl-l5gf.onrender.com/BAJAJ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      const data = await apiResponse.json();
      
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="App">
      <h1>22BCS16746</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder='Enter JSON data (e.g., {"data": ["M","1","334","4","B"]})'
          className="api-input"
        />
        <button type="submit">Submit</button>
      </form>

      {error && <p className="error">{error}</p>}

      {response && (
        <div>
          <label className="filter-label">Multi Filter</label>
          <Select
            isMulti
            options={filterOptions}
            value={filterOptions.filter(option => selectedFilters.includes(option.value))}
            onChange={(selected) => setSelectedFilters(selected.map(option => option.value))}
            className="custom-select"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '8px',
                borderColor: '#ccc',
                boxShadow: 'none',
                '&:hover': { borderColor: '#aaa' },
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: '#e0e0e0',
                borderRadius: '4px',
                padding: '2px 5px',
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: '#333',
                fontSize: '14px',
              }),
              multiValueRemove: (base) => ({
                ...base,
                cursor: 'pointer',
                '&:hover': { backgroundColor: '#bbb', color: 'white' },
              }),
            }}
          />

          <div className="response">
            {selectedFilters.includes('numbers') && (
              <div>
                <h3>Numbers:</h3>
                <p>{response.numbers.length > 0 ? response.numbers.join(', ') : 'None'}</p>
              </div>
            )}
            {selectedFilters.includes('alphabets') && (
              <div>
                <h3>Alphabets:</h3>
                <p>{response.alphabets.length > 0 ? response.alphabets.join(', ') : 'None'}</p>
              </div>
            )}
            {selectedFilters.includes('highest_alphabet') && (
              <div>
                <h3>Highest Alphabet:</h3>
                <p>{response.highest_alphabet.length > 0 ? response.highest_alphabet.join(', ') : 'None'}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
