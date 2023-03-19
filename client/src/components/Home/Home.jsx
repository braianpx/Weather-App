import Carousell from '../Carousell/Carousell.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import CarouselFav from '../CarouselFav/CarouselFav.jsx';
import ContainerCards from '../ConteinerCards/ConteinerCards.jsx';
import SignInAndSignUp from '../SignInAndSignUp/SignInAndSignUp.jsx';
import DetailCity from '../DetailCity/DetailCity.jsx';
import DeleteUser from '../DeleteUser/DeleteUser.jsx'
import { addCityDetail, getCities, deleteAccount , dispDeleteAccount, getFavorites } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'  
import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

const Home = () =>{

const dispatch = useDispatch();
const location = useLocation()
const [switchDetailCity , setSwitchDetailCity ] = useState(false)
const [switchDelete, setSwitchDelete ] = useState({
    boolean:location?.state?.deleteUser || false,
    message:'',
    messageError:'',
    yes:async()=>{
        const response = await deleteAccount();
        if(response.response){
            setSwitchDelete({
                ...switchDelete,
                message:'',
                boolean:true,
                messageError: response.response.status === 500? 'oops an error occurred' : response.response.data
                })
        }else{
            setSwitchDelete({
                ...switchDelete,
                boolean:true,
                message: response.data || 'User deleted successfuly'
        })
        dispatch(dispDeleteAccount())
        window.localStorage.clear()                     
        }
    },
    no:()=>{
        setSwitchDelete({
            ...switchDelete,
            boolean:false
        })
    }
});
const [ switchLogIn, setSwitchLogIn] = useState(false);
const [pagination, setPagination] = useState(1);
const cantCards = 3;
const citiesHome = useSelector(state => state.citiesHome)
const cities = useSelector(state => state.cities)
const user = useSelector(state => state.user)
const favorites = useSelector(state => state.favorites)

useEffect(()=>{
    dispatch(getCities())
},[]);
useEffect(()=>{
    if(user.username) 
        dispatch(getFavorites())
},[user.username]);
useMemo(()=>{
    if(switchLogIn || switchDetailCity){
        document.querySelector("Body").style.overflow = "hidden"
    }else{
        document.querySelector("Body").style.overflow = "auto"
    }
},[switchLogIn,switchDetailCity])

const cardsSlice = favorites?.slice(cantCards * pagination - cantCards,cantCards * pagination);

const nextPage = () =>{
if(pagination === 1 && pagination < 2) setPagination(pagination +1)
}
const previousPage = () =>{
if(pagination === 2 && pagination > 1) setPagination(pagination -1)
}
const getCityDetail = (city) => {
    setSwitchDetailCity(true)
    dispatch(addCityDetail(city))
}
    return(
        
           <div id="id-div-home">    
            <NavBar setSwitchLogIn={setSwitchLogIn} setSwitchDelete={setSwitchDelete} switchDelete={switchDelete} search={location?.state?.search || false}/>    
            <div id="id-div-content-fading">
            <div className="container-fluid ">
                <div className='d-flex justify-content-center row row-cols-1'>
                    <div id="id-div-container-carrousel" className="col pt-4 d-flex justify-content-center w-100 h-50 border-bottom border-bottom-5 border-dark">
                        <Carousell citys={citiesHome}/>
                    </div>
                    <p className="text-muted fs-5 fw-semibold mb-0 mt-3">Favorites</p>
                    <div className="w-100 mt-0 mb-3 d-flex justify-content-center align-items-center">
                        {favorites.at(3) && pagination !== 1 && favorites.at(0) &&
                            <i  id="idHomeFav" className="bi bi-arrow-left-circle-fill " onClick={()=>user.username && previousPage()} ></i>
                        }
                            <CarouselFav favorites={cardsSlice} user={user} setSwitchLogIn={setSwitchLogIn} getCityDetail={getCityDetail} setSwitchDetailCity={setSwitchDetailCity} setPagination={setPagination}/>
                        {favorites.at(3) && pagination !== 2 && favorites.at(0) &&
                            <i id="idHomeFav" className="bi bi-arrow-right-circle-fill " onClick={()=>user.username && nextPage()} ></i>
                        }
                    </div>
                    <div className="col w-50 my-3" >
                        <SearchBar dispatch={dispatch}/>
                    </div>
                        <div className="mb-5" >
                            <ContainerCards cities={cities} switchx={true} getCityDetail={getCityDetail} setSwitchDetailCity={setSwitchDetailCity} />
                        </div>
                </div>
            </div>
                {
                    switchLogIn? 
                    <div id="id-window-Login" className="h-100 w-100">
                        <SignInAndSignUp setSwitchLogIn={setSwitchLogIn} switchLogIn={switchLogIn} />
                        </div>
                    : null
                }
                {
                    switchDelete.boolean?
                    <div className="w-100 h-100">
                        <DeleteUser switchDelete={switchDelete} setSwitchDelete={setSwitchDelete} useState={useState}/>
                    </div>
                    :
                    null
                }
                {   switchDetailCity?
                    <div className='w-100 h-100'>
                        <DetailCity setSwitchDetailCity={setSwitchDetailCity}/>
                    </div>
                    :
                    null
                }
                </div>
             </div>
    )
}

export default Home;