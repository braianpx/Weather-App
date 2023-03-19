import { useEffect, useState } from "react";
import Cards from "../Cards/Cards";
import "./CarouselFav.css";

const CarouselFav = ({user, favorites, setSwitchLogIn, setPagination, getCityDetail}) => {
const [ switchFav , setSwitchFav ] = useState(true)
    useEffect(()=>{
        if(favorites < 3) 
            setPagination(1)
        if(!favorites?.at(0) || !user?.username) 
            setSwitchFav(false)
        else 
            setSwitchFav(true)
    },[favorites,user?.username])
    const selectSearch = () => {
        const element = document.querySelector("#formSearch")
        const input = document.querySelector('#idInputSearch')
        element.scrollIntoView()
        input.select()
    }; 
    return (
        <div id="idCarouselCard" className="d-flex justify-content-around  align-items-center border-dark border-1  border-top border-bottom ">
            { !switchFav?
                <div id="id_div_not_found_fav" className="row col-4 row-cols-1 border border-1 border-dark rounded-3 h-75">
                    <div className="col-12 d-flex text-center justify-content-center align-items-center pt-3 pb-2">
                        <span className="text fs-5">
                        {   user?.username?
                                'oops apparently you do not have cities in favorites':
                                'You must first log in to be able to view your favorite cities'
                        }
                        </span>
                    </div>
                    <div className="col-12 d-flex text-center justify-content-around align-items-start">
                        <button className="btn btn-primary ms-5" onClick={()=> user?.username? selectSearch : setSwitchLogIn(true)} >
                            {   user?.username?
                                    'Go Search City':
                                    'Go To LogIn'
                            }
                        </button>
                    </div>
                </div>
                :
                <Cards cities={favorites} getCityDetail={getCityDetail} />
            }
        </div>
    )
}

export default CarouselFav;