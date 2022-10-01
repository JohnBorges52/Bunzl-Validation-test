import '../styles/maincontainer.scss'
import { BackOrderForm } from './BackOrderForm'
import { BottomNavBar } from './BottomNavBar'

export const MainContainer = () => {

  return(
    <div className="main-container">
       
       <BackOrderForm />
       <BottomNavBar />
    </div>
  )

}