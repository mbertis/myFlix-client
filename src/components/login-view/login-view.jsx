import React, { useState } from 'react';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    // Prevents default of refreshing page on Submit
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    axios
    .post("https://madison-myflix.herokuapp.com/users")
    .then((response) => {
      const username = response.username;
      props.onLoggedIn(username);
    })
    .catch(function (error) {
      console.log('no user found');
    });    
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}