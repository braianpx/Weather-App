import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import "./CarouselFav.css";

const CarouselFav = (props) => {

const [ switchFav , setSwitchFav ] = useState(true)
useEffect(()=>{
if(!props.favorites[0] || !props.user.username) setSwitchFav(false)
},[])
const selectSearch = () => {
    const element = document.querySelector("#formSearch")
    const input = document.querySelector('#idInputSearch')
    element.scrollIntoView()
    input.select()
  }; 
    console.log(props.favorites)
    return (
        <div id="idCarouselCard" class="d-flex justify-content-around  align-items-center border-2  border-top border-bottom">
            { !switchFav?
                <div id="id_div_not_found_fav" className="row col-4 row-cols-1 border border-1 border-dark rounded-3 h-75">
                    <div className="col-12 d-flex text-center justify-content-center align-items-center pt-3 pb-2">
                        <span className="text fs-5">
                        oops apparently you do not have cities in favorites or you did not log in
                        </span>
                    </div>
                    <div className="col-12 d-flex text-center justify-content-around align-items-start">
                        <button className="btn btn-primary ms-5" onClick={()=>props.user.username?props.setSwitchLogIn():alert("you already logged in")} >
                           Go To LogIn
                        </button>
                        <button className="btn btn-primary me-5" onClick={selectSearch} >
                           Go Search City
                        </button>
                    </div>
                </div>
                :
                <Cards cities={props.favorites}/>
            }
        </div>
    )
}

export default CarouselFav;