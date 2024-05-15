import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router-dom/dist';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const {setUser,user} = useContext(UserContext);
  const navigate = useNavigate();
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
     const data =  await axios.post('/login',{email,password});
     setUser(data);
      alert('Login successful');
      navigate('/account');
     
    }
   catch (e) {
    alert('Login failed')
   }
  }

  useEffect(()=>{
    if (user) {
      navigate('/account');
    }
  },[user])

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
          <input type="email" placeholder='your@email.com'
            value={email}
            onChange={ev => setEmail(ev.target.value)} />
          <input type="password" placeholder='password'
            value={password}
            onChange={ev => setPassword(ev.target.value)} />
          <button className='primary'> Login </button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet ?
            <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>

    </div>
  );
}

export default LoginPage