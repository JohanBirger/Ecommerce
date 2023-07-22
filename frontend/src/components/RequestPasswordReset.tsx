import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const RequestResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [done, setDone] = useState(false);

  const requestResetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const user = await axios.post(`${BACKEND_URL}/user/find`,{ email });
      const userData = user.data;
      await axios.patch(`${BACKEND_URL}/user/${userData}/reset-token`);
      
      setStatus('success');
      setEmail('');
      setDone(true);
      
    } catch (error:any) {
        console.error('Reset Password error:', error.response?.data.message || error.message);
        setStatus(error.response?.data.message || error.message);
    }
  };

  const redo = async () =>{
    console.log('here')
    window.location.reload();
  }

  return (
    <>
    {done ? ( 
        <div className='p-2 min-h-screen flex flex-col justify-center items-center space-y-1'>
        <div className='p-5 border rounded'>
        <div className='text-green-500 p-5'>Resetlink sent to email</div>
        <div>
            <button className='btn-wide' onClick={redo}>Send again</button>
        </div>
        </div>
        </div>
        ):(
        <div className='p-2 min-h-screen flex flex-col justify-center items-center space-y-1'>
            <div className='p-5 border rounded'>
            <span className='text-black'>Enter an email to send a resetlink</span>
            <div className ='flex flex-flow justify-center items-center'>
            <form onSubmit={requestResetPassword}>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='border w-full border-gray-300 text-md p-2 h-12 rounded-md focus:outline-none focus:ring-none focus:ring-none w-64 pl-2' />
            {status === 'success' ? (<div className='text-green-500'>Resetlink sent to email</div>):(<div className='text-red-500'>{status}</div>)}
            <button type='submit' className='btn-wide'>Send</button>
            </form>
            </div>
            </div>
        </div>
    )}
    </>
  );
};

export default RequestResetPassword;