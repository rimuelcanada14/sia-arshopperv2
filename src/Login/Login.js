import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Outlet,} from 'react-router-dom';;

function Login() {
  const [setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/hello-world/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Hello, Login!</h1>
      <p>New User?<Link to ="/signup" className = "signup-link">Sign Up</Link></p>
    </div>
  );
}

export default Login;