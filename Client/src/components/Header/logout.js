import { Navigate} from "react-router-dom";

const SendAuthoredMessage = () => {
    localStorage.removeItem("token");
    Navigate('/login');
}

export default SendAuthoredMessage;
