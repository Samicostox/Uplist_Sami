import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./link";
import style from './link.module.css';

let mockProps = {
    state: undefined,
    socialMediaIconLinks: [],
    links: [],
    spotifyLinks: [],
    youtubeLinks: [],
    soundcloudLinks: [],
    skiddleLinks: [],
    emailList: [],
    bookingModule: [],
    editable: true,
    pageLoading: false,
}


//mock sucecss callback
const successCallback = jest.fn();

//mock error callback
const errorCallback = jest.fn();
const mockLink = (props) => {

    return render (
        <Router>
            <Profile
                state={props.state}
                socialMediaIconLinks={props.socialMediaIconLinks}
                links={props.links}
                spotifyLinks={props.spotifyLinks}
                youtubeLinks={props.youtubeLinks}
                soundcloudLinks={props.soundcloudLinks}
                skiddleLinks={props.skiddleLinks}
                emailList={props.emailList}
                bookingModule={props.bookingModule}

                editable={props.editable}
                pageLoading={props.pageLoading}

                successCallback={successCallback}
                errorCallback={errorCallback}
                />
        </Router>
    )   
}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        state: undefined,
        socialMediaIconLinks: [],
        links: [],
        spotifyLinks: [],
        youtubeLinks: [],
        soundcloudLinks: [],
        skiddleLinks: [],
        emailList: [],
        bookingModule: [],
        editable: true,
        pageLoading: false,
    }

});


test("content sections not shown during loading", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.pageLoading = true;
    mockProps.state = mockState;
    let account = mockLink(mockProps);


    // user content
    expect(account.queryByText("Music Artist")).toBeNull()
    expect(account.queryByText("testUsername")).toBeNull()
    expect(account.queryByText("testSubHeading")).toBeNull()
    expect(account.queryByText("testHeader")).toBeNull()

    // static content
    expect(account.queryByText("CONTACT ME")).toBeNull()

} );

test("content sections are shown after loading", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.isLoading = false;
    mockProps.state = mockState;
    let account = mockLink(mockProps);


    // user content
    expect(account.getByText("music artist").toBeInTheDocument)
    expect(account.getByText("testSubHeading").toBeInTheDocument)
    expect(account.getByText("testHeader").toBeInTheDocument)

    // static content
    expect(account.getByText("Contact Me").toBeInTheDocument)

} );

test("social media links are shown", () => {
    // check for image block with correct image src 
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.socialMediaIconLinks = [
        {
            id: 1,
            type: "link",
            content: "website",
            url: "www.instagram.com",
            embed_id: undefined,
            index: 0,
            isArtist: false,
        },
        {
            id: 2,
            type: "link",
            content: "website",
            url: "www.facebook.com",
            embed_id: undefined,
            index: 1,
            isArtist: false,
    
        },
    ]
    let account = mockLink(mockProps);

    expect(account.getAllByTestId("social-media-icon").length).toBe(2);

} );

test("social media links are not shown if no links", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.socialMediaIconLinks = [];
    let account = mockLink(mockProps);
    expect(account.queryAllByTestId("social-media-icon").length).toBe(0);

} );

test("links are shown when present", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.links = [
        {
            id: 1,
            type: "link",
            content: "website",
            url: "www.testsite.com",
            embed_id: undefined,
            index: 0,
            isArtist: false,
        },
        {
            id: 2,
            type: "link",
            content: "website2",
            url: "www.testSite2.com",
            embed_id: undefined,
            index: 1,
            isArtist: false,
    
        },
    ]
    let account = mockLink(mockProps);

    expect(account.getAllByTestId("link-item").length).toBe(2);

    // show the link title
    expect(account.getByText("website")).toBeInTheDocument();
    expect(account.getByText("website2")).toBeInTheDocument();

} );

test("links are not shown if no links", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.links = [];
    let account = mockLink(mockProps);
    expect(account.queryAllByTestId("link-item").length).toBe(0);

} );


test("spotify links are shown when present", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.spotifyLinks = [
        {
            id: 1,
            type: "spotify",
            content: "",
            embed_id: "7yNK27ZTpHew0c55VvIJgm",
            url: "https://open.spotify.com/track/7yNK27ZTpHew0c55VvIJgm?si=707a7b636e624f95",
            index: 0,
            isArtist: false,
        },
        {
            id: 2,
            type: "spotify",
            content: "",
            embed_id: "0altSosdDXHwzu7qbt0xms",
            url: "https://open.spotify.com/track/0altSosdDXHwzu7qbt0xms?si=2c3621b3982d4264",
            index: 1,
            isArtist: false,
    
        },
    ]
    let account = mockLink(mockProps);

    expect(account.getAllByTestId("spotify-link").length).toBe(2);


} );


test("spotify links are not shown if no links", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.spotifyLinks = []
    let account = mockLink(mockProps);

    expect(account.queryAllByTestId("spotify-link").length).toBe(0);

} );

test("soundcloud links are shown when present", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.soundcloudLinks = [
        {
            id: 1,
            type: "soundcloud",
            content: "soundcloud",
            embed_id: "kanyewest/ghost-town",
            url: "https://soundcloud.com/kanyewest/ghost-town",
            index: 0,
            isArtist: false,
        },
        {
            id: 2,
            type: "soundcloud",
            content: "soundcloud",
            embed_id: "iamrylo/sets",
            url: "https://soundcloud.com/iamrylo/sets/mixes?si=04b69f45ecd340e68d929693c9b22995&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
            index: 1,
            isArtist: false,
    
        },
    ]
    let account = mockLink(mockProps);

    expect(account.getAllByTestId("soundcloud-link").length).toBe(2);


} );




test("soundcloud links are not shown if no links", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.soundcloudLinks = []
    let account = mockLink(mockProps);

    expect(account.queryAllByTestId("soundcloud-link").length).toBe(0);


} );

test("youtube links are shown when present", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.youtubeLinks = [
        {
            id: 1,
            type: "youtube",
            content: "geo",
            embed_id: "JAjtdGEgdOQ",
            url: "https://www.youtube.com/watch?v=JAjtdGEgdOQ",
            index: 0,
            isArtist: false,
        },
        {
            id: 2,
            type: "youtube",
            content: "max",
            embed_id: "N64LarhB7R0",
            url: "https://www.youtube.com/watch?v=N64LarhB7R0",
            index: 1,
            isArtist: false,
    
        },
    ]
    let account = mockLink(mockProps);

    expect(account.getAllByTestId("youtube-link").length).toBe(2);

    // check for video titles
    expect(account.getByText("geo")).toBeInTheDocument();
    expect(account.getByText("max")).toBeInTheDocument();


} );

test("youtube links are not shown if no links", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.youtubeLinks = []
    let account = mockLink(mockProps);

    expect(account.queryAllByTestId("youtube-link").length).toBe(0);


} );


// TODO skiddle events tests

test("email module displays email list subscription form", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.emailList = [ // display mock list with limited data
        {
            "lists": [
                {
                    "id": "aa4a766c85",
                    "name": "Test List",
                    "contact": {}
                }
            ],
        }
    ]
    let account = mockLink(mockProps);

    // mailing list form should be displayed
    expect(account.getByText("Subscribe to their mailing list!")).toBeInTheDocument();
    expect(account.getByText("Subscribe")).toBeInTheDocument();


} );

test("does not displays email list subscription form when email module not present", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.emailList = []

    let account = mockLink(mockProps);


    // mailing list form should not be displayed
    expect(account.queryByText("Subscribe to their mailing list!")).not.toBeInTheDocument();
    expect(account.queryByText("Subscribe")).not.toBeInTheDocument();

} );


test("displays booking module when stripe connection is presnt, and active, isArtist = true, isApproved = true and is_active = true ", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.bookingModule = [{
            "id": 27,
            "user": 23,
            "is_active": true,
            "account_id": "testId",
            "service_info": "this is some test info about the service"
    }]

    let account = mockLink(mockProps);

    // booking module should be displayed
    expect(account.getByText("Bookings")).toBeInTheDocument();
    expect(account.getByTestId("booking-item")).toBeInTheDocument();

} );


test("does not display booking module when stripe connection is not presnt", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.bookingModule = []

    let account = mockLink(mockProps);

    // booking module should not be displayed
    expect(account.queryByText("Bookings")).not.toBeInTheDocument();
    expect(account.queryByTestId("booking-item")).not.toBeInTheDocument();


} );

test("does not display booking module when stripe connection is presnt, but is not active, isArtist = true, isApproved = true and is_active = true ", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.bookingModule = [{
            "id": 27,
            "user": 23,
            "is_active": false,
            "account_id": "testId",
            "service_info": "this is some test info about the service"
    }]

    let account = mockLink(mockProps);

    // booking module should not be displayed
    expect(account.queryByText("Bookings")).not.toBeInTheDocument();
    expect(account.queryByTestId("booking-item")).not.toBeInTheDocument();


} );



test("does not display booking module when stripe connection is presnt, is active, isArtist = false, isApproved = true and is_active = true ", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: false,
        isApproved: true,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.bookingModule = [{
            "id": 27,
            "user": 23,
            "is_active": true,
            "account_id": "testId",
            "service_info": "this is some test info about the service"
    }]

    let account = mockLink(mockProps);

    // booking module should not be displayed
    expect(account.queryByText("Bookings")).not.toBeInTheDocument();
    expect(account.queryByTestId("booking-item")).not.toBeInTheDocument();


} );

test("does not display booking module when stripe connection is presnt, is active, isArtist = true, isApproved = false and is_active = true ", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: false,
        is_active: true,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.bookingModule = [{
            "id": 27,
            "user": 23,
            "is_active": true,
            "account_id": "testId",
            "service_info": "this is some test info about the service"
    }]

    let account = mockLink(mockProps);

    // booking module should not be displayed
    expect(account.queryByText("Bookings")).not.toBeInTheDocument();
    expect(account.queryByTestId("booking-item")).not.toBeInTheDocument();


} );

test("does not display booking module when stripe connection is presnt, is active, isArtist = true, isApproved = true and is_active = false ", () => {
    let mockState = {
        artistType: "music artist",
        username: "testUsername",
        userId: "1",
        isArtist: true,
        isApproved: true,
        is_active: false,
        headerImage: "",
        subheading: "testSubHeading",
        header: "testHeader",
    }
    mockProps.state = mockState;
    mockProps.bookingModule = [{
            "id": 27,
            "user": 23,
            "is_active": true,
            "account_id": "testId",
            "service_info": "this is some test info about the service"
    }]

    let account = mockLink(mockProps);

    // booking module should not be displayed
    expect(account.queryByText("Bookings")).not.toBeInTheDocument();
    expect(account.queryByTestId("booking-item")).not.toBeInTheDocument();


} );