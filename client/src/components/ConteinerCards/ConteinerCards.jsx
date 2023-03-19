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
            <div id="idContainerCard" className="border border-dark rounded-5 d-flex flex-wrap" >
            <Cards cities={props.cities} switchx={props.switchx} removeCard={removeCard} getCityDetail={props.getCityDetail}/>
            </div>
        </div>
    )
}

export default ContainerCards;