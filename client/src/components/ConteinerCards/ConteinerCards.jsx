import { useEffect } from 'react';
import Card from '../Card/Card.jsx'

const ContainerCards = () =>{


    return(
        <div className="container">
            <div id="idContainerCard" class="border rounded-5 d-flex flex-wrap" >
            <Card />

            </div>
        </div>
    )
}

export default ContainerCards;