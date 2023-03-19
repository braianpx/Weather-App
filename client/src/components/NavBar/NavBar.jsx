import { Link, Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/index';
import { useState } from 'react';

const NavBar = (props) =>{

const location = useLocation();
const dispatch = useDispatch();
const user = useSelector(state=> state.user)
const [redirect, setRedirect] = useState(false)
const [redirectSearch, setRedirectSearch] = useState(false)
const [search, setSearch] = useState(false)
const selectSearch = () => {
  if(location.pathname === "/home/favorites"){
    setRedirectSearch(true)
}else{
  const element = document.querySelector("#formSearch")
  const input = document.querySelector('#idInputSearch')
  element.scrollIntoView()
  input.select()}
};
if(!search && props.search){
  setSearch(true)
  setTimeout(()=>{selectSearch()},200)
}
if(redirect){
  return <Navigate to="/home" state={{deleteUser:true}}/>
}else if(redirectSearch){
  return <Navigate to="/home" state={{search:true}}/>
}
    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100" >
  <div className="container-fluid">
    <span className="navbar-brand">Weather App</span>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to ="/home" className="nav-link active" >Home</Link>
        </li>
        {
          user.username?
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.username}
          </a>
          <ul className="dropdown-menu">
            <li><button to="users/sign_in" className="dropdown-item" onClick={()=> dispatch(logOut(false))}>LogOut</button></li>
            <li><button className="dropdown-item" onClick={()=>{props.setSwitchDelete?props.setSwitchDelete({...props.switchDelete,boolean:true}): setRedirect(true) }}>Delete Account</button></li>
          </ul>
        </li>
        :
         <li className="nav-item">
         <span onClick={()=> props.setSwitchLogIn(true)} className="nav-link active" style={{cursor:"pointer"}}> Sign In </span>
        </li>
        }
        <li className="nav-item">
        {user.username?
        <Link to={"/home/favorites"} className="nav-link active">Favorites</Link>
        :
        <span className="nav-link disabled" style={{cursor:"pointer"}} onClick={()=>alert('to access favorites you must first log in')} >Favorites</span>  
        }
        </li>
        <li className="nav-item">
          <span onClick={()=>selectSearch()} className="nav-link active" style={{cursor:'pointer'}} >Search City</span>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}
export default NavBar;