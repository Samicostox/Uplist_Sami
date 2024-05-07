import React from "react";
import style from "./marketplaceFeed.module.css";

import BiolinkFeedItem2 from "../../../components/biolinkFeedItem/biolinkFeedItem2";

const MarkeplaceFeed = (props) => {
  return (
    <div >
      {props.linkpages.length === 0 ? (
        <div >No biolinks found</div>
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
