import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyDwxvv2Tqew1voo1Z9Bomcvg3W4wAuStsU",
    authDomain: "chat-eau.firebaseapp.com",
    databaseURL:
      "https://chat-eau-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chat-eau",
    storageBucket: "chat-eau.appspot.com",
    messagingSenderId: "695649399235",
    appId: "1:695649399235:web:977b9501085cabefae8d76",
    measurementId: "G-C7EQFZNW2Q",
  })
  .auth();
