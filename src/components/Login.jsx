import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import '../styles/login.scss'



export const Login = ( props) => { 

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [loginBtn, setLoginBtn] = useState(true)
  
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
        navigate("/login")
        window.location.reload(false)
      }
      
    })

  }

  const onLogout = (e) => {
    e.preventDefault()

    localStorage.clear();
    setLoginBtn(true)
    navigate("/login")
    window.location.reload(false)



  }

  useEffect(() => {

  console.log(loginBtn)
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setLoginBtn(false)
      const foundUser = JSON.parse(loggedInUser)
      setCurrentUser(foundUser);
      console.log(currentUser)
    } 
  }, [])

  return(
    <div className="login-container">

      <div className='login-card'>
      <form className="login-form">

      {loginBtn &&<h2 className='login-title'>LOG IN</h2>}

      {!loginBtn && <span className='welcome'> Welcome <span className='welcome-user-span'>{localStorage.getItem("user")}</span></span>}
      {!loginBtn && <a href="#" className='my-history'> My History</a>}


      {loginBtn && <label className='login-form-label'>Email</label>}
      {loginBtn &&<input className='login-form-input' type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="E-mail"></input>}
      {error === "User not Found" && <span className='login-form-error'>{error}</span>}

      {loginBtn && <label className='login-form-label'>Password</label>}
      {loginBtn && <input className='login-form-input' type="password" onChange={(e)=>{setPassword(e.target.value)}}></input>}
      {error === "Wrong Password" && <span className='login-form-error'>{error}</span>}

      {loginBtn && <button className='login-btn' onClick={(e)=> onLogin(e)}> Login </button> }
      {!loginBtn && <button className='logout-btn' onClick={(e)=> onLogout(e)}> Logout </button> }

      <a className='forgot-password' href="/forgot-password"> Forgot your password? </a>

      </form>

    </div>


    </div>
  );
}
