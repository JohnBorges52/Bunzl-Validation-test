import axios from 'axios';
import React from 'react'
import { useState } from 'react';


export default function ForgotPassword() {
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    axios.post('/users/forgot-password', {email})
    .then(res => {
      if(res.data === "User not Found") {
        setError(true)
        setLoading(false)
      } else {
        setLoading(true)

         




        setLoading(false)
        // go somewhere
      }
    })

  }


  
  return (
    <div className="login-container">

      <div className='login-card'>
      <form className="login-form">

      <h2 className='login-title'>RESET PASSWORD</h2>

      {error && <span className='error'>error</span>}
      <br/>

      {loading && <div className='loading-status'>

      </div> }
      {!loading &&
      <>
      <label className='login-form-label'>Email</label>
      <input className='login-form-input' type="email" onChange={(e)=>{setEmail(e.target.value); setError(false)}} ></input>

      <button className='login-btn' onClick={(e)=> {fetchEmail(e)}}> Reset </button>
      <a className='forgot-password' href="/login"> Go back to Login </a>
      </>
    }
      </form>

    </div>


    </div>
  );

}
