import { useState } from "react";

const SearchBar = () =>{

const [name, setName] = useState('')

const handleOnSubmit = (e) =>{
e.preventDefault();
console.log(name)
}

    return(
              <div class="container w-50 my-2">
                    <form id="formSearch" 
                    class="d-flex" 
                    role="search" 
                    onSubmit={(e)=> handleOnSubmit(e)}
                    >
                    <input id="idInputSearch"
                    class="form-control shadow-sm border-secondary me-2" 
                    type="search" 
                    placeholder="Search" 
                    aria-label="Search"
                    value={name} 
                    />
                    <button class="btn btn-outline-dark" 
                    type="submit"
                    >Search</button>
                    </form>
                </div>           
    )
}
export default SearchBar;