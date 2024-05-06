import React from "react";
import style from "./marketplaceFeed.module.css";
import BiolinkFeedItem from "../../../components/biolinkFeedItem/biolinkFeedItem";
import BiolinkFeedItem2 from "../../../components/biolinkFeedItem/biolinkFeedItem2";

const MarkeplaceFeed = (props) => {
  return (
    <div className={style.marketplaceFeed}>
      {props.linkpages.length === 0 ? (
        <div className={style.no_linkpages}>No biolinks found</div>
      ) : (
        <>
          {props.linkpages.map((linkpage, index) => {
            return <BiolinkFeedItem2 linkpage={linkpage} key={index} />;
          })}
        </>
      )}
    </div>
  );
};

export default MarkeplaceFeed;
