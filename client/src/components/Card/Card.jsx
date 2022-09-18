import './Card.css';

const Card = (props) =>{
console.log(props)
    return(
 
        <div id="idCard" class="card m-5" >
            <div class="d-flex w-100 justify-content-end my-0 py-0">
            <i id="idAddFavorite" class="bi bi-suit-heart-fill fs-4 me-3 text-secondary"></i>
            <i id="idRemoveCard" class="bi bi-x-square my-0 py-0 fs-4 me-2 text-secondary" onClick={()=> props.onDelete(props.name)}></i>
            </div>
            <div id="carouselExampleDark" class="card-body w-100 h-50 text-center text-white row row-cols-2 mt-0" >
                <div>
                    <h4 class="fs-4 mt-0">{props.name}</h4>
                    <img src={`http://openweathermap.org/img/wn/${props.img}@2x.png`} alt="img_weather"/>
                </div>
                <div class="d-flex row align-content-center mt-0 ms-2">
                <h5 class="fs-6 text-white">{`Min ${props.min}°`}</h5>
                <h5 class="fs-6">{`Max ${props.max}°`}</h5>
                </div>
            </div>
        </div>

)    
}
export default Card;