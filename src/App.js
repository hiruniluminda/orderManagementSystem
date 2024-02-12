// Import necessary modules from React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Request from './components/request';
import Order from './components/order';
import Price from './components/prices';
import Check from './components/check';
import Trash from './components/trash';
import Login from './components/login';

import './components/navbarcom';


import CreateLog from './components/createLog';
import ForgotPassword from './components/forgotPassword';
import NewCredential from './components/newCredential';
import PasswordUpdate from './components/passwordUpdate';

import Nav from "./components/navbarcom";

import Test from "./components/test";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/nav" element={<Nav/>} />



        <Route path="/login" element={<Login/>} />
        <Route path="/createLog" element={<CreateLog/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/newCredential" element={<NewCredential/>} />
        <Route path="/passwordUpdate" element={<PasswordUpdate/>} />


        <Route path='/' element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/prices" element={<Price />} />
        <Route path="/request" element={<Request />} />
        <Route path="/check" element={<Check />} />
        <Route path="/trash" element={<Trash />} />
      </Routes>
    </Router>
  );
}

export default App;
