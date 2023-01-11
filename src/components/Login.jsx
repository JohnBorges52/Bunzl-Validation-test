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
  const [loading, setLoading] = useState(false)

  let navigate = useNavigate();

  const onLogin = (e) => {

    e.preventDefault()
    setLoading(true)

    // axios.post('/users/userlogin', {email, password})
    axios.post('https://bunzl-validation-backend-production.up.railway.app/', {email, password})
    .then(res => {
      if(res.data === "User not Found") {
        setError("User not Found")
        setLoading(false)
      }
      else if(res.data === "Wrong Password") {
        setError("Wrong Password") 
        setLoading(false)
      }
      else {
        // console.log(res.data)
        setCurrentUser(res.data)
        localStorage.setItem('user', JSON.stringify(res.data[0].email))
        setLoading(false)
        navigate("/")
        window.location.reload(false)
      }
      
    })

  }

  const onLogout = (e) => {
    
    e.preventDefault()
    setLoading(true)
    localStorage.clear();
    setLoginBtn(true)
    setLoading(false)
    navigate("/login")
    window.location.reload(false)

  }

  console.log(loginBtn)
  useEffect(() => {

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setLoginBtn(false)
      const foundUser = JSON.parse(loggedInUser)
      setCurrentUser(foundUser);
      console.log(currentUser)
    } 
  }, [])

  useEffect(()=>{
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      })
    })
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => {
      observer.observe(el)
    })
  },[])

  return(
    <div className="login-container hidden">
      <div className='login-card'>
      <form className="login-form">
      {loading &&
      <>
      <div className='loading-status'>
      </div> 
      <br/>

      <div>
        <span> Loging in...</span>
      </div>
      </>
      }
        
    {!loading &&
      <>

      {loginBtn &&<h2 className='login-title'>LOG IN</h2>}
     

      {!loginBtn && <span className='welcome'> Welcome <span className='welcome-user-span'>{localStorage.getItem("user")}</span></span>}
      {!loginBtn && <a href="#" className='my-history'> My History</a>}


      {loginBtn &&<input className='login-form-input-email' id="email" type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder=" "></input>}
      {loginBtn && <label for="email" className='login-form-label-email'>&nbsp;&nbsp;&nbsp;E-mail&nbsp;&nbsp;&nbsp; </label>}
     

      {loginBtn && <input className='login-form-input-password' id="password" type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder=" "></input>}
      {loginBtn && <label for="password" className='login-form-label-password'>&nbsp;&nbsp;&nbsp;Password&nbsp;&nbsp;&nbsp;</label>}
      
      {error === "User not Found" && <span className='error'>{error}</span>}
      {error === "Wrong Password" && <span className='error'>{error}</span>}
      {loginBtn && <button className='login-btn' onClick={(e)=> onLogin(e)}> Login </button> }
      {!loginBtn && <button className='logout-btn' onClick={(e)=> onLogout(e)}> Logout </button> }

      <a className='forgot-password' href="/forgot-password"> Forgot your password? </a>

    </>}
      </form>
    </div>
    </div>
  );
}
