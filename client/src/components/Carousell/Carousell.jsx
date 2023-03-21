import Argentina from '../../assets/img-carousel/Buenos-Aires.jpg';
import Brazil from '../../assets/img-carousel/Rio-De-Janeiro.jpg';
import Inglaterra from '../../assets/img-carousel/Londres.jpg';
import Colombia from '../../assets/img-carousel/Bogota.jpg';
import EstadosUnidos from '../../assets/img-carousel/Washington-DC.jpg';
import './Carousell.css'

const Carousell = (props) => {
    return ( 
<div id="carouselExampleDark" className="carousel carousel slide fw-semibold  w-75 h-50 mb-4" data-bs-ride="carousel" >
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="50000">
      <img src={Argentina} className="d-block w-100 rounded-2" alt="Buenos-Aires" />
      <div className="carousel-caption d-block">
        <h2>{props.citys[0]?.name || "World"}</h2>
        <div className="d-flex justify-content-center my-3">
        <h5 className="me-2">{`Min ${Math.round(props.citys[0]?.main.temp_min - 273.15) || "0"}°`}</h5>
        <h5 className="ms-2">{`Max ${Math.round(props.citys[0]?.main.temp_max - 273.15) || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="50000">
      <img src={Brazil} className="d-block w-100 rounded-2" alt="..." />
      <div className="carousel-caption d-block">
      <h2>{props.citys[1]?.name || "World"}</h2>
        <div className="d-flex justify-content-center my-3">
        <h5 className="me-2">{`Min ${Math.round(props.citys[1]?.main.temp_min - 273.15) || "0"}°`}</h5>
        <h5 className="ms-2">{`Max ${Math.round(props.citys[1]?.main.temp_max - 273.15) || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="50000">
      <img src={Inglaterra} className="d-block w-100 rounded-2" alt="..." />
      <div className="carousel-caption d-block">
      <h2>{props.citys[2]?.name || "World"}</h2>
        <div className="d-flex justify-content-center my-3">
        <h5 className="me-2">{`Min ${Math.round(props.citys[2]?.main.temp_min - 273.15) || "0"}°`}</h5>
        <h5 className="ms-2">{`Max ${Math.round(props.citys[2]?.main.temp_max - 273.15) || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="50000">
      <img src={Colombia} className="d-block w-100 rounded-2" alt="..." />
      <div className="carousel-caption d-block">
      <h2>{props.citys[3]?.name || "World"}</h2>
        <div className="d-flex justify-content-center my-3">
        <h5 className="me-2">{`Min ${Math.round(props.citys[3]?.main.temp_min - 273.15) || "0"}°`}</h5>
        <h5 className="ms-2">{`Max ${Math.round(props.citys[3]?.main.temp_max - 273.15) || "0"}°`}</h5>
        </div>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="50000">
      <img src={EstadosUnidos} className="d-block w-100 rounded-2" alt="..." />
      <div className="carousel-caption d-block">
      <h2>{props.citys[4]?.name || "World"}</h2>
        <div className="d-flex justify-content-center my-3">
        <h5 className="me-2">{`Min ${Math.round(props.citys[4]?.main.temp_min - 273.15) || "0"}°`}</h5>
        <h5 className="ms-2">{`Max ${Math.round(props.citys[4]?.main.temp_max - 273.15) || "0"}°`}</h5>
        </div>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" id='idButtonCarousellLeft' data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" id='idButtonCarousellRight' data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    )
}

export default Carousell;