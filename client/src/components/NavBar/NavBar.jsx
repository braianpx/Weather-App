import { Link } from 'react-router-dom';

const NavBar = () =>{

const selectSearch = () => {
  const element = document.querySelector("#formSearch")
  const input = document.querySelector('#idInputSearch')
  element.scrollIntoView()
  input.select()

};
    return(
<nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100" >
  <div className="container-fluid">
    <a className="navbar-brand">Weather App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to ="/home" className="nav-link active" >Home</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            User
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" >LogOut</a></li>
            <li><a className="dropdown-item" >Delete Account</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link active" >Favorites</a>
        </li>
        <li className="nav-item">
          <a onClick={()=> selectSearch()} className="nav-link active" style={{cursor:'pointer'}} >Search City</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}
export default NavBar;