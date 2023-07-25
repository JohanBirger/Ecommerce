import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useParams, useNavigate } from 'react-router-dom';
import { openLoginModal } from '../services/Modals/ModalService';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [passwordVerify, setVerifyPassword] = useState('');
  const [passwordMatch,setPasswordMatch] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const { '*' : resetToken } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    checkValidToken();
  },[])

  useEffect(() => {
    comparePass();
  }, [password, passwordVerify]);
  
  const checkValidToken = async () =>{
    try{
        console.log('checking token')
        const response = await axios.get(`${BACKEND_URL}/user/resetpassword/${resetToken}`)
        if (response.data){
            setValidToken(true);
            console.log('token valid')
        }
        else{
            setValidToken(false);
        }
    } catch (error:any){
        console.log('Reset Password error:', error.response?.data.message|| error.message)
    }
  };

  const comparePass = async ()=>{
    console.log("comparePass")
    if(password === passwordVerify){
        await setPasswordMatch(true);
    }
    else{
        await setPasswordMatch(false);
    }
  }

  const resetPassword = async (e: React.FormEvent) => {
    const event = e as React.KeyboardEvent<HTMLFormElement>;
    e.preventDefault();
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on enter key press
      return;
    }
    comparePass();
    if(passwordMatch){
        console.log("match!")
        console.log(resetToken);
        try {
            const response = await axios.patch(`${BACKEND_URL}/user/resetpassword/${resetToken}`,{password:password});
            console.log(`Password Changed ${response.data}`);
        } catch (error:any) {
            console.error('Reset Password error:', error.response?.data.message || error.message);
        }
        navigate('/');
        openLoginModal();

    }
   

  };

  return (
    <>
    {validToken ? (
    <>
    <div className='p-2 min-h-screen flex flex-col justify-center items-center space-y-1'>
  
      <form onSubmit={resetPassword}>
        <div className='w-full bg-white mx-auto flex flex-col items-center'>
        <label>New password:</label>
        <input type='password' autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} className='border w-full border-gray-300 text-md p-2 h-12 rounded-md focus:outline-none focus:ring-none focus:ring-none w-64 pl-2' />
        <label>Re-enter password:</label>
        <input type='password' autoComplete="off" value={passwordVerify} onChange={(e) => setVerifyPassword(e.target.value)} className='border w-full border-gray-300 text-md p-2 h-12 rounded-md focus:outline-none focus:ring-none focus:ring-none w-64 pl-2' />
        {!passwordMatch && <div className='text-red-500'>Passwords must match</div> }
        <button type='submit' className='btn-wide pt-3'>Send</button>
        </div>
      </form>
   </div>
    </>
    ) : (
    <>
    <div className='p-2 min-h-screen flex flex-col justify-center items-center space-y-1'>
      <div className ='flex flex-flow justify-center items-center'>
      <span className='text-black'>Invalid reset token</span>
      </div>
    </div>
    </>
    )}
    </>
  );
};

export default ResetPassword;