import { useState } from 'react'
import '../styles/backorder.scss'
import axios from "axios";
import { useEffect } from 'react';

export const BackOrderForm = () => {

  const [orderNumber, setOrderNumber] = useState("#123456")
  const [clientName, setClientName] = useState('Client Name')
  const [telephone, setTelephone] = useState(0)
  const [email, setEmail] = useState("")
  
  const [finalMessage, setFinalMessage] = useState('')

  const [items, setItems] = useState([])

  useEffect(()=> {
    setFinalMessage(`Hello ${clientName}! Your backorder number ${orderNumber} is ready for pick up at Bunzl Hygiene. The list of the items was sent to your registered e-mail ${email}.`)
  },[clientName, orderNumber,email])
  

  const sendSMS = (e) => {
    e.preventDefault();
    axios.post("/users/sendsms", {finalMessage, telephone, email})
    .then(res=>console.log(res.data))
  }

return(
  
  <form className="order-form">
    <label> Order Number </label>
    <input className='input-area'
    name='ordername'
    onChange={(e) => setOrderNumber(e.target.value)}
    />

    <label> Client Name </label>
    <input className='input-area'
    name='username'
    onChange={(e) => setClientName(e.target.value)}
    />

    <label>Telephone</label>
    <input className='input-area'
    name='telephone'
    onChange={(e) => setTelephone(e.target.value)}
    />

    <label>Email</label>
    <input className='input-area'
    name='useremail'
    onChange={(e) => setEmail(e.target.value)}
    />

  <div className='items--div'>
    <div className='label--div'>Items:
    </div>  
      
      <div className='area--div'>
        <input 
        className='items--box'
        name='items'
        onChange={(e) => setItems(e.target.value)}
        />
        <button className='add-items-btn'>Add</button>
      </div>
  </div>

  <div className='items--ready--box'>
    <div className='items--ready'> aaaaaaaaaaa </div>
    <div className='items--ready'> asd asd sadasdasd</div>
    <div className='items--ready'> aad sa sa sadasd </div>
    

  </div>

    <div className='final-message'>
      <span className='final-message-span'> Final Message </span>
      <textarea className='final-message-txtarea' disabled
      value={finalMessage}
      />

    </div>


    <div className='btns-div'>
      <button className='send-btn'
      onClick={(e)=>sendSMS(e)}
      >
        SEND
      </button>
      <button className='cancel-btn'>
        CANCEL
      </button>
    </div>
  </form>

)}