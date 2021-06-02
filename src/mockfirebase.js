import firebase from 'firebase'


var firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDsUXlick1r8r5g2OUczYLlZs1YrSjPJjo",
  authDomain: "project-workday.firebaseapp.com",
  projectId: "project-workday",
  storageBucket: "project-workday.appspot.com",
  messagingSenderId: "1020739224236",
  appId: "1:1020739224236:web:c5418d436dcb4a2fc35509",
  measurementId: "G-QGKJW87ZKB"
  });

var database=firebaseConfig.firestore()
const app=firebaseConfig
export const auth=app.auth()
export  {app,database}

