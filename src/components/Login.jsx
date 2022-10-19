import axios from 'axios';
import { useState } from 'react';
import '../styles/login.scss'



export const Login = ( props) => { 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const onLogin = (e) => {
    e.preventDefault()

    axios.post('/users/userlogin', {email, password})
    .then(res => {
      console.log("HERE IS THE LOGIN CONSOLE: ", res.data)
    })

  }

  return(
    <div className="login-container">

        <div className='login-card'>
      <form className="login-form">

      <h2 className='login-title'>LOG IN</h2>

     

      <label className='login-form-label'>Email</label>
      <input className='login-form-input' type="email" onChange={(e)=>{setEmail(e.target.value)}}></input>

      <label className='login-form-label'>Password</label>
      <input className='login-form-input' type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>

      <button className='login-btn'> Login </button>

      <a className='forgot-password' href="#"> Forgot your password? </a>

      </form>

        </div>


    </div>
  );
}
