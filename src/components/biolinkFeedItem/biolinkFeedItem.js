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



const BiolinkFeedItem = (props) => {

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
      <NavLink to={"/biolink/" + state.username} className={style.link} data-testid="biolink-feed-item">
        <div className={style.biolinkFeedItem}>
          <Tags tags={state.tags} />
          <div className = {style.body}>
              <div className = {style.image_container}>
                  {renderImage(state.headerImage)}

              </div>

              <div className = {style.content_container}>
                  <div className = {style.username}>
                      {state.username}
                  </div>

                  <div className = {style.subheading}>
                      {state.subheading}
                  </div>

                  <div className = {style.bio}>
                      {state.bio}
                  </div>

                  
                    <div className = {style.rating}>
                      rating: 
                      {(!state?.rating ? <span>no available ratings</span>: <Rating className={style.rating_item} rating={state?.rating} ratingState = {"not-rated"}  /> )}
                    </div>
                  

              </div>            
          </div>
        </div>
      </NavLink>
    )

}

export default BiolinkFeedItem;
