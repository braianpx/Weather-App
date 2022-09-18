import Cards from "../Cards/Cards";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/actions";
import "./CarouselFav.css";

const CarouselFav = () => {

const favorites = useSelector(state => state.favorites)
const dispatch = useDispatch();
useEffect(()=>{
    dispatch(getFavorites())
},[])
const [pagination, setPagination] = useState(1)
const [cantCards, setCantCards] = useState(3)
const cardsSlice = favorites.slice(cantCards * pagination - cantCards,cantCards * pagination);
const nextPage = () =>{
setPagination(pagination +1);
}
const previousPage = () =>{
setPagination(pagination -1)
}


    return (
        <div id="idCarouselCard" class="d-flex justify-content-around  align-items-center border-2  border-top border-bottom">
            <Cards cities={cardsSlice}/>
        </div>
    )
}

export default CarouselFav;