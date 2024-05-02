import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Bookings from "./bookings";

let mockProps = {
    successCallback: jest.fn(),
    errorCallback: jest.fn(),

    searchPage: undefined,

    userState: {
    },
    bookingsState: {
        outgoing: [],
        incoming: [],
        upcoming: [],
        history: []
    },
    loading : false,
    onAction : jest.fn(),

}

const mockBookings = (props) => {
    return ( 
        render (
            <Router >
                <Bookings {...props} />
            </Router>
        )
    )    
}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        successCallback: jest.fn(),
        errorCallback: jest.fn(),
    
        searchPage: undefined,
    
        userState: {
            id: 24,
            username: "e8",
            email: "sdfghjka@sdfkjah.cin",
            is_artist: true,
            is_approved: true,
            is_active: true,
            artist_type: "dj",
            is_linkpage_visible: true
        },
        bookingsState: {
            outgoing: [],
            incoming: [],
            upcoming: [],
            history: []
        },
        loading : false,
        onAction : jest.fn(),
    
    }
});

test ("renders without crashing", () => {

    let bookings = mockBookings(mockProps);
    expect(bookings).toBeTruthy();
    expect(bookings.getByText("My Bookings")).toBeTruthy();

});

test ("renders all tabs when the user is an artist", () => {
    mockProps.userState.is_artist = true;
    let bookings = mockBookings(mockProps);

    // theres two because one for mobile and one for desktop
    expect(bookings.queryAllByTestId("outgoing-tab").length).toBe(2);
    expect(bookings.queryAllByTestId("upcoming-tab").length).toBe(2);
    expect(bookings.queryAllByTestId("incoming-tab").length).toBe(2);
    expect(bookings.queryAllByTestId("history-tab").length).toBe(2);
});

test ("renders all tabs when the user is not an artist", () => {
    mockProps.userState.is_artist = false;
    let bookings = mockBookings(mockProps);

    // theres two because one for mobile and one for desktop
    expect(bookings.queryAllByTestId("outgoing-tab").length).toBe(2);
    expect(bookings.queryAllByTestId("upcoming-tab").length).toBe(2);
    expect(bookings.queryAllByTestId("incoming-tab").length).toBe(0);
    expect(bookings.queryAllByTestId("history-tab").length).toBe(2);
});

test ("opens on the outgoing page when the search page prop is outgoing", () => {
    mockProps.searchPage = "outgoing";
    let bookings = mockBookings(mockProps);
    waitFor(() => {
     expect(bookings.queryByText("You have no outgoing enquiries")).toBeTruthy();
    
    });
    
    expect(bookings.queryByText("You have no outgoing enquiries")).toBeTruthy();
});

test ("opens on the incoming page when the search page prop is incoming", () => {
    mockProps.searchPage = "incoming";
    let bookings = mockBookings(mockProps);
    waitFor(() => {
     expect(bookings.queryByText("You have no incoming enquiries")).toBeTruthy();
    
    });
    
    expect(bookings.queryByText("You have no incoming enquiries")).toBeTruthy();
});

test ("opens on the upcoming page when the search page prop is upcoming", () => {
    mockProps.searchPage = "upcoming";
    let bookings = mockBookings(mockProps);
    waitFor(() => {
     expect(bookings.queryByText("You have no upcoming bookings")).toBeTruthy();
    
    });
    
    expect(bookings.queryByText("You have no upcoming bookings")).toBeTruthy();
});

test ("opens on the history page when the search page prop is history", () => {
    mockProps.searchPage = "history";
    let bookings = mockBookings(mockProps);
    waitFor(() => {
     expect(bookings.queryByText("You have no previous bookings")).toBeTruthy();
    
    });
    
    expect(bookings.queryByText("You have no previous bookings")).toBeTruthy();
});

test ("defaults on the outgoing page when the search page prop is invalid", () => {
    mockProps.searchPage = "invalid";
    let bookings = mockBookings(mockProps);
    waitFor(() => {
     expect(bookings.queryByText("You have no outgoing enquiries")).toBeTruthy();
    
    });
    
    expect(bookings.queryByText("You have no outgoing enquiries")).toBeTruthy();
});

test ("display the correct number of bookings in the outgoing tab", () => {
    mockProps.userState.is_artist = true;
    mockProps.bookingsState.outgoing = [ // fake objects with limited data for simplicity
        {
            id: 1,
            artist_id: 1,
            artist_username: "first",
            artist_email: "test@gmail.com",
            artist_is_artist: true,
        },
        {
            id: 2,
            artist_id: 2,
            artist_username: "second",
            artist_email: "second@gmail.com"
        }
    ]
    mockProps.searchPage = "outgoing";
    let bookings = mockBookings(mockProps);

    waitFor(() => {
        expect(bookings.queryAllByTestId("booking-card").length).toBe(2);
    });
    expect (bookings.queryAllByTestId("booking-card").length).toBe(2);
});

test ("display the correct number of bookings in the incoming tab", () => {
    mockProps.userState.is_artist = true;
    mockProps.bookingsState.incoming = [  // fake objects with limited data for simplicity
        {
            id: 1,
            artist_id: 1,
            artist_username: "first",
            artist_email: "test@gmail.com",
            artist_is_artist: true,
        },
        {
            id: 2,
            artist_id: 2,
            artist_username: "second",
            artist_email: "second@gmail.com"
        }
    ]
    mockProps.searchPage = "incoming";
    let bookings = mockBookings(mockProps);

    waitFor(() => {
        expect(bookings.queryAllByTestId("booking-card").length).toBe(2);
    });
    expect (bookings.queryAllByTestId("booking-card").length).toBe(2);
});

test ("display the correct number of bookings in the upcoming tab", () => {
    mockProps.userState.is_artist = true;
    mockProps.bookingsState.upcoming = [ // fake objects with limited data for simplicity
        {
            id: 1,
            artist_id: 1,
            artist_username: "first",
            artist_email: "test@gmail.com",
            artist_is_artist: true,
        },
        {
            id: 2,
            artist_id: 2,
            artist_username: "second",
            artist_email: "second@gmail.com"
        }
    ]
    mockProps.searchPage = "upcoming";
    let bookings = mockBookings(mockProps);

    waitFor(() => {
        expect(bookings.queryAllByTestId("booking-card").length).toBe(2);
    });
    expect (bookings.queryAllByTestId("booking-card").length).toBe(2);
});

test ("display the correct number of bookings in the history tab", () => {
    mockProps.userState.is_artist = true;
    mockProps.bookingsState.history = [ // fake objects with limited data for simplicity
        {
            id: 1,
            artist_id: 1,
            artist_username: "first",
            artist_email: "test@gmail.com",
            artist_is_artist: true,
        },
        {
            id: 2,
            artist_id: 2,
            artist_username: "second",
            artist_email: "second@gmail.com"
        }
    ]

    mockProps.searchPage = "history";
    let bookings = mockBookings(mockProps);

    waitFor(() => {
        expect(bookings.queryAllByTestId("booking-card").length).toBe(2);
    });

    expect (bookings.queryAllByTestId("booking-card").length).toBe(2);
});