import React from 'react';
import ReactDOM from 'react-dom/client';

import "bootstrap/dist/css/bootstrap.min.css";

import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Contact from './components/Contact';

import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import WorkerCategory from './components/WorkerCategory';
import WorkerHome from './components/WorkerHome';
import catHolder from './components/CategoryButtons';
import CategoryButtons from './components/CategoryButtons';

ReactDOM.createRoot(document.querySelector("#root")).render(<BrowserRouter><App /></BrowserRouter>);
