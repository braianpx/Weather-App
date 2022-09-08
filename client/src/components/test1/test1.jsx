
const test1 = () =>{

const handleSubmit = () =>{
    const win = window.open("/home/2"); win.focus();
    console.log(window)
}    

const scrollTop = () =>{
    var elmnt = document.getElementById("content");
    elmnt.scrollIntoView({behavior: "smooth", block: "start", inline: "end"});
}
const scrollDown = ( ) =>{
    var elmnt = document.getElementById("content");
    elmnt.scrollIntoView({behavior: "auto", block: "end", inline: "center"});
}
    return(
        <div id='content'>
            <button onClick={() =>scrollDown() }>scroll down</button>
            <h1>HOLA 1</h1>
            <br/>
            <h1>HOLA 2</h1>
            <br/>
            <br/>
            <h1>HOLA 4</h1>
            <button onClick={() =>scrollTop() }>scroll up</button>
            <button onClick={(e) => handleSubmit(e)}>click</button>
        </div>
    )
}

export default (test1);