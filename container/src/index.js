import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './index.css';
import { App } from './app';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBFumNuinkzsQtVtbg2ZEZbgUIQo_Bv7AE',
  authDomain: 'microfrontends-1bd03.firebaseapp.com',
  projectId: 'microfrontends-1bd03',
  storageBucket: 'microfrontends-1bd03.appspot.com',
  messagingSenderId: '205696778254',
  appId: '1:205696778254:web:628bfcc791e02b9e01bc5f',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
