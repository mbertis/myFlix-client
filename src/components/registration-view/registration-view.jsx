import React, { useState } from 'react';
import axios from 'axios';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    // Prevents default of refreshing page on Submit/Register
    e.preventDefault();
    console.log(username, password, email, birthday);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    props.onLoggedIn(username); 
  };

  return (
    <Form className="registration-form">
    <h3>Create an Account for myFlix</h3>
    <Form.Group controlId="formBasicUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        value={username}
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />
    </Form.Group>

    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type="password"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Group>

    <Form.Group controllId="formBasicEmail">
      <Form.Label>Email Adress:</Form.Label>
      <Form.Control
      type="email"
      value={email}
      placeholder="Enter Email Address"
      onChange={e => setEmail(e.target.value)}/>
    </Form.Group>

    <Form.Group controlId="formBasicBirthday">
      <Form.Label>Birthday:</Form.Label>
      <Form.Control
      type="string"
      value={birthday}
      placeholder="01/01/2001"
      onChange={e => setBirthday(e.target.value)}/>
    </Form.Group>
    <Button variant="primary" type="submit" onClick={handleSubmit}>
      Create Account
    </Button>
  </Form>
  );
}
