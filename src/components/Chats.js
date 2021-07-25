import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../components/firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import "../index.css";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const { loading, setLoading } = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");

      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "7ecadf05-dba3-499b-b124-d7e1ebe719f1",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "5470eb44-0839-4b0d-8bde-537e97d68acc",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chat-eau</div>
        <div className="logout-tab" onClick={handleLogout}>
          Sign Out
        </div>
      </div>
      <ChatEngine
        height="calc(100vh-66px)"
        projectID="7ecadf05-dba3-499b-b124-d7e1ebe719f1"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};
export default Chats;
