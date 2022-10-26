import React from 'react'

export default function ForgotPassword() {
  return (
    <div className="login-container">

      <div className='login-card'>
      <form className="login-form">

      <h2 className='login-title'>RESET PASSWORD</h2>

      <label className='login-form-label'>Email</label>
      <input className='login-form-input' type="email" onChange={()=>{}} ></input>
  

      <button className='login-btn' > Reset </button>
    

      <a className='forgot-password' href="/login"> Go back to Login</a>

      </form>

    </div>


    </div>
  );

}
