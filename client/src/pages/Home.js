import React, { useState } from 'react';

const Home = () => {
  const [zipcode, setZipcode] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate the zipcode
    const isValidZipcode = /^\d{4}$/.test(zipcode);

    if (isValidZipcode) {
      // Zipcode is valid, perform the form's normal functionality
      setError('');
      e.target.submit(); // Submit the form
    } else {
      // Zipcode is invalid, display an error message and clear the input
      setError('Please enter a valid 4-digit zipcode.');
      setZipcode(''); // Clear the input
    }
  };

  const handleZipcodeChange = (e) => {
    setZipcode(e.target.value);
  };

  return (
    <div className='container'>
      <h1>Weather App</h1>
      <div className='input'>
        <form method='POST' action='/search' onSubmit={handleFormSubmit}>
          <input
            type='text'
            placeholder='Enter a valid RSA zipcode..'
            name='zipcode'
            value={zipcode}
            onChange={handleZipcodeChange}
          />
          <button type='submit'>Search</button>
        </form>
       
      </div>
      <br>
      </br>
      {error && <p className='error'>{error}</p>}
    </div>
  );
};

export default Home;


