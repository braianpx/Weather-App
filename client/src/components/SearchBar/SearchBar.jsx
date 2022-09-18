import { useState } from "react";
import { getCity } from "../../redux/actions/index";
import { useDispatch } from "react-redux";

const SearchBar = () =>{

const [name, setName] = useState('');
const dispatch = useDispatch();

const handleInputChange = (e) => {
    setName(e.target.value)
};
const handleOnSubmit = (e) =>{
e.preventDefault();
dispatch(getCity(name))
setName('');
};

    return(
              <div class="container w-50 my-2">
                    <form id="formSearch" class="d-flex" role="search" onSubmit={(e)=> handleOnSubmit(e)}>
                    <input id="idInputSearch"
                    class="form-control shadow-sm border-secondary me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    value={name}
                    onChange={handleInputChange}
                    />
                    <button class="btn btn-outline-dark" type="submit"> Search </button>
                    </form>
                </div>           
    )
}
export default SearchBar;