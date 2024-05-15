
import {Route, Routes} from 'react-router-dom';
import './App.css'
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './Pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './userContext';
import Account from './Pages/Account';

axios.defaults.baseURL = 'http://localhost:4000'; 
axios.defaults.withCredentials = true;

function App() {
 

  return (
   <UserContextProvider>
  <Routes>
    <Route path='/' element={<Layout />}>
    <Route index element={<IndexPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path = "/account/:subpage?" element={<Account />} /> 
   
    </Route>
   
  </Routes>
  </UserContextProvider>
  )
}

export default App
