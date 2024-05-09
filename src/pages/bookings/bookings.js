import React from 'react';
import style from './bookings.module.css';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import BookingsFeedItemController from './bookingsFeed/bookingsFeedItem/bookingsFeedItemController';
import { useSearchParams } from 'react-router-dom';

const tabsTheme = createTheme({
    components: {
        MuiTabs: {
            styleOverrides: {
                root: {
                    width: '100% !important',
                    minWidth: '0 !important',
                },
                scrollButtons: {
                    '@media (max-width: 599.95px)': {
                      display: 'inline-flex',

                    },
                  },

            }
        }
    }
  });

const SMALL_SCREEN_WIDTH = 750;
const X_SMALL_SCREEN_WIDTH = 520;

const Bookings = (props) => {
    // if query param of success is true, show success message
    
    const [query, set__query] = useSearchParams();

    if (query.get("success")){
        setTimeout(() => {
            props.successCallback("Booking successfully paid for")
        }, 1000)
    }

    const [navValue, setNavValue] = React.useState('outgoing')

    const handleNavChange = (e, newValue) => {
        setNavValue(newValue);
    }

    let initialScreenSize = ""

    if(window.innerWidth <= X_SMALL_SCREEN_WIDTH) {
        if (window.innerWidth <= SMALL_SCREEN_WIDTH) {
            initialScreenSize = "x-small"
        }
        else {
            initialScreenSize = "small"
        }
    }
    else {
        initialScreenSize = "large"
    }

    const [isSmallScreen, setIsSmallScreen] = React.useState(initialScreenSize);

    

    

    
    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= SMALL_SCREEN_WIDTH? window.innerWidth <= X_SMALL_SCREEN_WIDTH? "x-small": "small" : "large");
    };

    React.useEffect(() => {
      
        if (props.searchPage === "outgoing" || props.searchPage === "incoming" || props.searchPage === "upcoming" || props.searchPage === "history"){   
            setNavValue(props.searchPage)
        }
        


        handleResize();
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup function to remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [props.searchPage]);


    const renderNavBar = () => {
        return (
            <div className={style.bookings_navbar}>
                <ThemeProvider theme={tabsTheme}>
                    <Tabs
                    className={style.tabs}
                    value={navValue}
                    onChange={handleNavChange}
                    aria-label=""
                    centered = {(isSmallScreen === "large")? true : false}
                    variant = {!(isSmallScreen==="large")? "scrollable" : "standard"}

                    scrollButtons={true}
                
                    >
                        <Tab value={'outgoing'} label={isSmallScreen==="x-small"? "Outgoing" : "Outgoing Enquiries"} data-testid="outgoing-tab"/>
                        {props.userState.is_artist && (
                            <Tab value={'incoming'} label={isSmallScreen==="x-small"? "Incoming" : "Incoming Enquiries"} data-testid="incoming-tab" />
                        )}
                        <Tab value={'upcoming'} label={isSmallScreen==="x-small"? "Upcoming" : "Upcoming Bookings"} data-testid="upcoming-tab"/>
                        <Tab value={'history'} label= {isSmallScreen==="x-small"? "History" : "Booking History"} data-testid="history-tab"/>
                </Tabs>
                    </ThemeProvider>

                </div>
        )
    }

    const renderSidebar = () => {
        const getNavbarClassActive = (key) => {
            if (navValue === key){
                return style.active
            }
            else {
                return ""
            }

        }
        return (
            <div className={style.bookings_sidebar}>

                <div className={style.sidebar_item + " " + getNavbarClassActive("outgoing")} onClick={() => setNavValue('outgoing')} data-testid="outgoing-tab">
                    Outgoing Enquiries
                </div>
                {props.userState.is_artist && (
                    <div className={style.sidebar_item  + " " + getNavbarClassActive("incoming")} onClick={() => setNavValue('incoming')} data-testid="incoming-tab">
                        Incoming Enquiries
                    </div>
                )}
                <div className={style.sidebar_item  + " " + getNavbarClassActive("upcoming")} onClick={() => setNavValue('upcoming')} data-testid="upcoming-tab">
                    Upcoming Bookings
                </div>
                <div className={style.sidebar_item + " " + getNavbarClassActive("history")} onClick={() => setNavValue('history')} data-testid="history-tab">
                    Booking History 
                </div>
            </div>
        )
    }



    const renderFeed = () => {
        let feedItems = []
        if (navValue === "outgoing"){
            feedItems = props.bookingsState.outgoing
            console.log("outgoing")
            console.log(feedItems)
        }
        else if (navValue === "incoming"){
            feedItems = props.bookingsState.incoming
            console.log(feedItems)
        }
        else if (navValue === "upcoming"){
            feedItems = props.bookingsState.upcoming
            console.log(feedItems)
        }
        else if (navValue === "history"){
            feedItems = props.bookingsState.history
            console.log(feedItems)
        }
        
        

        return (
            <div className={style.bookings_feed_container}>
                {feedItems.length > 0 ? (
                    feedItems.map((booking, index) => {
                        return (
                            <div className="mt-4" data-testid="booking-card">
                                <BookingsFeedItemController
                                key={index} 
                                booking={booking} userState={props.userState}
                                onAction={props.onAction}
                                errorCallback={props.errorCallback} 
                                successCallback={props.successCallback}
                                loadCallback={props.loadCallback}
                                />
                            </div>
                        )
                    })
                ) : (
                    <div className={style.feed_item}>
                        {(navValue === "outgoing") && (         
                            <div className={style.feed_item}>
                                You have no outgoing enquiries
                            </div>
                        )}
                        {navValue === "incoming" && (
                            <div className={style.feed_item}>
                                You have no incoming enquiries
                            </div>
                        )}
                        {navValue === "upcoming" && (
                            <div className={style.feed_item}>
                                You have no upcoming bookings
                            </div>
                        )}
                        {navValue === "history" && (
                            <div className={style.feed_item}>
                                You have no previous bookings
                            </div>
                        )}
                    </div>

                )}
            </div>
        )
    }

    return (
        <div className={style.bookings}>
            

            <div className={style.bookings_container}>
                <div className={style.bookings_header}>
                    My Bookings
                </div>
                {!props.loading && (
                    <div className={style.bookings_container_grid}>
                    
                        {renderNavBar()}
                        {renderSidebar()}
                        
                        

                        <div className={style.bookings_feed}>
                            {renderFeed()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )


}

export default Bookings;