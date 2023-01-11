import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate } from "react-router-dom";


export default function ChangePassword() {

  const [errorCode, setErrorCode] = useState(false)
  const [errorUser, setErrorUser] = useState(false)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  let navigate = useNavigate();




  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(false)
  const [notmatchpsw, setNotMatchpsw] = useState(false)

  const pswValidation = (psw, pswConfirm) => {
    if(psw !== pswConfirm) {
      setNotMatchpsw(true)
      setLoading(false)
      return false
    }
    return true
  }


  const changeEmail = (e) => {
    e.preventDefault()
    setLoading(true)

    if(pswValidation(password, passwordConfirmation)) {
      // axios.post("/users/change-password", {email, code, password})
      axios.post("https://bunzl-validation-backend-production.up.railway.app/users/change-password", {email, code, password})
      .then((res)=>{
        if(res.data === "User not Found") {
          console.log('res.data', res.data)
          setLoading(false)
          setErrorUser(true)
        }
        if(res.data === "Wrong Code"){
          setErrorCode(true)
          setLoading(false)
        }
        if(res.data === "Password updated") {
          setTimeout(()=>{
          setErrorCode(false)
          setErrorUser(false)
          setMessage(true)
          setLoading(false)
          // navigate("/login")
          navigate("/login")
        }, 2500)

        }
      })
    }
  }
  

  return (
    <div className="login-container">

      <div className='login-card-change'>
      <form className="login-form">

      {!loading && <h2 className='login-title'> CHANGE YOUR PASSWORD</h2>}
      {loading && <h2 className='login-title'>CHANGING YOUR PASSWORD</h2>}

      {errorUser && <span className='error'> User not Found! </span>}
      {errorCode && <span className='error'> Wrong Code </span>}
      {notmatchpsw && <span className='error'> Passwords do not match </span>}
      

      {loading &&
      <>
      <div className='loading-status'>

      </div> 
      <br/>

      <div>
        <span> Redirecting...</span>
      </div>
      </>
      }

      {!loading &&
      <>
      <label className='login-form-label'>Email</label>
      <input className='login-form-input' type="email" onChange={(e)=>{setEmail(e.target.value); setErrorCode(false);setErrorUser(false); setNotMatchpsw(false)}} ></input>
      
      <label className='login-form-label'>Code</label>
      <input className='login-form-input' type="text" onChange={(e)=>{setCode(e.target.value); setErrorCode(false);setErrorUser(false); setNotMatchpsw(false)}} ></input>

      <label className='login-form-label'>Password</label>
      <input className='login-form-input' type="password" onChange={(e)=>{setPassword(e.target.value); setErrorCode(false);setErrorUser(false); setNotMatchpsw(false)}} ></input>
      
      <label className='login-form-label'>Password Confirmation</label>
      <input className='login-form-input' type="password" onChange={(e)=>{setPasswordConfirmation(e.target.value); setErrorCode(false);setErrorUser(false); setNotMatchpsw(false)}} ></input>

      <button className='login-btn' onClick={(e)=> {changeEmail(e)}} > Change </button>
      {message && <span className='successfully-generated-code'>
        Your password has been changed!
        <br/>
        Redirecting...
        </span>}
      <a className='forgot-password' href="/login"> Go back to Login </a>

      </>
    }
      </form>

    </div>
    </div>
  );
}
