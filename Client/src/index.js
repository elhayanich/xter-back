import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';

import HomePage from './pages/homePage';

import RegistrationPage from './pages/registerPage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
<<<<<<< HEAD
      {
        path: "/writemessage",
        element: <MessageInput />,
      },
      {
        path: "/registerPage",
        element: <RegistrationPage />,
      },
=======
>>>>>>> 8e741d9f278c6a943224e721b2cddcd1580acc4b
    ],
  },
]); 



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

