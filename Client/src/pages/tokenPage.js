import React from "react";
import SendAuthoredMessage from "../components/sendAuthedMessage.js";
import CheckAuth from "../components/checkAuth.js";

const TestToken = () => {
  const messageToSend = {"message" : "ceci est le message"};
  const route = "/token/message";
  return (
    <div>
      <CheckAuth />
      <SendAuthoredMessage messageToSend={messageToSend} route={route}/>
    </div>
  )
};

export default TestToken