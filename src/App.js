import './App.css'

import React, { useState, useEffect } from 'react';
import { GoogleLogin, } from 'react-google-login';
import { gapi } from 'gapi-script';
import Recherche from './components/Recherche';

function App() {
  const [search, setSearch] = useState(false)
  const clientId = process.env.REACT_APP_CLIENT_ID_GOOGLE;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    setSearch(true)
  };

  const onFailure = (err) => {
    console.log('failed', err);
  };
  console.log(process.env.REACT_APP_CLIENT_ID_GOOGLE+"Rien")
  const Login = () => {
    return (
      <div className='login'>
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
      </div>
    )
  }
  if (!search) {
    return (
      <Login />
    );
  } else {
      return (
        <div>
          <Recherche />
          <button className='logout' onClick={() => setSearch(false)}>Se deconnecter</button>
        </div>
      )
    }
}
export default App;
