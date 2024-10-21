import React from 'react';
import { Outlet } from "react-router-dom";

const App = () => {
  return (
   <>
     <Outlet context/>
   </>
  );
};

export default App;
