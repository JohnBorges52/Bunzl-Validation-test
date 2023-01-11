import '../styles/topnav.scss'


export const TopNavBar = () => {

  const user = localStorage.getItem("user");
  
  return(
      <div className="topnav-container">
        <a href='/' className="logo">
          
        </a>
        {!user && <a href='/login' className='login'>LOGIN</a>}
        {user && <a href='#' className='login'>PROFILE</a>}

      </div>
  )
}