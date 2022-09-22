import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Favorites from './components/Favorites/Favorites.jsx';

function App() {
  return (
    <>
    <Routes>
        <Route exact path='/' element={<Navigate to="/home" />} />
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/home/favorites' element={ <Favorites />}/>
    </Routes>
    </>
  );
}

export default App;
