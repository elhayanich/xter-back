const SendAuthoredMessage = () => {
    localStorage.removeItem("token");
    navigate('/login');
}

export default SendAuthoredMessage;
