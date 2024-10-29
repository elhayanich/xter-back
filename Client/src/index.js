import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App';

import HomePage from './pages/homePage';
import RegisterPage from './components/register';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/ProfilePage';
import HomePageVisitor from './pages/homePageVisitor';
import TestToken from './pages/tokenPage';
import TestToken2 from './pages/tokenPage2';


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePageVisitor />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/user/:user_id",
        element: <ProfilePage />,
      },
      {
        path: "/testToken",
        element: <TestToken />,
      },
      {
        path: "/testToken2",
        element: <TestToken2 />,
      },
      {
        path: "/home",
        element: <HomePage/>,
      }
    ],
  },
]); 



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

