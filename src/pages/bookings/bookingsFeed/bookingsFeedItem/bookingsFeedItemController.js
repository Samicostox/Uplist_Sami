import React, {useEffect, useCallback} from 'react';
import BookingsFeedItem from './bookingsFeedItem';
import UserService from '../../../../request-model/services/user.service';
import BookingService from '../../../../request-model/services/booking/booking.service';


const BookingsFeedItemController = (props) => {
    const [ratingState, setRatingState] = React.useState("not-editable"); 
    useEffect(() => {
        if (!props.booking?.allowRatings) {
            if (props.booking?.userRating) {
                setRatingState("rated")
            } else {
                setRatingState("not-editable")
            }
        } else {
            if (props.booking?.userRating) {
                setRatingState("rated")
            }
            else {
                setRatingState("editable")
            }
        }


    }, [props.booking])

    const artistAccept = async() => {
        try {
            const resp = await BookingService.approveBooking(props.booking.id);
            if (resp.status === 200) {
                props.successCallback("Booking approved");
            }
        }catch (e) {
            if (e.response.status === 400) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 401) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 404) {
                props.errorCallback(e.response.data);
            }
            else {
                props.errorCallback("Could not approve booking");
            }
        }
        props.onAction();
    }

    const artistDecline = async() => {
        try {
            const resp = await BookingService.rejectBooking(props.booking.id);
            if (resp.status === 200) {
                props.successCallback("Booking declined");
            }
        }catch (e) {
            if (e.response.status === 400) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 401) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 404) {
                props.errorCallback(e.response.data);
            }
            else {
                props.errorCallback("Something went wrong, please try again later");
            }
        }
        props.onAction();
    }

  

    const userAccept = async () => {
        try {
            const resp = await BookingService.approveBooking(props.booking.id);
            if (resp.status === 200) {
                props.successCallback("Booking approved");
            }
        }catch (e) {
            if (e.response.status === 400) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 401) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 404) {
                props.errorCallback(e.response.data);
            }
            else {
                props.errorCallback("Could not approve booking");
            }
        }
        props.onAction();
    }

    const userCancel = async() => {
        try {
            const resp = await BookingService.rejectBooking(props.booking.id);
            if (resp.status === 200) {
                props.successCallback("Booking cancelled");
            }
        }catch (e) {
            if (e.response.status === 400) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 401) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 404) {
                props.errorCallback(e.response.data);
            }
            else {
                props.errorCallback("Something went wrong, please try again later");
            }
        }
        props.onAction();
    }

    const userDecline = async () => {
        try {
            const resp = await BookingService.rejectBooking(props.booking.id);
            if (resp.status === 200) {
                props.successCallback("Declined successfully");
            }
        }catch (e) {
            if (e.response.status === 400) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 401) {
                props.errorCallback(e.response.data);
            }
            else if (e.response.status === 404) {
                props.errorCallback(e.response.data);
            }
            else {
                props.errorCallback("Something went wrong, please try again later");
            }
        }
        props.onAction();
    }

    

    const userPay = async () => {
        try {
            
            const resp = await BookingService.payBooking(props.booking.id);
            if (resp.status === 200) {
  
                let redirectUrl = resp.data.redirect;
                // redirect to redirectUrl
                window.location.href = redirectUrl;
                
            }
        }catch (error) {
            console.log(error)
        }
        props.onAction();
    }

    const onCounter = async (price) => {
        try {
            const resp = await BookingService.counterEnquiry(
                props.booking.id, 
                props.booking.id,
                props.booking?.enquiry?.start_datetime,
                props.booking?.enquiry?.end_datetime,
                price,
                props.booking?.enquiry?.notes,
            );
            if (resp.status === 200) {
                props.successCallback("Enquiry countered");
            }
        } catch (e) {
                props.errorCallback("Something went wrong");
            
        }
        props.onAction();
    }

     // callback function to handle rating change
     const onRatingChange = useCallback(async(rating) => {
        // create new rating 
        // call the callback function
        try {
            const resp = await UserService.createRating(
                props.userState.id,
                props.booking.id,
                props.booking.artist.id,
                rating,
            );
            if (resp.status === 201) {
                props.successCallback("Rating created"); // TODO might not be needed to show this message
            }

        } catch (e) {
            console.log("error creating rating: ", e);
        }

        setRatingState("rated")
    }, [props])

    return (
        <BookingsFeedItem 
            successCallback={props.successCallback}
            errorCallback={props.errorCallback}    

            booking={props.booking}
            userState={props.userState}
            artistState={props.artistState}
            onCounter = {onCounter}

            artistAccept={artistAccept}
            artistDecline={artistDecline}

            userAccept={userAccept}
            userCancel={userCancel}
            userDecline={userDecline}
            userPay={userPay}
            
            ratingState={ratingState}
            onRatingChange={onRatingChange}
            
        />
    )

}


export default BookingsFeedItemController;