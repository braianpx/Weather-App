import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { getFavorites, addCityDetail } from "../../redux/actions";
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

useMemo(()=>{
if(favorites.length < 1) dispatch(getFavorites())
},[favorites]);

if(!user.username){
    return <Navigate to='/home'/>
};
    return(
        <div>
            <NavBar />
            <div id="id-div-content-fading">
            <div className="container my-4 p-3">
                <div className="row row-cols-1">
                     <div className="row col-12 border border-dark border-1 rounded-3 " style={{height:"36rem"}}>
                        <Cards cities={favorites} switchx={false} getCityDetail={getCityDetail}/>
                    </div>  
                </div>
            </div>
            </div>
        </div>
    )
 }

 export default Favorites;