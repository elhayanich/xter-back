import React, { useEffect, useState } from "react";
import axios from "axios";

const GeneralInfos = () => {
  const [messageCount, setMessageCount] = useState(0); 

  useEffect(() => {
    const fetchMessageCount = async () => {
      try {
        const response = await axios.get('http://localhost:3310/messages');
        if (response.status === 200) {
          setMessageCount(response.data.length); 
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
      }
    };

    fetchMessageCount();
  }, []); 

  return (
    <div className="grid grid-cols-2 gap-4 mx-auto">
      <div className="w-64 h-64 bg-white border-4 border-pink-500 rounded-lg flex items-center justify-center">
        <h2 className="text-xl font-bold">{messageCount} Messages</h2>
      </div>
      <div className="w-64 h-64 bg-white border-4 border-pink-500 rounded-lg"></div>

    </div>
  );
};

export default GeneralInfos;

