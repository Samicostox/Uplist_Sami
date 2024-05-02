import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import BiolinkFeedItem from "./biolinkFeedItem";






let mockProps = {
    linkpage: {
        id: 2,
        user: {
            id: 2,
            username: "test",
            email: "test@fdas.com",
            is_artist: true,
            is_approved: true,
            is_active: true,
            artist_type: "music artist",
            is_linkpage_visible: true
        },
        header: "test header",
        description: "test description",
        is_dark_mode: true,
        pageImage: "/userImages/d203b519f016564384a11baf58caebe6_uYqWko8.png",
        links: [],
        average_rating: 0
    }
}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        linkpage: {
            id: 2,
            user: {
                id: 2,
                username: "test",
                email: "test@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            },
            header: "test header",
            description: "test description",
            is_dark_mode: true,
            pageImage: "/userImages/d203b519f016564384a11baf58caebe6_uYqWko8.png",
            links: [],
            average_rating: 0
        }
    }
    
});

const mockBiolinkFeedItem = (props) => {
    return (render(
        <Router>
            <BiolinkFeedItem {...props} />
        </Router>
    ));
}

test ("biolinkFeedItem renders without crashing", () => {
    let biolinkFeedItem = mockBiolinkFeedItem(mockProps);

    expect(biolinkFeedItem.queryByTestId("biolink-feed-item").toBeInTheDocument);

})

test ("biolinkFeedItem renders with correct content", () => {
    mockProps.linkpage = {
        id: 2,
        user: {
            id: 2,
            username: "test",
            email: "test@fdas.com",
            is_artist: true,
            is_approved: true,
            is_active: true,
            artist_type: "music artist",
            is_linkpage_visible: true
        },
        header: "test header",
        description: "test description",
        is_dark_mode: true,
        profilePicture: "/userImages/d203b519f016564384a11baf58caebe6_uYqWko8.png",
        links: [],
        average_rating: 0
    }

    
    let biolinkFeedItem = mockBiolinkFeedItem(mockProps);

    // expect username to be visible
    expect(biolinkFeedItem.queryByText("test").toBeInTheDocument);

    // expect dedscription to be visible
    expect(biolinkFeedItem.queryByText("test description").toBeInTheDocument);

    // expect tags to be visible
    expect(biolinkFeedItem.queryByText("music artist").toBeInTheDocument);

    // expect image to be shown
    expect(biolinkFeedItem.queryByTestId("biolink-feed-item-image").toBeInTheDocument);

    // expect rating label to be shown
    expect(biolinkFeedItem.queryByText("rating:").toBeInTheDocument);

})

test ("biolinkFeedItem renders with correct content when no image", () => {
    mockProps.linkpage = {
        id: 2,
        user: {
            id: 2,
            username: "test",
            email: "test@fdas.com",
            is_artist: true,
            is_approved: true,
            is_active: true,
            artist_type: "music artist",
            is_linkpage_visible: true
        },
        header: "test header",
        description: "test description",
        is_dark_mode: true,
        pageImage: undefined,
        links: [],
        average_rating: 0
    }

    let biolinkFeedItem = mockBiolinkFeedItem(mockProps);


    expect(biolinkFeedItem.queryByTestId("biolink-feed-item-image")).toBeNull();
    expect(biolinkFeedItem.queryByTestId("biolink-feed-item-temp-image").toBeInTheDocument);

})

test ("biolink feed item displays ratings message when ratings are 0", () => {
    
    mockProps.linkpage = {
        id: 2,
        user: {
            id: 2,
            username: "test",
            email: "test@fdas.com",
            is_artist: true,
            is_approved: true,
            is_active: true,
            artist_type: "music artist",
            is_linkpage_visible: true
        },
        header: "test header",
        description: "test description",
        is_dark_mode: true,
        pageImage: undefined,
        links: [],
        average_rating: 0
    }

    let biolinkFeedItem = mockBiolinkFeedItem(mockProps);
    expect(biolinkFeedItem.queryByText("rating:").toBeInTheDocument);
    expect(biolinkFeedItem.queryByText("no available ratings").toBeInTheDocument);
    expect(biolinkFeedItem.queryByTestId("rating-stars")).toBeNull();
})

test ("biolink feed item displays rating stars when rating is not 0 or undefined", () => {
    mockProps.linkpage = {
        id: 2,
        user: {
            id: 2,
            username: "test",
            email: "test@fdas.com",
            is_artist: true,
            is_approved: true,
            is_active: true,
            artist_type: "music artist",
            is_linkpage_visible: true
        },
        header: "test header",
        description: "test description",
        is_dark_mode: true,
        pageImage: undefined,
        links: [],
        average_rating: 2
    }

    let biolinkFeedItem = mockBiolinkFeedItem(mockProps);

    expect(biolinkFeedItem.queryByText("rating:").toBeInTheDocument);
    expect(biolinkFeedItem.queryByText("no available ratings")).toBeNull();
    expect(biolinkFeedItem.queryAllByTestId("rating-stars").toBeInTheDocument);
})
