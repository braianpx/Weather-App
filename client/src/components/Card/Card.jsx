import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, removeFavorites, getFavorites } from '../../redux/actions';
import './Card.css';

const Card = (props) =>{
const user = useSelector(state => state.user)
const favorites = useSelector(state => state.favorites)
const [ fadingRemove, setFadingRemove ] = useState(false); 
const dispatch = useDispatch();
const searchCity = (cityName) => {
    const search = favorites.find(el => el?.name === cityName)
    if(search) return true
    else return false
}
const addFav = () => {
    if(user.username){
        const switchFav = searchCity(props.name)
        if(switchFav)return true
        else return false
    }else return false
}
const addAndRealoadFav = () => {
    if(favorites.length < 5){
    dispatch(addFavorites(props.name));
    setTimeout(()=>{dispatch(getFavorites())},100)
    }else alert('"you can no longer add more cities to favorites, you reached the maximum limit"')
}
const removeCity = () => {
    setFadingRemove(true);
    setTimeout(()=>{
        setFadingRemove(false)
    },600)
    setTimeout(()=>{
        props.onDelete(props.name)
    },501)
}
    return(
        <div id={fadingRemove?"idCardFading":"idCard"} className="card m-5" >
            <div className="d-flex w-100 justify-content-end my-0 py-0">
            <i id={searchCity(props.name)?"idRemoveFavorite":"idAddFavorite"} className="bi bi-suit-heart-fill fs-4 me-3 text-secondary" onClick={()=>user.username?addFav()?dispatch(removeFavorites(props.name)):addAndRealoadFav():alert('you must first log in to be able to add a city to favorites')}></i>
            {
            props.switchx &&
                <i id="idRemoveCard" className="bi bi-x-square my-0 py-0 fs-4 me-2 text-secondary" onClick={()=> removeCity()}></i>
            }
            </div>
            <div style={{zIndex:"-1 !important"}} id="carouselExampleDark" className="card-body w-100 h-50 text-center text-white row row-cols-2 align-content-end mt-0 p-1" >
                <div className="p-0 ms-1">
                    <h4 className="fs-4 mt-0">{props.name}</h4>
                    <img src={`http://openweathermap.org/img/wn/${props.img}@2x.png`} alt="img_weather" className='m-0 p-0 rounded rounded-circle' id="id-img-card"/>
                </div>
                <div className="d-flex row align-content-center mt-0 ms-2">
                <h5 className="fs-6 text-white">{`Min ${props.min}°`}</h5>
                <h5 className="fs-6">{`Max ${props.max}°`}</h5>
                </div>
            </div>
            <div id="id-div-detail-card" className="w-100 h-100 position-absolute" onClick={()=> props.getCityDetail(props.name)} ></div>
        </div>

)    
}
export default Card;