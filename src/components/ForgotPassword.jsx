import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import {useNavigate } from "react-router-dom";


export default function ForgotPassword() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  
  let navigate = useNavigate();

  const fetchEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    // axios.post('/users/forgot-password', {email})
    axios.post('https://bunzl-backend.onrender.com/users/forgot-password', {email})
    .then(res => {
      if(res.data === "User not Found") {
        setError(true)
        setMessage(false)
        setLoading(false)
      } if (res.data === "Code Sent") {
        

        setTimeout(() => {
          setLoading(false)
          setMessage(true)
          navigate("https://bunzl-backend.onrender.com/users/change-password")
        },2500)

      }
    })

  }


  
  return (
    <div className="login-container">

      <div className='login-card'>
      <form className="login-form">

      <h2 className='login-title'>RESET PASSWORD</h2>

      {error && <span className='error'> User not Found! </span>}
      

      {loading &&
      <>
      <div className='loading-status'>

      </div> 
      <br/>

      <div>
        <span> Sending Message to your e-mail...</span>
      </div>
      </>
      }

      {!loading &&
      <>
      <label className='login-form-label'>Email</label>
      <input className='login-form-input' type="email" onChange={(e)=>{setEmail(e.target.value); setError(false)}} ></input>

      <button className='login-btn' onClick={(e)=>{ fetchEmail(e)}}> Reset </button>
      {message && <span className='successfully-generated-code'>
        The code Has been sent to your e-mail
        <br/>
        Redirecting...
        </span>}
      <a className='forgot-password' href="https://bunzl-backend.onrender.com/users/login"> Go back to Login </a>

      </>
    }
      </form>

    </div>


    </div>
  );

}
