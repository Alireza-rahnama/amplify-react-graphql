import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [newCryptoCurrency, setNewCryptoCurrency] = useState('');

  useEffect(() => {
    const fetchPrice = async (cryptoCurrency) => {
      const response = await fetch(`https://www.tradingview.com/symbols/${cryptoCurrency}/price`);
      const data = await response.json();
      return data;
    };

    cryptoCurrencies.forEach(async (cryptoCurrency) => {
      const priceData = await fetchPrice(cryptoCurrency);
      console.log(`${cryptoCurrency}: $${priceData.price}`);
    });
  }, [cryptoCurrencies]);

  const handleAddCryptoCurrency = (e) => {
    e.preventDefault();
    setCryptoCurrencies([...cryptoCurrencies, newCryptoCurrency]);
    setNewCryptoCurrency('');
  };

  return (
      <div>
        <h1>Crypto Currencies</h1>
        <ul>
          {cryptoCurrencies.map((cryptoCurrency) => (
              <li key={cryptoCurrency}>{cryptoCurrency}</li>
          ))}
        </ul>
        <form onSubmit={handleAddCryptoCurrency}>
          <input
              type="text"
              value={newCryptoCurrency}
              onChange={(e) => setNewCryptoCurrency(e.target.value)}
          />
          <button type="submit">Add Crypto Currency</button>
        </form>
      </div>
  );
};

export default App;
