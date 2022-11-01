import logo from './logo.svg';
import './App.css';
import { TopNavBar } from './components/TopNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { MainContainer } from './components/MainContainer';
import { Login } from './components/Login'
import { Routes, Route, useNavigate } from "react-router-dom";
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';

function App() {

  const user = localStorage.getItem("user");

  return (
    <div className="App">
      <TopNavBar />
      <Routes>
        <Route path="/" element={user ? <MainContainer /> : <Login />} />
        <Route path="/backorder" element={<MainContainer />} />
        <Route path="https://bunzsmsemailtest.onrender.com/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />

      </Routes>
      <BottomNavBar />

    </div>
  );

}

export default App;
