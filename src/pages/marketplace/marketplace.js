import React from "react";
import style from "./marketplace.module.css";

import MarkeplaceFeed from "./marketplaceFeed/marketplaceFeed";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import SearchBar from "../../components/SearchBar/Searchbar";

const Markeplace = (props) => {
  const tagOptions = [
    { value: "dj", label: "DJ" },
    { value: "music artist", label: "Music Artist" },
    { value: "other", label: "Other" },
  ];

  const animatedComponents = makeAnimated();

 
  return (
    <div >
     
       

      <SearchBar onSearch={props.handleSearch} onChange={props.handleMultiSelectChange}></SearchBar>

      {!props.loading && (
        <div >
          <MarkeplaceFeed linkpages={props.state.filteredLinkpages} />
        </div>
      )}
    </div>
  );
};

export default Markeplace;
