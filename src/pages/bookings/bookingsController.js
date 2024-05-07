import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import TokenService from '../../request-model/services/token.service';
import UserService from '../../request-model/services/user.service';
import BookingService from '../../request-model/services/booking/booking.service';
import Bookings from './bookings';



const BookingsController = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [loading, setLoading] = React.useState(true)

    const navigate = useNavigate();

    const [userState, setUserState] = React.useState({  
        user: null,
    })

    const [bookingsState, setBookingsState] = React.useState({
        outgoing: [],
        incoming: [],
        upcoming: [],
        history: [],
    })



    const fetchBookings =  useCallback( async(userId) => {
        try {
            const resp = await BookingService.getAllBookings()
            if (resp.status === 200){

                console.log(resp)

                // drop the draft bookings
                let bookings = resp.data?.filter(booking => booking.status !== "draft")

                // for each booking, append the enquiry to the booking 
                let bookingsWithEnquiry = []
                
                for (let booking of bookings) {
                    try{
                        // if draft or cancelled, don't get the artist
                        if (booking.status === "draft" || booking.status === "cancelled_by_user"){
                            continue
                        }
                        
                        const resp = await BookingService.getEnquiryForBooking(booking.active_enquiry, booking.id)
                        if (resp.status === 200){
                            bookingsWithEnquiry.push({
                                ...booking,
                                enquiry: resp.data
                            })
                            booking.enquiry = resp.data
                        }
                    }
                    catch(err) { 
                        console.log("error getting enquiry: ", err)
                    }
                }

                let bookingsWithArtist = []

                for (let booking of bookingsWithEnquiry){
                    try{

                        // if draft or cancelled, don't get the artist
                        if (booking.status === "draft" || booking.status === "cancelled_by_user"){
                            continue
                        }

                        let resp = await UserService.getLinkpageById(booking.artist)
                        
                        
                        if (resp.status === 200){
                            let artistData = {
                                pageImage: resp.data.pageImage,
                                description: resp.data.description,
                                user: resp.data.user,
                                average_rating: resp.data.average_rating,
                            }
                            bookingsWithArtist.push({
                                ...booking,
                                artistState: artistData,
                            })

                        }
                    }
                    catch (err) {
                        console.log("error getting artist: ", err)
                    }
                }

                let bookingsWithRatings = []
                let rated = []

                try{
                    const resp = await UserService.getAllRatings();
                    if (resp.status === 200){
                        rated = resp.data
                    }
                }
                catch(err){
                    console.log("error getting ratings: ", err)
                }

                // for each booking, if the artist is rated set the user rating else set to undefined
                for (let booking of bookingsWithArtist){
                    let userRating = undefined
                    for (let rating of rated){
                        if (rating.booking === booking.id ){
                            userRating = rating.rating
                            bookingsWithRatings.push({
                                ...booking,
                                userRating: userRating,
                                
                            })
                        }
                    }
                    if (!userRating){
                        bookingsWithRatings.push({
                            ...booking,
                            userRating: userRating,
                        })
                    }
                }



                

                // catagorise the bookings into the different catorgories
                // outgoing, incoming, upcoming, history
                const outgoingBookings = []
                const incomingBookings = []
                const upcomingBookings = []
                const historyBookings = []

                await bookingsWithRatings.forEach( booking => {
                    let currentTimestamp = new Date()
                    // convert the start and end dates to date objects
                    let start_datetime = new Date(booking.enquiry.start_datetime)
                    let end_datetime = new Date(booking.enquiry.end_datetime)


                    if (booking.status === "pending_artist_action" || booking.status === "pending_user_action" || booking.status === "pending_payment"){
                        // if the date is in the future 
                        if (start_datetime  > currentTimestamp){
                            if (booking.artist === userId){
                                incomingBookings.push({...booking,
                                    allowRatings: false
                                })
                                    
                            }
                            if (booking.user === userId){
                                outgoingBookings.push({...booking,
                                    allowRatings: false
                                })
                            }
                        }
                    }
                    else if (booking.status === "rejected_by_artist"){
                        // if rejected by artist, then only show to user
                        if (booking.user === userId){
                            outgoingBookings.push({...booking,
                                allowRatings: false
                            })
                        }
                    }
                    else if (booking.status === "cancelled_by_user" ){
                        // if cancelled by user, then dont show to anyone
                    }
                    else if (booking.status === "pending_payment"){
                        if (booking.artist === userId){
                            incomingBookings.push({...booking,
                                allowRatings: false
                            })
                        }
                        if (booking.user === userId){
                            outgoingBookings.push({...booking,
                                allowRatings: false
                            })
                        }
                    }
                    else if (booking.status === "paid"){
                        // if the date is in the future then add to upcoming, else if the end date is in the past then add to history
                        if (end_datetime > currentTimestamp){
                            upcomingBookings.push({...booking,
                                allowRatings: false
                            })
                        }
                        else {
                            // if outgoing allow them to rate the artist
                            if (booking.user === userId){
                                historyBookings.push({...booking,
                                    allowRatings: true,
                                    completed: true
                                })
                            } 
                            // else just display 
                            else if (booking.artist === userId){
                                historyBookings.push({...booking,
                                    allowRatings: false,
                                    completed: true
                                })
                            }
                        }
                    }
                    else if (booking.status === "refunded"){
                        // add to history
                        historyBookings.push({...booking,
                            allowRatings: false,
                        })
                    }
                })


                await setBookingsState({
                    outgoing: outgoingBookings,
                    incoming: incomingBookings,
                    upcoming: upcomingBookings,
                    history: historyBookings,
                })
            }
        } catch(err){
            // if 401 then redirect to home page
            if (err.response.status === 401){
                navigate("/")
                console.log("redirecting to home page")
            } if (err.response.status === 400){
                navigate("/")
            }
        }
    },  [navigate])

    const fetchData = useCallback( async () => {

        
        setLoading(true)

        setSearchParams({})
        
        const loggedInUser = TokenService.getUser();
        if (!loggedInUser){
            props.errorCallback("You must be logged in to view this page")
            navigate('/auth/login')
        }

        try{
            const resp = await UserService.getLinkpage(loggedInUser.username)
            if (resp.status === 200){
                
                setUserState({
                    ...resp.data?.user,
                })
                await fetchBookings(resp.data?.user.id)
                
            }
        }catch(err){
            console.log(err)
        }
        setLoading(false)
 
    }, [ navigate, setSearchParams, fetchBookings, props])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

    const onAction = () => {
        fetchData();
    }

    return (
        <Bookings 
            successCallback={props.successCallback}
            errorCallback={props.errorCallback}

            searchPage={searchParams.get("page")}

            userState={userState}
            bookingsState={bookingsState}
            loading={loading}
            onAction={onAction}

            />
    )

}



export default BookingsController;