import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import '../styles/login.scss'



export const Login = ( props) => { 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  
  let navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault()

    axios.post('/users/userlogin', {email, password})
    .then(res => {
      if(res.data === "User not Found") {
        setError("User not Found")
      }
      else if(res.data === "Wrong Password") {
        setError("Wrong Password") 
      }
      else {
        // console.log(res.data)
        setCurrentUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data[0].email))
        navigate("/")
        window.location.reload(false)
      }
      
    })

  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setCurrentUser(foundUser);
      console.log(currentUser)
    }
  }, [])

  return(
    <div className="login-container">

        <div className='login-card'>
      <form className="login-form">

      <h2 className='login-title'>LOG IN</h2>

      <label className='login-form-label'>Email</label>
      <input className='login-form-input' type="email" onChange={(e)=>{setEmail(e.target.value)}}></input>
      {error === "User not Found" && <span className='login-form-error'>{error}</span>}

      <label className='login-form-label'>Password</label>
      <input className='login-form-input' type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>
      {error === "Wrong Password" && <span className='login-form-error'>{error}</span>}

      <button className='login-btn' onClick={(e)=> onLogin(e)}> Login </button>

      <a className='forgot-password' href="#"> Forgot your password? </a>

      </form>

    </div>


    </div>
  );
}
