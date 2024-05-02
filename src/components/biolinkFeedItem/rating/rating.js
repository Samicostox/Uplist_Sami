import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';



// ratingState: editable || not-editable || rated  
const Rating = ({
  rating = -1,
  ratingState = "editable",
  precision = 0.5,
  totalStars = 5,
  emptyIcon = StarBorderIcon,
  filledIcon = StarIcon,
  onRatingChange = () => { },
}) => {
  useEffect(() => {
    setActiveStar(rating);
  }, [rating]);

  const [activeStar, setActiveStar] = useState(rating);
  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const ratingContainerRef = useRef(null);

  const calculateRating = (e) => {
    const { width, left } = ratingContainerRef.current.getBoundingClientRect();
    let percent = (e.clientX - left) / width;
    const numberInStars = percent * totalStars;
    const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

    return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0));
  };

  // if the rating is editable, we want to get the 


  const handleClick = (e) => {
    if (ratingState !== "editable" ) return;
    
    setIsHovered(false);
    setActiveStar(calculateRating(e));
    onRatingChange(calculateRating(e));
  };

  const handleMouseMove = (e) => {
    if (ratingState !== "editable" ) return;
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleMouseLeave = (e) => {
    if (ratingState !== "editable" ) return;

    setHoverActiveStar(-1); // Reset to default state
    setIsHovered(false);
  };
  const EmptyIcon = emptyIcon;
  const FilledIcon = filledIcon;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        position: 'relative',
        cursor: 'pointer',
        textAlign: 'left'
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ratingContainerRef}
    >
      {[...new Array(totalStars)].map((arr, index) => {
        const activeState = isHovered ? hoverActiveStar : activeStar;

        const showEmptyIcon = activeState === -1 || activeState < index + 1;

        const isActiveRating = activeState !== 1;
        const isRatingWithPrecision = activeState % 1 !== 0;
        const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
        const showRatingWithPrecision =
          isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

        return (
          <Box
            position={'relative'}
            sx={{
              cursor: 'pointer'
            }}
            key={index}
            data-testid="rating-stars"
          >
            <Box
              sx={{
                width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%',
                overflow: 'hidden',
                position: 'absolute',
                transition: 'none',
                animation: 'none'
              }}
            >
              <FilledIcon style={ratingState==="rated"? {color: "#FD475D"} : {}}
              />
            </Box>
            {/*Note here */}
            <Box
              sx={{
                color: showEmptyIcon ? 'gray' : 'inherit'
              }}
            >
              {showEmptyIcon ? <EmptyIcon /> : <FilledIcon style={ratingState==="rated"? {color: "#FD475D"} : {}}/>}
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default Rating;