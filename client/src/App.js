import logo from './logo.svg';
import './App.css';
import { TopNavBar } from './components/TopNavBar';
import { BottomNavBar } from './components/BottomNavBar';
import { MainContainer } from './components/MainContainer';

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <MainContainer />

      <BottomNavBar />
    </div>
  );
}

export default App;
