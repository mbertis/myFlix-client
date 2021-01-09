import React, { useState } from 'react';
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    // Prevents default of refreshing page on Submit/Register
    e.preventDefault();
    // console.log(username, password, email, birthday);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    axios.post("https://madison-myflix.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open("/", "_self"); // the "_self" argument is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log("error registering the user")
    });
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
    <Button variant="info" type="submit" onClick={handleSubmit}>
      Create Account
    </Button>
  </Form>
  );
}
