import React, { useState } from "react";
import Form from "react-bootstrap/form";
import Button from "react-bootstrap/button";
import axios from "axios";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // Prevents default of refreshing page on Submit
    e.preventDefault();
    // console.log(username, password);
    // Send a request to the server for authentication then call props.onLoggedIn(username)
    axios.post("https://madison-myflix.herokuapp.com/login", {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data); // changed from props.onLoggedIn(username) because I need the token as well as the username
    })
    .catch(e => {
      console.log("no such user")
    });
  };

  return (
    <Form className="login-form">
      <h3>Sign In to myFlix</h3>
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
      <Button variant="info" type="submit" onClick={handleSubmit}>
        Sign In
      </Button>
    </Form>
  );
}
