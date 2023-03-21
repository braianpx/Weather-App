import { useState } from "react";
import { getCity } from "../../redux/actions/index";
import './SearchBar.css';

const SearchBar = (props) =>{

const [name, setName] = useState('');

const handleInputChange = (e) => {
    setName(e.target.value)
};
const handleOnSubmit = (e) =>{
e.preventDefault();
if(name){
props.dispatch(getCity(name))
setName('');
}
};

    return(
              <div className="container my-2 justify-content-center align-items-center align-content-center" id='id_div_search_bar'>
                    <form id="formSearch" className="d-flex" role="search" onSubmit={(e)=> handleOnSubmit(e)}>
                    <input id="idInputSearch"
                        className="form-control shadow-sm border-secondary me-2" 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        value={name}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-outline-dark" type="submit"> Search </button>
                    </form>
                </div>           
    )
}
export default SearchBar;