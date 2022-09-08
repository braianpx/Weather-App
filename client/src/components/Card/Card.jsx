import { Cairns } from "../../data";
import './Card.css';
const Card = () =>{
return(
 
        <div id="idCard" class="card m-5" >
            <div id="carouselExampleDark" class="card-body w-100 h-50 text-center text-white row row-cols-2 " >
                <div>
                    <h4 class="fs-4 mt-3">{Cairns.name}</h4>
                    <img src={`http://openweathermap.org/img/wn/${Cairns.weather[0].icon}@2x.png`} />
                </div>
                <div class="d-flex row align-content-center mt-5 ms-2">
                <h5 class="fs-6 text-white">{`Min ${Cairns.main.temp_min}°`}</h5>
                <h5 class="fs-6">{`Max ${Cairns.main.temp_max}°`}</h5>
                </div>
            </div>
        </div>

)    
}
export default Card;