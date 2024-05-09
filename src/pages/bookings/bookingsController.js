import React, { useCallback,useEffect } from 'react';
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


    const [bookingsList, setBookingsList] = React.useState([]);

   
    

    const fetchAllBookings =  useCallback( async(userId) => {
        try {
            const resp = await BookingService.get_all_detailed_enquiries()
            if (resp.status === 200){

                

                

                

                // catagorise the bookings into the different catorgories
                // outgoing, incoming, upcoming, history
                const bookingsWithoutRatings = resp.data;
                const outgoingBookings = []
                const incomingBookings = []
                const upcomingBookings = []
                const historyBookings = []
                const bookingsWithRatings = []
                let rated = []
               

                for (let booking of bookingsWithoutRatings){
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
                const filteredBookings = bookingsWithRatings.filter(booking => booking.status !== "cancelled_by_user" && booking.status !== "draft");
              
                

                await filteredBookings.forEach( booking => {
                    
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


    

    

    const fetchallData = useCallback( async () => {

        
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
                await fetchAllBookings(resp.data?.user.id)
                
            }
        }catch(err){
            console.log(err)
        }
        setLoading(false)
 
    }, [ navigate, setSearchParams, fetchAllBookings, props])

    React.useEffect(() => {
       
      
        fetchallData()
    }, [ fetchallData])

    const onAction = () => {
        
      
        fetchallData();
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