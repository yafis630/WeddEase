import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import StartPage from './components/StartPage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
//import "./styless.css";


ReactDOM.createRoot(document.querySelector("#root")).render(<LoginForm />);
