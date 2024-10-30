import React from "react";
import SendAuthoredMessage from "../components/sendAuthedMessage.js";

const TestToken = () => {
  const messageToSend = {"message" : "ceci est le message", "id" : 12};
  const route = "/token/message";
  return (
    <div>
      <SendAuthoredMessage messageToSend={messageToSend} route={route}/>
    </div>
  )
};

export default TestToken