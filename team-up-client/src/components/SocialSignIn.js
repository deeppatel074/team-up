import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import axios from 'axios'
import firebase from "firebase/compat/app"

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
      let idToken = await firebase.auth().currentUser.getIdToken();
      try {
          
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
  } catch (e) {
    console.log(e);
  }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <img
        onClick={() => socialSignOn('google')}
        alt='google signin'
        src='/imgs/btn_google_signin.png'
      />
      <img
        onClick={() => socialSignOn('facebook')}
        alt='facebook signin'
        src='/imgs/facebook_signin.png'
      />
    </div>
  );
};

export default SocialSignIn;
