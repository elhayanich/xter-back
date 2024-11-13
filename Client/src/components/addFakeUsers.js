import {useState, useEffect} from "react";
import axios from "axios";

const AddFakeUsers = () => {
    const [error, setError] = useState('');
    const [fakeProfilesList, setFakeProfilesList] = useState([]);
    // const [fakeMessagesList, setFakeMessagesList] = useState([]);

    // récupérer la liste de faux utilisateurs 1 et les messages 
    useEffect(() => {
        //get fake users
        axios
          .get("http://localhost:3310/register/fake-users")
          .then((response) => {
            setFakeProfilesList(response.data);
            console.log("Fake users loaded:", response.data);
          })
          .catch((e) => {
            setError("Failed to load fake users");
            console.error(e);
          });
          //get fake messages
          // axios
          // .get("http://127.0.0.1:3310/messages/fake-messages")
          // .then((response) => {
          //   setFakeProfilesList(response.data);
          //   console.log("Fake messages loaded:", response.data);
          // })
          // .catch((e) => {
          //   setError("Failed to load fake messages");
          //   console.error(e);
          // });
      }, []);

    // poster la liste de faux utilisateurs dans "user"
    const handleUsersClick = () => {
        fakeProfilesList.map(profile => {
            const username = profile.username;
            const email = profile.email;
            const password = profile.password;

            axios.post("http://localhost:3310//register", {
                    username,
                    email,
                    password
                })
            .then((response) => {
                console.log("User added:", response.data);
            })
            .catch((e) => {
                setError(e.message)
                console.error(e);
            });
        });
};
    const handleMessagesClick = () => {
      axios
          .post("http://localhost:3310/messages/fake-messages")
          .then((response) => {
              console.log("Message added:", response.data);
          })
          .catch((e) => {
              setError(e.message);
              console.error(e);
          });
    };

    return (
        <div className="flex justify-center items-center">
            <button type="button" onClick={handleUsersClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add fake users Set 1</button>
            <button type="button" onClick={handleMessagesClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add fake messages Set 1</button>
            {error && <p>{error}</p>}
        </div>
    )
}

export default AddFakeUsers;