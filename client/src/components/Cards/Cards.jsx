import Card from "../Card/Card.jsx";

const Cards = (props) => {
    return (
        <>
            { props.cities?.map(el =>{ 
                return <Card
                getCityDetail={props.getCityDetail || undefined}
                key={el.name}
                switchx={props.switchx}
                onDelete = {props.removeCard} 
                name={el?.name || "unknown"}
                img={el?.weather?el.weather[0].icon : "09d"}
                min={el?.main?.temp_min?Math.round(el.main.temp_min - 273.15) : "unknown"}
                max={el?.main?.temp_max?Math.round(el.main.temp_max - 273.15) : "unknown"}
                />
                })}
        </>
    ) 
 }
 export default Cards;