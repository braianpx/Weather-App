import Carousell from '../Carousell/Carousell.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import CarouselFav from '../CarouselFav/CarouselFav.jsx';
import ContainerCards from '../ConteinerCards/ConteinerCards.jsx';
import SignInAndSignUp from '../SignInAndSignUp/SignInAndSignUp.jsx';
import DeleteUser from '../DeleteUser/DeleteUser.jsx'
import { addCityDetail, getCities, deleteAccount , dispDeleteAccount, getFavorites } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux'  
import { useEffect, useState } from 'react';
import './Home.css';

const Home = () =>{

const dispatch = useDispatch();
const [ switchDelete, setSwitchDelete ] = useState({
    boolean:false,
    message:'',
    messageError:'',
    yes:async()=>{
        const response = await deleteAccount();
        if(Object.keys(response).find(el => el === "response")){
            setSwitchDelete({
                ...switchDelete,
                message:'',
                boolean:true,
                messageError: response.response.data || 'oops an error occurred'
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
const [cantCards, setCantCards] = useState(3);
const citiesHome = useSelector(state => state.citiesHome)
const cities = useSelector(state => state.cities)
const user = useSelector(state => state.user)
const favorites = useSelector(state => state.favorites)
useEffect(()=>{
    dispatch(getCities())
    if(user.username) dispatch(getFavorites())
},[])
const cardsSlice = favorites.slice(cantCards * pagination - cantCards,cantCards * pagination);
////pagination functions///
const nextPage = () =>{
    setPagination(pagination +1);
    }
const previousPage = () =>{
    setPagination(pagination -1)
    }
console.log(citiesHome)
    return(
        
           <div id="id-div-home">
            <NavBar setSwitchLogIn={setSwitchLogIn} setSwitchDelete={setSwitchDelete} switchDelete={switchDelete}/>
            <div class="container-fluid ">
                <div className='d-flex justify-content-center row row-cols-1'>
                    <div class="col mt-4 d-flex justify-content-center w-100 h-50">
                        <Carousell citys={citiesHome}/>
                    </div>
                    <p class="text-muted fs-5 fw-semibold mb-0 mt-3">Favorites</p>
                    <div class="w-100 mt-0 mb-3 d-flex justify-content-center align-items-center">
                        <i  id="idHomeFav" class="bi bi-arrow-left-circle-fill " onClick={()=>user.username?previousPage():null} ></i>
                            <CarouselFav favorites={cardsSlice} user={user} setSwitchLogIn={setSwitchLogIn} />
                        <i id="idHomeFav" class="bi bi-arrow-right-circle-fill " onClick={()=>user.username?nextPage():null} ></i>
                    </div>
                    <div class="col w-50 my-3" >
                        <SearchBar dispatch={dispatch}/>
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
                {
                    switchDelete.boolean?
                    <div className="w-100 h-100">
                        <DeleteUser switchDelete={switchDelete} setSwitchDelete={setSwitchDelete} useState={useState}/>
                    </div>
                    :
                    null
                }
            </div>
    )
}

export default Home;