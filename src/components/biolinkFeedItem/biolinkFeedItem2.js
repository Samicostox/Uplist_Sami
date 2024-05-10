import React from "react";
import style from "./biolinkFeedItem.module.css";
import { NavLink } from "react-router-dom";
import Tags from "./tags/tags";
import Rating from "./rating/rating";

const stateValues = {
    linkpageId : undefined,
    userId: undefined,
    username : "",
    tags: [""],
    subheading: "",
    headerImage: undefined,
    rating: undefined,
};


const BiolinkFeedItem2 = (props) => {
    const [state,setstate] = React.useState(stateValues);

    React.useEffect(() => {
      console.log(props.linkpage)
        // mock state for now
        setstate(state =>({
            ...state,
            linkpageId: props.linkpage.id,
            userId: props.linkpage.user.id,
            tags: [props.linkpage.user.artist_type],
            username: props.linkpage.user.username,
            subheading: props.linkpage.description,
            headerImage: props.linkpage.profilePicture,
            rating: props.linkpage?.average_rating,
        }))
    },[props.linkpage])

    const renderImage = (headerImage) => {
        // check if the image url starts with http
        // if it does then it is a url and we can use it
        // if it does not then we will need to add the base url to it
        
  
  
        if (headerImage) {
          return (
            <img src={headerImage} alt="profile" className={style.heading_image} data-testid = "biolink-feed-item-image"/>
          )
        } else {
          return (
            <img src="/pictures/temp/profile.png" alt="profile" className={style.heading_image + " "+ style.loaded} data-testid = "biolink-feed-item-temp-image"/>
          )
        }
        
      }
  return (

    <div className="px-4 sm:px-10">
    <NavLink to={`/biolink/${state.username}`}>
    
      <div className="flex max-w-6xl mx-auto p-3 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 relative mt-3">
        {/* Badge */}
        <span className="absolute top-0 right-0 mt-7 mr-2">
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-100 px-2 py-1 text-sm md:text-md font-medium text-indigo-700">
            <svg className="h-1.5 w-1.5 fill-indigo-500" viewBox="0 0 6 6" aria-hidden="true">
              <circle cx={3} cy={3} r={3} />
            </svg>
           {state.tags}
          </span>
        </span>
        {/* Content */}
        <img 
          src={state.headerImage}
          alt="Descriptive Alt Text"
          className="rounded-lg mr-4 self-start h-32 w-32" // Adjusted margin-right for better spacing
        />
        <div className="mt-4 w-3/4"> {/* Increased top margin for the text block and limited width */}
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{state.username}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm md:text-base max-w-3xl break-all"> {/* Applied responsive text size */}
    {state.subheading}
</p>

        </div>
      </div>
      </NavLink>
      </div>
  
  );
}

export default BiolinkFeedItem2;
