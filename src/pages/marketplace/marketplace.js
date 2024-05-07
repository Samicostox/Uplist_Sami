import React from "react";
import style from "./marketplace.module.css";
import MarkeplaceSearch from "../../components/marketplaceSearch/marketplaceSearch";
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,

      minHeight: "40px",
      height: "40px",
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: "40px",
      padding: "0 6px",
    }),

    input: (provided, state) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: "35px",
    }),
    menu: (provided, state) => ({
      ...provided,
      alignItems: "flex-start",
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: "left",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      textAlign: "left",
    }),
  };

  return (
    <div >
      <div >
        <MarkeplaceSearch onSearch={props.handleSearch} />
        <div >
          <Select
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Filter by artist type..."
            options={tagOptions}
            styles={customStyles}
            isMulti
            defaultValue={[]}
            components={animatedComponents}
            onChange={props.handleMultiSelectChange}
          />
        </div>
      </div>

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
