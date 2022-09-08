import Card from "../Card/Card";
import "./CarouselFav.css";

const CarouselFav = (props) => {

    return (
        <div id="idCarouselCard" class="d-flex justify-content-around  align-items-center border-2  border-top border-bottom ">
        <Card />
        <Card />
        <Card />
        </div>
    )
}

export default CarouselFav;