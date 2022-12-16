import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {doCreateUserWithEmailAndPassword} from '../firebase/FirebaseFunctions';
import {AuthContext} from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
import firebase from "firebase/compat/app";
import axios from "axios";

function SignUp() {
  const {currentUser} = useContext(AuthContext);
  const [pwMatch, setPwMatch] = useState('');
  const handleSignUp = async (e) => {
    e.preventDefault();
    const {email, passwordOne, passwordTwo} = e.target.elements;
    if (passwordOne.value !== passwordTwo.value) {
      setPwMatch('Passwords do not match');
      return false;
    }

    try {
      await doCreateUserWithEmailAndPassword(
        email.value,
        passwordOne.value
      );
      let idToken= await firebase.auth().currentUser.getIdToken()
       
      // console.log(idToken);
      try {
        axios.post("http://localhost:4000/users/signup", null, {
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
  } catch (e) {
    console.log(e);
  }
      // console.log(idToken);
      // console.log(await currentUser.uid);
  
      // console.log(reponse);
      // await axios.post()
    } catch (error) {
      // alert(error);
    }
  };

  

  // console.log(currentUser);

  if (currentUser) {
    return <Navigate to='/home' />;
  }

  return (
    <div>
      <h1>Sign up</h1>
      {pwMatch && <h4 className='error'>{pwMatch}</h4>}
      <form onSubmit={handleSignUp}>
        <div className='form-group'>
          <label>
            Email:
            <input
              className='form-control'
              required
              name='email'
              type='email'
              placeholder='Email'
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Password:
            <input
              className='form-control'
              id='passwordOne'
              name='passwordOne'
              type='password'
              placeholder='Password'
              autoComplete='off'
              required
            />
          </label>
        </div>
        <div className='form-group'>
          <label>
            Confirm Password:
            <input
              className='form-control'
              name='passwordTwo'
              type='password'
              placeholder='Confirm Password'
              autoComplete='off'
              required
            />
          </label>
        </div>
        <button id='submitButton' name='submitButton' type='submit'>
          Sign Up
        </button>
      </form>
      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignUp;
