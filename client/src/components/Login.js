import React, { useState } from "react";
import axios from 'axios';


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

const [user, setUser] = useState({
  username: '',
  password: ''
})

const handleChange = e => {
  setUser({
    ...user, [e.target.name]: e.target.value
  })
}

const handleSubmit = e => {
  e.preventDefault();
  axios.post('http://localhost:5000/api/login', user)
  .then(response => {
    console.log(response)
    localStorage.setItem('token', response.data.payload);
    // props.history.push('/bubbles')
  })
  .catch(error => {
    console.log(error.response.data, 'There is a problem')
  })
}

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <h3>Sign In Here</h3>
        <form onSubmit={handleSubmit}>
          <input type='username' name='username' placeholder='Username' value={user.username} onChange={handleChange} />
          <input type='password' name='password' placeholder='Password' value={user.password} onChange={handleChange} />

          <button type='submit'>Sign In</button>
        </form>
    </>
  );
};

export default Login;
