import Carousell from '../Carousell/Carousell.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import CarouselFav from '../CarouselFav/CarouselFav.jsx';
import ContainerCards from '../ConteinerCards/ConteinerCards.jsx';
import { Londres } from '../../data.js';
import './Home.css'

const Home = () =>{

    return(
       
        
           <div>
            <NavBar />
            <div class="container-fluid ">
                <div className='d-flex justify-content-center row row-cols-1'>
                    <div class="col mt-4 d-flex justify-content-center w-100 h-50">
                        <Carousell citys={Londres}/>
                    </div>
                    <p class="text-muted fs-5 fw-semibold mb-0 mt-3">Favorites</p>
                    <div class="w-100 mt-0 mb-3 d-flex justify-content-center align-items-center">
                        <i  id="idHomeFav" class="bi bi-arrow-left-circle-fill " onClick={()=>console.log("12")} ></i>
                            <CarouselFav />
                        <i id="idHomeFav" class="bi bi-arrow-right-circle-fill " onClick={()=>console.log("12")} ></i>
                    </div>
                    <div class="col w-50 my-3" >
                        <SearchBar />
                    </div>
                    <div class="mb-5" >
                    <ContainerCards />
                    </div>
                </div>
            </div>
            </div>
    )
}


export default Home;