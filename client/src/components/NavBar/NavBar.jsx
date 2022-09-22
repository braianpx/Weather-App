import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/actions/index';

const NavBar = (props) =>{

const dispatch = useDispatch();
const user = useSelector(state=> state.user)
const selectSearch = () => {
  const element = document.querySelector("#formSearch")
  const input = document.querySelector('#idInputSearch')
  element.scrollIntoView()
  input.select()
}; 
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
          <span className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {user.username}
          </span>
          <ul className="dropdown-menu">
            <li><button to="users/sign_in" className="dropdown-item" onClick={()=> dispatch(logOut(false))}>LogOut</button></li>
            <li><button className="dropdown-item">Delete Account</button></li>
          </ul>
        </li>
        :
         <li className="nav-item">
         <span onClick={()=> props.setSwitchLogIn(true)} className="nav-link active" style={{cursor:"pointer"}}> Sign In </span>
        </li>
        }
        <li className="nav-item">
          <span className="nav-link active" >Favorites</span>
        </li>
        <li className="nav-item">
          <span onClick={()=> selectSearch()} className="nav-link active" style={{cursor:'pointer'}} >Search City</span>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}
export default NavBar;