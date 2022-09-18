import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar.jsx';

function App() {
  return (
    <>
    <Routes>
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/home/2' element={<NavBar />}/>
    </Routes>
    </>
  );
}

export default App;
