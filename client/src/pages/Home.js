import React, { Component } from 'react';

const Home = () =>{
    return(
    <div className='container'>
        <h1>Weather App</h1>
       <div className='input'>
	        <form method='POST' action='/search'>
	         <input type='text' placeholder='Enter a valid RSA zipcode..' name='zipcode'/>
	         <button type="submit">Search</button>
	        </form>
         </div>

    </div>        

    )
}

export default Home;