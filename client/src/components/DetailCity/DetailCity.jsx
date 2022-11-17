import { useSelector } from "react-redux";
import './DetailCity.css';

const DetailCity =  (props) => {
const cityDetail = useSelector(state => state.cityDetail)
const closeDetailCity = () => {
    window.document.querySelector("#id-div-conteiner-detail-city").style.animationDuration = ".2s"
    window.document.querySelector("#id-div-conteiner-detail-city").style.animationName = 'fadingRemove';

    setTimeout(()=>{
        props.setSwitchDetailCity(false)
    },600)
    
}
    return(
        <div id='id-div-conteiner-detail-city' class="position-fixed top-0 start-0 end-0 bottom-0 d-flex justify-content-center align-items-center" >
            <div id="id-div-detail-city" class='h-75 w-50 border border-2 rounded rounded-5'>
                <div class="d-flex justify-content-end" style={{height:"3.5rem"}} >
                    <i id="id-quit-detail-card" class="bi bi-x-circle-fill mb-0 mt-1 fs-2 me-3 text-secondary" onClick={()=> closeDetailCity()}></i>
                </div>
                <div id="id-div-conteiner-detail" class="card-body w-100 h-75 text-center text-white row row-cols-2 mt-0 p-1" >
                    <div id="id-div-container-name"class="row justify-content-center align-content-center w-50 h-100 p-0 ms-1 px-3 text text-center">
                        <h1 class="mt-0 mb-3">{cityDetail.name}</h1>
                        <img src={`http://openweathermap.org/img/wn/${cityDetail.weather[0].icon}@2x.png`} alt="img_weather" className='m-0 mb-4 p-0 rounded rounded-circle' id="id-img-card" style={{width:"8rem", height:"8rem"}}/>
                        <h4 >{`Temperature Min: ${Math.round(cityDetail.main.temp_min - 273.15)}°`}</h4>
                        <h4 >{`Temperature Max: ${Math.round(cityDetail.main.temp_max - 273.15)}°`}</h4>
                        <h4 >{`Description: ${cityDetail.weather[0].description}`}</h4>
                        <h3 class="my-4">{`Country: ${cityDetail.sys.country}`}</h3>
                    </div>
                    <div class="row align-content-center justify-content-center w-50 h-100 mt-0 ms-1 px-3 text text-center">
                        <h4 >{`sunset: ${cityDetail.sys.sunset}`}</h4>
                        <h4 >{`Timezone: ${cityDetail.timezone}`}</h4>
                        <h4 >{`Humidity: ${cityDetail.main.humidity}%`}</h4>
                        <h4 >{`Pressure: ${cityDetail.main.pressure}`}</h4>
                        <h4 >{`Lon: ${cityDetail.coord.lon}`}</h4>
                        <h4 >{`Lat: ${cityDetail.coord.lat}`}</h4>
                        <h4 >{`Speed: ${cityDetail.wind.speed}`}</h4>
                        <h4 >{`Deg: ${cityDetail.wind.deg}`}</h4>  
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetailCity;