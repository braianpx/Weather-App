import { useEffect } from 'react';
import Cards from '../Cards/Cards.jsx'
import { removeCity } from "../../redux/actions/index.js";
import { useDispatch } from "react-redux";

const ContainerCards = (props) =>{

const dispatch = useDispatch();
const removeCard = (cityName) =>{
dispatch(removeCity(cityName))
}
    return(
        <div className="container">
            <div id="idContainerCard" class="border rounded-5 d-flex flex-wrap" >
            <Cards cities={props.cities}  removeCard={removeCard}/>
            </div>
        </div>
    )
}

export default ContainerCards;