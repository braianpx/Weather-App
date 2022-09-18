import Card from "../Card/Card.jsx";

const Cards = (props) => {
    console.log(props)
    return (
        <>
            { props.cities.map(el => 
                <Card
                key={el.name}
                onDelete = {props.removeCard} 
                name={el?.name || "unknown"}
                img={el?.weather[0].icon || "09d"}
                min={el?String(el.main.temp_min).slice(0,2) : "unknown"}
                max={el?String(el.main.temp_max).slice(0,2) : "unknown"}
                />
                )}
        </>
    ) 
 }
 export default Cards;