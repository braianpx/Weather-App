import Carousell from '../Carousell/Carousell.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import CarouselFav from '../CarouselFav/CarouselFav.jsx';
import ContainerCards from '../ConteinerCards/ConteinerCards.jsx';
import SignInAndSignUp from '../SignInAndSignUp/SignInAndSignUp.jsx';
import { addCityDetail, getCities } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'  
import { useEffect, useState } from 'react';
import './Home.css';

const Home = () =>{

const [ switchLogIn, setSwitchLogIn] = useState(false);   
const citiesHome = useSelector(state => state.citiesHome)
const cities = useSelector(state => state.cities)
const dispatch = useDispatch();


useEffect(()=>{
    dispatch(getCities())
},[])

const city2 = () => {
    dispatch(addCityDetail("London"))
}

console.log(citiesHome)
    return(
        
           <div id="id-div-home">
            <NavBar setSwitchLogIn={setSwitchLogIn} />
            <div class="container-fluid ">
                <div className='d-flex justify-content-center row row-cols-1'>
                    <div class="col mt-4 d-flex justify-content-center w-100 h-50">
                        <Carousell citys={citiesHome}/>
                    </div>
                    <p class="text-muted fs-5 fw-semibold mb-0 mt-3">Favorites</p>
                    <div class="w-100 mt-0 mb-3 d-flex justify-content-center align-items-center">
                        <i  id="idHomeFav" class="bi bi-arrow-left-circle-fill " onClick={()=>console.log("12")} ></i>
                            <CarouselFav />
                        <i id="idHomeFav" class="bi bi-arrow-right-circle-fill " onClick={()=>console.log("12")} ></i>
                    </div>
                    <div class="col w-50 my-3" >
                        <SearchBar />
                    </div>
                    <div class="mb-5" >
                    <ContainerCards cities={cities}/>
                    </div>
                </div>
            </div>
                {
                    switchLogIn? 
                    <div className="h-100 w-100"><SignInAndSignUp setSwitchLogIn={setSwitchLogIn} /></div>
                    : null
                }
            </div>
    )
}

export default Home;