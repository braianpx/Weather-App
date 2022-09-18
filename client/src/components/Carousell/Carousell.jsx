import Argentina from '../../assets/img-carousel/Buenos-Aires.jpg';
import Brazil from '../../assets/img-carousel/Rio-De-Janeiro.jpg';
import Inglaterra from '../../assets/img-carousel/Londres.jpg';
import Colombia from '../../assets/img-carousel/Bogota.jpg';
import EstadosUnidos from '../../assets/img-carousel/Washington-DC.jpg';
import './Carousell.css'

const Carousell = (props) => {
    return ( 
<div id="carouselExampleDark" class="carousel carousel slide fw-semibold  w-75 h-50 mb-2" data-bs-ride="carousel" >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" data-bs-interval="50000">
      <img src={Argentina} class="d-block w-100 rounded-2" alt="Buenos-Aires" />
      <div class="carousel-caption d-none d-md-block">
        <h2>{props.citys[0]?.name || "World"}</h2>
        <div class="d-flex justify-content-center my-3">
        <h5 class="me-2">{`Min ${props.citys[0]?.main.temp_min || "0"}°`}</h5>
        <h5 class="ms-2">{`Max ${props.citys[0]?.main.temp_max || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="50000">
      <img src={Brazil} class="d-block w-100 rounded-2" alt="..." />
      <div class="carousel-caption d-none d-md-block">
      <h2>{props.citys[1]?.name || "World"}</h2>
        <div class="d-flex justify-content-center my-3">
        <h5 class="me-2">{`Min ${props.citys[1]?.main.temp_min || "0"}°`}</h5>
        <h5 class="ms-2">{`Max ${props.citys[1]?.main.temp_max || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="50000">
      <img src={Inglaterra} class="d-block w-100 rounded-2" alt="..." />
      <div class="carousel-caption d-none d-md-block">
      <h2>{props.citys[2]?.name || "World"}</h2>
        <div class="d-flex justify-content-center my-3">
        <h5 class="me-2">{`Min ${props.citys[2]?.main.temp_min || "0"}°`}</h5>
        <h5 class="ms-2">{`Max ${props.citys[2]?.main.temp_max || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="50000">
      <img src={Colombia} class="d-block w-100 rounded-2" alt="..." />
      <div class="carousel-caption d-none d-md-block">
      <h2>{props.citys[3]?.name || "World"}</h2>
        <div class="d-flex justify-content-center my-3">
        <h5 class="me-2">{`Min ${props.citys[3]?.main.temp_min || "0"}°`}</h5>
        <h5 class="ms-2">{`Max ${props.citys[3]?.main.temp_max || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="50000">
      <img src={EstadosUnidos} class="d-block w-100 rounded-2" alt="..." />
      <div class="carousel-caption d-none d-md-block">
      <h2>{props.citys[4]?.name || "World"}</h2>
        <div class="d-flex justify-content-center my-3">
        <h5 class="me-2">{`Min ${props.citys[4]?.main.temp_min || "0"}°`}</h5>
        <h5 class="ms-2">{`Max ${props.citys[4]?.main.temp_max || "0"}°`}</h5>
        </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    )
}

export default Carousell;