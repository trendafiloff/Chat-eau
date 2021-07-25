import React from "react";
import { GoogleOutlined } from "@ant-design/icons";
import "../index.css";
import "firebase/app";

import { auth } from "../components/firebase";
import firebase from "firebase/app";

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h1> Welcome to Chat-eau!</h1>
        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          <GoogleOutlined /> Sign in with Google
        </div>
      </div>
    </div>
  );
};

export default Login;
