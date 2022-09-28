import { useState } from 'react'
import '../styles/backorder.scss'

export const BackOrderForm = () => {
  
  const [orderNumber, setOrderNumber] = useState("#123456")
  const [clientName, setClientName] = useState('Client Name')
  const [telephone, setTelephone] = useState(0)
  const [email, setEmail] = useState(0)
  
  const [finalMessage, setFinalMessage] = useState('')

  const finalMessageGenerator = (oN, cN) => {

    let result = ''

    result = `Hello ${cN}! Your backorder number ${oN} is ready for pick up at Bunzl Hygiene. The list of items was sent to your e-mail!`
    
  }




return(
  
  <form className="order-form">
    <label> Order Number </label>
    <input
    name='ordername'
    onChange={(e) => setOrderNumber(e.target.value)}
    />

    <label> Client Name </label>
    <input
    name='username'
    onChange={(e) => setClientName(e.target.value)}
    />

    <label>Telephone</label>
    <input
    name='telephone'
    onChange={(e) => setTelephone(e.target.value)}
    />

    <label>Email</label>
    <input
    name='useremail'
    onChange={(e) => setEmail(e.target.value)}
    />

    <div className='final-message'>
      <span className='final-message-span'> Final Message </span>
      <textarea className='final-message-txtarea' disabled
      value={`Hello ${clientName}! Your backorder number ${orderNumber} is ready for pick up at Bunzl Hygiene. The list of items was sent to your e-mail!`}
      />

      

    </div>
    <div className='btns-div'>
      <button className='send-btn'
      onClick={()=>console.log(orderNumber, clientName, telephone, email)}
      >
        SEND
      </button>
 
      <button className='cancel-btn'>
        CANCEL
      </button>
 
 
    </div>
  </form>
  


 

)

}