import React from "react";
import style from "./marketplaceSearch.module.css";
import { FaSearch } from 'react-icons/fa';

const MarkeplaceSearch = (props) => {

    const [searchTerm , setSearchTerm] = React.useState('')

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }
    
    const handleSearchSubmit = (event) => {
        event.preventDefault()
        props.onSearch(searchTerm)
    }
 

    return (
        <div className={style.marketplaceSearch} data-testid= "marketplace-search-form">
            <form onSubmit={handleSearchSubmit}>
                <div className={style.searchbar}>
                    <input className={style.searchbar_input} type="text" placeholder="Search artists" value={searchTerm} onChange={handleSearchChange}/>
                    <button className={style.searchbar_icon} type="submit">
                        <FaSearch color=""/>
                    </button>
                </div>
            </form>


        </div>
    )
}

export default MarkeplaceSearch;