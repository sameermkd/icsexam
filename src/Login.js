import React, { useState } from "react";
import ReactDOM from "react-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import "./Login.css";
import Admin from "./Admin";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit}>
      <TextField id="outlined-basic" label="Username" variant="outlined" type="text" name="uname" required className="user"/>
          {renderErrorMessage("uname")}
          <br/>
          <br/>
      <TextField id="outlined-basic" label="Password" variant="outlined" type="password" name="pass" required className="pass"/>
          {renderErrorMessage("pass")}
      
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </Box>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>
                <Admin />
            </div> : renderForm}
      </div>
    </div>
  );
}

export default App;