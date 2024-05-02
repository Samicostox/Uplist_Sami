import Book from "./book";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import dayjs from 'dayjs';
import TokenService from "../../request-model/services/token.service";
import UserService from "../../request-model/services/user.service";
import BookingService from "../../request-model/services/booking/booking.service";


const BookController = (props) => {
    const [loading, setLoading] = React.useState(true)
    const [state, setState] = React.useState({
        userId: null,
        pageImage: null,
    })




    const params = useParams();
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const [currentStage, setCurrentStage] = React.useState(1);


    const fetchData = useCallback (async (username) => {
        // if not logged in
        const token = TokenService.getUser()
        if (!token) {
            props.errorCallback("You must be logged in to book an artist")
            navigate("/auth/login")
        }


        setLoading(true)
        try {
            

            const response = await UserService.getLinkpage(username);
            console.log(response);
            if (response.status === 200) {
                if (response.data.length === 0) {
                    props.errorCallback("This user does not exist");
                    navigate("/");
                }
                else {
                    
                    // check if the user is active
                    if (!response.data.user.is_active) {
                        props.errorCallback("Page does not exist");
                        navigate("/");
                    }
                    else {
                        // // check if the user is artist and if they are approved 
                        if (!response.data.user.is_artist || !response.data.user.is_approved) { 
                            props.errorCallback("Page does not exist");
                            navigate("/");
                        }
                        else {
                            // get their stripe connection info
                            try {
                                const bookingResponse = await UserService.getStripeConnection(response.data.user.id)
                                let bookingInfo = "";
                                if (bookingResponse.status === 200) {
                                    if (!bookingResponse.data.is_active) {
                                        props.errorCallback("This artist is not taking bookings at the moment")
                                        navigate("/linkpage/" + username)
                                    }
                                    if (bookingResponse.data.service_info === null) {
                                        props.errorCallback("This artist is not taking bookings at the moment")
                                        navigate("/linkpage/" + username)
                                    }
                                    bookingInfo = bookingResponse.data.service_info
                                    
                                

                                    // set state
                                    setState({
                                        bookingInfo: bookingInfo,
                                        userId: response.data.user.id,
                                        pageImage: response.data.pageImage,
                                        isArtist: response.data.user.is_artist,
                                        isAproved: response.data.user.is_approved,
                                    })
                                }
                            }
                            catch (error) {
                                // if error is 404, then the artist book page does not exist
                                if (error.response.status === 404) {
                                    props.errorCallback("Page does not exist");
                                    navigate("/");
                                }
                                navigate("/");
                            }
                        }
                    }
                }
            }

        } catch (error) {
            console.log(error);
            props.errorCallback(error.message);
            navigate("/");
        }
        setLoading(false)
    }, [navigate, props])

    const stageHandler = useCallback( async () => {
        const username = params.username;
        const query = searchParams.get("session");
        const queryDecoded = atob(query);

        const querySplit = queryDecoded.split("&");

 
        await fetchData(username);
        // if the artist is not approved, or not an artist redirect to home page
    

        const startTimestamp = querySplit[0]
        const endTimestamp = querySplit[1]

        const price = querySplit[2]


        const startTimePresent = startTimestamp && startTimestamp.split("=")[0] === "starttime";
        const endTimePresent = endTimestamp && endTimestamp.split("=")[0] === "endtime";
        const pricePresent = price && price.split("=")[0] === "price";

        if (startTimePresent && endTimePresent && pricePresent) {
            // set to stage 2 with the data
            setStartDateTime(dayjs(startTimestamp[1]));
            setEndDateTime(dayjs(endTimestamp.split("=")[1]));
            setPrice(price.split("=")[1]);
            setCurrentStage(3);
        }
        else if (startTimePresent && endTimePresent) {
            // set to stage 1 with the data
            setStartDateTime(dayjs(startTimestamp.split("=")[1]));
            setEndDateTime(dayjs(endTimestamp.split("=")[1]));
            setCurrentStage(2);
        }
        else {
            // set to stage 1 with no data
            setCurrentStage(1);
        }


    }, [fetchData, params.username, searchParams])

    useEffect(() => {

        stageHandler();

        
    }, [navigate, params.username, searchParams, stageHandler])

    const initialTime = dayjs().minute(0).add(1, 'hour'); 

    const [startDateTime, setStartDateTime] = React.useState(dayjs(initialTime));
    const [endDateTime, setEndDateTime] = React.useState(dayjs(initialTime.add(15,"minutes")));
    const handleEndTimeChange = (newValue) => {
        // round to the nearest 15 minutes
        const rounded = dayjs(newValue).minute(Math.round(dayjs(newValue).minute() / 15) * 15);

        setEndDateTime(rounded);
    }

    const handleStartTimeChange = (newValue) => {
        // round to the nearest 15 minutes
        const rounded = dayjs(newValue).minute(Math.round(dayjs(newValue).minute() / 15) * 15);
        setStartDateTime(rounded);
    }
    const handleStage1Submit = (e) => {
        e.preventDefault();

        let valid = true;
        // check if start time is before end time
        if (startDateTime >= endDateTime) {
            valid = false;
        }
        // check if start time is in the future
        if (startDateTime < dayjs()) {
            valid = false;
        }
        // check if end time is in the future
        if (endDateTime < dayjs()) {
            valid = false;
        }
        if (valid) {
            const startTime = startDateTime.toString();
            const endTime = endDateTime.toString();
            const query = btoa(`starttime=${startTime}&endtime=${endTime}`)
            // test decode
            navigate("/book/" + params.username + "?session="+ query);
        }
        else {
            props.errorCallback("Invalid time range");
        }
    }

    const [price, setPrice] = React.useState(undefined);
    const [notes, setNotes] = React.useState(undefined);
    const handlePriceChange = (e) => {
        // make sure that the price has £ in front of it
        let newPrice = e.target.value;
        if (newPrice[0] !== "£") {
            newPrice = "£" + newPrice;
        }

        setPrice(newPrice);
    }
    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    }

     const handleStage2Submit = async(e) => {
        e.preventDefault();

        // remove £ from price
        let priceValue = price.replace("£", "");

        // check if price is valid
        // price must be a number greater than 0
        if (priceValue <= 0 || isNaN(priceValue)) {
            props.errorCallback("Invalid price");
            return;
        }

        try{
            // create new booking 
            const bookingResp = await BookingService.createBooking(state.userId);

            if (bookingResp.status === 201) {
                let bookingId = bookingResp.data.id;
                // create new enquiry for the booking 
                let formatedStartTime = startDateTime.format("YYYY-MM-DD HH:mm:ss");
                let formatedEndTime = endDateTime.format("YYYY-MM-DD HH:mm:ss");

                const enquiryResp = await BookingService.createEnquiry(bookingId, bookingId,formatedStartTime, formatedEndTime, priceValue, notes);
                if (enquiryResp.status === 201) {
                    props.successCallback("Booking enquiry created");

                    const startTime = startDateTime.toString();
                    const endTime = endDateTime.toString();
                    const query = btoa(`starttime=${startTime}&endtime=${endTime}&price=${price}`)
                    // test decode
                    navigate("/book/" + params.username + "?session="+ query);
                }
            }
        }catch(err){
            props.errorCallback("Error creating booking");
        }

    }

    return (
        <Book 
            bookingInfo={state.bookingInfo}
            pageImage={state.pageImage}
            loading={loading}

            currentStage={currentStage}
            handleStage1Submit={handleStage1Submit}
            handleStage2Submit={handleStage2Submit}

            startDateTime={startDateTime}
            handleStartTimeChange={handleStartTimeChange}
            endDateTime={endDateTime}
            handleEndTimeChange={handleEndTimeChange}
            price={price}
            handlePriceChange={handlePriceChange}
            notes={notes}
            handleNotesChange={handleNotesChange}



        />

    )
}

export default BookController;

