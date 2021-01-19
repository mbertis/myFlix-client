// import React, { useState } from 'react';
// import Form from "react-bootstrap/form";
// import Button from "react-bootstrap/button";
// import axios from "axios";
// import "./registration-view.scss";

// export function RegistrationView(props) {
//   const [ username, setUsername ] = useState('');
//   const [ password, setPassword ] = useState('');
//   const [ email, setEmail ] = useState('');
//   const [ birthday, setBirthday ] = useState('');

//   const handleSubmit = (e) => {
//     // Prevents default of refreshing page on Submit/Register
//     e.preventDefault();
//     // console.log(username, password, email, birthday);
//     // Send a request to the server for authentication then call props.onLoggedIn(username)
//     axios.post("https://madison-myflix.herokuapp.com/users", {
//       Username: username,
//       Password: password,
//       Email: email,
//       Birthday: birthday
//     })
//     .then(response => {
//       const data = response.data;
//       console.log(data);
//       window.open("/", "_self"); // the "_self" argument is necessary so that the page will open in the current tab
//     })
//     .catch(e => {
//       console.log("error registering the user")
//     });
//   };

//   return (
//     <Form className="registration-form">
//     <h3>Create an Account for myFlix</h3>
//     <Form.Group controlid="formBasicUsername">
//       <Form.Label>Username:</Form.Label>
//       <Form.Control
//         type="text"
//         value={username}
//         placeholder="Enter Username"
//         onChange={(e) => setUsername(e.target.value)}
//       />
//     </Form.Group>

//     <Form.Group controlid="formBasicPassword">
//       <Form.Label>Password:</Form.Label>
//       <Form.Control
//         type="password"
//         value={password}
//         placeholder="Enter Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//     </Form.Group>

//     <Form.Group controllid="formBasicEmail">
//       <Form.Label>Email Adress:</Form.Label>
//       <Form.Control
//       type="email"
//       value={email}
//       placeholder="Enter Email Address"
//       onChange={e => setEmail(e.target.value)}/>
//     </Form.Group>

//     <Form.Group controlid="formBasicBirthday">
//       <Form.Label>Birthday:</Form.Label>
//       <Form.Control
//       type="string"
//       value={birthday}
//       placeholder="01/01/2001"
//       onChange={e => setBirthday(e.target.value)}/>
//     </Form.Group>
//     <Button variant="info" type="submit" onClick={handleSubmit}>
//       Create Account
//     </Button>
//   </Form>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import "./registration-view.scss";

import { Link } from "react-router-dom";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    axios
      .post("https://madison-myflix.herokuapp.com/users", createdUser)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        alert("User created successfully");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e.response);
        alert(e.response.data.errors[0].msg);
      });
  };

  return (
    <Container>
      <br />
      <br />
      <Form className="registration-form">
        <h3>Create An Account</h3>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="example@website.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDate">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            placeholder="12/31/1986"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>

        <Button variant="info" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Link to={`/`}>
          <Button variant="secondary" type="submit">
            Cancel
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
