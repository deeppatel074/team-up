import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset,
} from '../firebase/FirebaseFunctions';
import axios from "axios";
import firebase from "firebase/compat/app"

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
      let idToken = await firebase.auth().currentUser.getIdToken();
      axios.post("http://localhost:4000/users/login", null, {
        headers: {
          // "Content-Type": "application/json",
          "Authorization": "Bearer " + idToken
          // "Accept":"application/json"
        },
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error);
      })
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };


  if (currentUser) {
    console.log(currentUser);
    return <Navigate to='/home' />;
  }
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className='form-group'>
          <label>
            Email:
            <input
              className='form-control'
              name='email'
              id='email'
              type='email'
              placeholder='Email'
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Password:
            <input
              className='form-control'
              name='password'
              type='password'
              placeholder='Password'
              autoComplete='off'
              required
            />
          </label>
        </div>
        <button type='submit'>Log in</button>

        <button className='forgotPassword' onClick={passwordReset}>
          Forgot Password
        </button>
      </form>

      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignIn;
