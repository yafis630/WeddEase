import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './components/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import StartPage from './components/StartPage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Contact from './components/Contact';
import Categories from './components/Categories';


ReactDOM.createRoot(document.querySelector("#root")).render(<Main />);
