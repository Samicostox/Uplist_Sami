import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import BookingsFeedItem from "./bookingsFeedItem";


let userAccept = jest.fn();
let userDecline = jest.fn();
let userCancel = jest.fn();
let userPay = jest.fn();
let onCounter = jest.fn();

let artistAccept = jest.fn();
let artistDecline = jest.fn();




let mockProps = {
    booking: {
        id: 1,
        user: 2,
        artist: 3,
        status: "pending_artist_action",
        is_paid: false,
        active_enquiry: 30,
        completed: false,
        artistState: {
            id: 3,
            user: {
                id: 3,
                username: "testArtist",
                email: "testArtist@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            },
            header: "testArtist header",
            description: "testArtist description",
            is_dark_mode: true,
            pageImage: undefined,
            links: [],
            average_rating: 2
        },
        enquiry: {
            id: 30,
            master_booking: 1,
            price: 234.0,
            start_datetime: "2023-06-18T19:00:35Z",
            end_datetime: "2023-06-18T19:15:35Z",
            note: "fredrf4e",
            is_counter_offer: false
        },
        
        userRating: undefined,
        
    },
    userState: {
        id: 2,
        username: "testUser",
        email: "testUser@fdas.com",
        is_artist: true,
        is_approved: true,
        is_active: true,
        artist_type: "music artist",
        is_linkpage_visible: true
    
},

    userAccept: userAccept,
    userCancel: userCancel,
    userDecline: userDecline,
    userPay: userPay,

    onCounter: onCounter,
    onAction: jest.fn(),
    successCallback: jest.fn(),
    errorCallback: jest.fn(),

    artistAccept: artistAccept,
    artistDecline: artistDecline,

    ratingState: "not_rated", 
    onRatingChange: jest.fn(),
}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        booking: {
            id: 1,
            user: 2,
            artist: 3,
            status: "pending_artist_action",
            is_paid: false,
            active_enquiry: 30,
            completed: false,
            artistState: {
                id: 3,
                user: {
                    id: 3,
                    username: "testArtist",
                    email: "testArtist@fdas.com",
                    is_artist: true,
                    is_approved: true,
                    is_active: true,
                    artist_type: "music artist",
                    is_linkpage_visible: true
                },
                header: "testArtist header",
                description: "testArtist description",
                is_dark_mode: true,
                pageImage: undefined,
                links: [],
                average_rating: 2
            },
            enquiry: {
                id: 30,
                master_booking: 1,
                price: 234.0,
                start_datetime: "2023-06-18T19:00:35Z",
                end_datetime: "2023-06-18T19:15:35Z",
                note: "fredrf4e",
                is_counter_offer: false
            },
            
            userRating: undefined,
            
        },
        userState: {
                id: 2,
                username: "testUser",
                email: "testUser@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            
        },
    
        userAccept: userAccept,
        userCancel: userCancel,
        userDecline: userDecline,
        userPay: userPay,
    
        onCounter: jest.fn(),
        onAction: jest.fn(),
        successCallback: jest.fn(),
        errorCallback: jest.fn(),
    
        artistAccept: artistAccept,
        artistDecline: artistDecline,
    
        ratingState: "not_rated", 
        onRatingChange: jest.fn(),
    }
})

const mockBookingFeedItem = (props) => {
    return render (
        <Router>
            <BookingsFeedItem {...props} />
        </Router>
    )
}

test ("renders without crashing", () => {
    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem).toBeTruthy();
    expect(bookingFeedItem.getByTestId("bookings-feed-item").toBeInTheDocument);
})

test ("renders the static content of the booking correctly", () => {
    mockProps.booking.artistState = {
        id: 3,
        user: {
            id: 3,
            username: "testArtist",
            email: "testArtist@fdas.com",
            is_artist: true,
            is_approved: true,
            is_active: true,
            artist_type: "music artist",
            is_linkpage_visible: true
        },
        header: "testArtist header",
        description: "testArtist description",
        is_dark_mode: true,
        pageImage: undefined,
        links: [],
        average_rating: 2
    };

    mockProps.booking.enquiry = {
        id: 30,
        master_booking: 1,
        price: 234.0,
        start_datetime: "2023-07-01T19:00:35Z",
        end_datetime: "2023-07-02T19:15:35Z",
        note: "test note",
        is_counter_offer: false
    };

    
    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("testArtist").toBeInTheDocument);
    expect(bookingFeedItem.getByText("testArtist description").toBeInTheDocument);

    expect(bookingFeedItem.getByText("Price: £234").toBeInTheDocument);

    expect(bookingFeedItem.getByText("Start:").toBeInTheDocument);
    expect(bookingFeedItem.getByText("Sat Jul 01 2023").toBeInTheDocument);
    expect(bookingFeedItem.getByText("20:00").toBeInTheDocument);

    expect(bookingFeedItem.getByText("End:").toBeInTheDocument);
    expect(bookingFeedItem.getByText("Sat Jul 01 2023").toBeInTheDocument);
    expect(bookingFeedItem.getByText("20:15").toBeInTheDocument);

    expect(bookingFeedItem.getByText("User notes:").toBeInTheDocument);
    expect(bookingFeedItem.getByText("test note").toBeInTheDocument);

    expect(bookingFeedItem.getByText("Status:").toBeInTheDocument);
})

test ("renders the correct status when pending_artist_action & we are the artist", () => {
    mockProps.booking.status = "pending_artist_action";
    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;



    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct status is shown
    expect(bookingFeedItem.getByText("respond to the enquiry").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when pending_artist_action & we are the user", () => {
    mockProps.booking.status = "pending_artist_action";
    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct status is shown
    expect(bookingFeedItem.getByText("waiting for the artist to respond").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

}  );

test ("renders the correct status when pending_user_action & we are the artist", () => {
    mockProps.booking.status = "pending_user_action";
    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct status is shown
    expect(bookingFeedItem.getByText("waiting for the users response").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when pending_user_action & we are the user", () => {
    mockProps.booking.status = "pending_user_action";
    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct status is shown
    expect(bookingFeedItem.getByText("respond to the updated enquiry").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when rejected_by_artist & we are the artist", () => {
    mockProps.booking.status = "rejected_by_artist";
    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // we dont show the status for the artist, (they know they rejected it, and it doesnt show in their feed)


    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when rejected_by_artist & we are the user", () => {
    mockProps.booking.status = "rejected_by_artist";
    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct status is shown
    expect(bookingFeedItem.getByText("rejected by the artist").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

})

test ("renders the correct status when canceclled_by_user & we are the artist", () => {
    mockProps.booking.status = "canceclled_by_user";
    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("cancelled").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when canceclled_by_user & we are the user", () => {
    mockProps.booking.status = "canceclled_by_user";
    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("cancelled").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when pending_payment & we are the artist", () => {
    mockProps.booking.status = "pending_payment";
    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("waiting for payment").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when pending_payment & we are the user", () => {
    mockProps.booking.status = "pending_payment";
    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("pay now to confirm booking").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when paid but not completed (service date past) and we are the artist", () => {
    mockProps.booking.status = "paid";
    mockProps.booking.completed = false;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("booking confirmed").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when paid but not completed (service date past) and we are the user", () => {
    mockProps.booking.status = "paid";
    mockProps.booking.completed = false;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("booking confirmed").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("service completed")).toBeNull();

});

test ("renders the correct status when paid and completed (service date future) and we are the artist", () => {
    mockProps.booking.status = "paid";
    mockProps.booking.completed = true;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("service completed").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();

});

test ("renders the correct status when paid and completed (service date future) and we are the user", () => {
    mockProps.booking.status = "paid";
    mockProps.booking.completed = true;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    expect(bookingFeedItem.getByText("service completed").toBeInTheDocument);

    // incorrect status is not shown
    expect(bookingFeedItem.queryByText("respond to the enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the artist to respond")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for the users response")).toBeNull();
    expect(bookingFeedItem.queryByText("respond to the updated enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("rejected by the artist")).toBeNull();
    expect(bookingFeedItem.queryByText("cancelled")).toBeNull();
    expect(bookingFeedItem.queryByText("waiting for payment")).toBeNull();
    expect(bookingFeedItem.queryByText("pay now to confirm booking")).toBeNull();
    expect(bookingFeedItem.queryByText("booking confirmed")).toBeNull();

});


// test the render of the correct buttons for each status

test ("renders the correct buttons when pending_artist_action and we are the artist", () => {
    mockProps.booking.status = "pending_artist_action";
    mockProps.booking.completed = false;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct buttons are shown
    expect(bookingFeedItem.getByText("Accept")).toBeInTheDocument;
    expect(bookingFeedItem.getByText("Counter")).toBeInTheDocument;
    expect(bookingFeedItem.getByText("Decline")).toBeInTheDocument;

    


    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();

    // test the buttons work
    // artistAccept is called when the accept button is clicked
    expect(mockProps.artistAccept).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Accept"));
    expect(mockProps.artistAccept).toHaveBeenCalledTimes(1);

    // artistDecline is called when the decline button is clicked
    expect(mockProps.artistDecline).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Decline"));
    expect(mockProps.artistDecline).toHaveBeenCalledTimes(1);

    // artistCounter is called when the counter button is clicked
    expect(mockProps.onCounter).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Counter"));
    
    // counter modal is shown
    waitFor(() => {
        expect(bookingFeedItem.getByTestId("counter-booking").toBeInTheDocument);
    });
    expect(bookingFeedItem.getByTestId("counter-booking").toBeInTheDocument);


});

test ("renders the correct buttons when pending_artist_action and we are the user", () => {
    mockProps.booking.status = "pending_artist_action";
    mockProps.booking.completed = false;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct buttons are shown
    expect(bookingFeedItem.getByText("Cancel")).toBeInTheDocument;
    
    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();

    // test the buttons work
    // userCancel is called when the cancel button is clicked
    expect(mockProps.userCancel).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Cancel"));
    expect(mockProps.userCancel).toHaveBeenCalledTimes(1);

}); 

test ("renders the correct buttons when pending_user_action and we are the artist", () => {
    mockProps.booking.status = "pending_user_action";
    mockProps.booking.completed = false;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // there are no actions for the artist to take

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
})

test ("renders the correct buttons when pending_user_action and we are the user", () => {
    mockProps.booking.status = "pending_user_action";
    mockProps.booking.completed = false;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct buttons are shown
    expect(bookingFeedItem.getByText("Accept")).toBeInTheDocument;
    expect(bookingFeedItem.getByText("Decline")).toBeInTheDocument;
    expect(bookingFeedItem.getByText("Counter")).toBeInTheDocument;

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect (bookingFeedItem.queryByText("Pay")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();

    // test the buttons work
    // userAccept is called when the accept button is clicked
    expect(mockProps.userAccept).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Accept"));
    expect(mockProps.userAccept).toHaveBeenCalledTimes(1);

    // userDecline is called when the decline button is clicked
    expect(mockProps.userDecline).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Decline"));
    expect(mockProps.userDecline).toHaveBeenCalledTimes(1);

    // userCounter is called when the counter button is clicked
    expect(mockProps.onCounter).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Counter"));

    // counter modal is shown
    waitFor(() => {
        expect(bookingFeedItem.getByTestId("counter-booking").toBeInTheDocument);
    })
    expect(bookingFeedItem.getByTestId("counter-booking").toBeInTheDocument);

});

test ("renders the correct buttons when rejected_by_artist and we are the artist", () => {
    mockProps.booking.status = "rejected_by_artist";
    mockProps.booking.completed = false;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // there are no actions for the artist to take

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
});

test ("renders the correct buttons when rejected_by_artist and we are the user", () => {
    mockProps.booking.status = "rejected_by_artist";
    mockProps.booking.completed = false;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct buttons are shown
    expect(bookingFeedItem.getByText("New Enquiry")).toBeInTheDocument;

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();

    // test the buttons work
    // NewEnquiry so don't need to test the button works
});

test ("renders the correct buttons when cancelled_by_user and we are the artist", () => {
    mockProps.booking.status = "cancelled_by_user";
    mockProps.booking.completed = false;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // there are no actions for the artist to take

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
});

test ("renders the correct buttons when cancelled_by_user and we are the user", () => {
    mockProps.booking.status = "cancelled_by_user";
    mockProps.booking.completed = false;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // no actions for the user to take

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
});

test ("renders the correct buttons when pending_payment and we are the artist", () => {
    mockProps.booking.status = "pending_payment";
    mockProps.booking.completed = false;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // no actions for the artist to take

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
});

test ("renders the correct buttons when pending_payment and we are the user", () => {
    mockProps.booking.status = "pending_payment";
    mockProps.booking.completed = false;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // correct buttons are shown
    expect(bookingFeedItem.getByText("Pay")).toBeInTheDocument;
    expect(bookingFeedItem.getByText("Cancel")).toBeInTheDocument;

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();

    // test the buttons work
    // userPayBooking is called when the pay button is clicked
    expect(mockProps.userPay).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Pay"));
    expect(mockProps.userPay).toHaveBeenCalledTimes(1);

    // userCancelBooking is called when the cancel button is clicked
    expect(mockProps.userCancel).toHaveBeenCalledTimes(0);
    fireEvent.click(bookingFeedItem.getByText("Cancel"));
    expect(mockProps.userCancel).toHaveBeenCalledTimes(1);

});

test ("renders the correct buttons when paid and we are the artist", () => {
    mockProps.booking.status = "paid";
    mockProps.booking.completed = false;

    // we are the artist
    mockProps.userState.id = 3;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // no actions for the artist to take

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
});

test ("renders the correct buttons when paid and we are the user", () => {
    mockProps.booking.status = "paid";
    mockProps.booking.completed = false;

    // we are the user
    mockProps.userState.id = 2;
    mockProps.booking.user = 2;
    mockProps.booking.artist = 3;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // no user actions to take

    // incorrect buttons are not shown
    expect(bookingFeedItem.queryByText("Accept")).toBeNull();
    expect(bookingFeedItem.queryByText("Counter")).toBeNull();
    expect(bookingFeedItem.queryByText("Decline")).toBeNull();
    expect(bookingFeedItem.queryByText("New Enquiry")).toBeNull();
    expect(bookingFeedItem.queryByText("Pay")).toBeNull();
    expect(bookingFeedItem.queryByText("Cancel")).toBeNull();
});

test ("displays rating stars when allow ratings is true", () => {
    mockProps.booking.status = "paid";
    
    // allow ratings is true
    mockProps.booking.allowRatings = true;


    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // rating stars are displayed
    expect(bookingFeedItem.getAllByTestId("rating-stars")).toBeInTheDocument;
})

test ("does not display rating stars when allow ratings is false", () => {
    mockProps.booking.status = "paid";
    
    // allow ratings is false
    mockProps.booking.allowRatings = false;

    let bookingFeedItem = mockBookingFeedItem(mockProps);

    // rating stars are not displayed
    expect(bookingFeedItem.queryByTestId("rating-stars")).toBeNull;
})







