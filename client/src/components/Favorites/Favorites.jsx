import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFavorites, addCityDetail } from "../../redux/actions";
import DetailCity from "../DetailCity/DetailCity";
import '../Home/Home.css';

const Favorites = () =>{
const dispatch = useDispatch();
const favorites = useSelector(state => state.favorites);
const user = useSelector(state => state.user);
const [switchCityDetail, setSwitchCityDetail] = useState(false)

const getCityDetail = (city) => {
    dispatch(addCityDetail(city))
    setSwitchCityDetail(true)
}

useEffect(()=>{
        dispatch(getFavorites())
},[]);

if(!user.username){
    return <Navigate to='/home'/>
};
    return(
        <div>
            <NavBar />
            <div id="id-div-content-fading" className="d-flex justify-content-center align-items-center">
                <div className="col-12 col-sm-11 d-flex justify-content-center align-items-center">
                     <div className="col-12 row border border-dark border-1 rounded-3 justify-content-center align-items-center text-center" style={{minHeight:'12rem'}}>
                        {favorites.at(0)?
                            <Cards cities={favorites} switchx={false} getCityDetail={getCityDetail}/>:
                            <h1>No Favorites</h1>
                        }
                        
                    </div>  
                </div>
            </div>
            {switchCityDetail &&
                    <div className='w-100 h-100'>
                        <DetailCity setSwitchDetailCity={setSwitchCityDetail}/>
                    </div>
                }
        </div>
    )
 }

 export default Favorites;