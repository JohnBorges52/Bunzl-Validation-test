import { useState } from 'react'
import '../styles/backorder.scss'
import axios from "axios";
import { useEffect } from 'react';
import { useRef } from 'react';

export const BackOrderForm = () => {

  const [orderNumber, setOrderNumber] = useState("#123456")
  const [clientName, setClientName] = useState('Client Name')
  const [telephone, setTelephone] = useState(0)
  const [email, setEmail] = useState("")
  
  const [finalMessage, setFinalMessage] = useState('')

  const [currentItem, setCurrentItem] = useState();
  const [itemsList, setItemsList] = useState([]);

  const ref = useRef(null)


  useEffect(()=> {
    setFinalMessage(`Hello ${clientName}! Your backorder number ${orderNumber} is ready for pick up at Bunzl Hygiene. The list of the items was sent to your registered e-mail ${email}.`)
    
  },[clientName, orderNumber,email, currentItem, itemsList])
  

  const sendSMS = (e) => {
    e.preventDefault();
    axios.post("/users/sendsms", {finalMessage, telephone, email})
    .then(res=>console.log(res.data))
  }

  const addItems = (e) => {
    e.preventDefault()
    setItemsList([...itemsList, currentItem])
    // console.log("CurrentItem:", currentItem);
    console.log("itemList:", itemsList)
    setCurrentItem("");
    ref.current.focus()
    
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
        onChange={(e) => setCurrentItem(e.target.value)}
        id="item-id"
        value={currentItem}
        ref={ref}
        >

        </input>
        <button className='add-items-btn'
        onClick={(e)=> addItems(e) }
        > Add </button>
      </div>
     
  </div>

  <div className='items--ready--box'>
   
  {(itemsList.map(element => {

    return(

      <div className='items--ready'>{element}</div>
      )
  }))}
    
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