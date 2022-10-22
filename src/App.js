import logo from './logo.svg';
import './App.css';
import { TopNavBar } from './components/TopNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { MainContainer } from './components/MainContainer';
import { Login } from './components/Login'
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {

  const user = localStorage.getItem("user");
  return (
    <div className="App">
      <TopNavBar />
      <Routes>
        <Route path="/" element={user ? <MainContainer /> : <Login />} />
        <Route path="/backorder" element={<MainContainer />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <BottomNavBar />

    </div>
  );

}

export default App;
