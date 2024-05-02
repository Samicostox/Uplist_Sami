import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Marketplace from "./marketplace";


let mockState = {
    linkpages: [],
    filteredLinkpages: [],
}

let mockProps = {
    loading: false,
    handleSearch : jest.fn(),
    state: mockState,
    handleMultiSelectChange: jest.fn(),
}

let mockMarketplace = (props) => {
    return (
        render(
            <Router>
                <Marketplace {...props} />
            </Router>
        )
    )
}

afterEach(() => {
    jest.clearAllMocks();
    mockState = {
        linkpages: [],
        filteredLinkpages: [],
    }
    mockProps = {
        loading: false,
        handleSearch : jest.fn(),
        state: mockState,
        handleMultiSelectChange: jest.fn(),
    }
}
)

test ("Marketplace renders without crashing", () => {
    let marketplace = mockMarketplace(mockProps)
    expect(marketplace).toBeTruthy()

});

test ("renders correct content whilst loading ", () => {
    mockProps.loading = true
    // add feed items 
    mockProps.state.linkpages = [
        {
            id: 2,
            user: {
                id: 2,
                username: "test2",
                email: "test2@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            },
            header: "test header2",
            description: "test description2",
            is_dark_mode: true,
            pageImage: "/userImages/d20364384a11baf58caebe6_uYqWko8.png",
            links: [],
            average_rating: 0
        },
        {
            id: 1,
            user: {
                id: 1,
                username: "test1",
                email: "test1@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            },
            header: "test header1",
            description: "test description1",
            is_dark_mode: true,
            pageImage: "/userImages/d203b519f016564384a11baf58caebe6_uYqWko8.png",
            links: [],
            average_rating: 0
        }
    ]   
    mockProps.state.filteredLinkpages = mockProps.state.linkpages


    let marketplace = mockMarketplace(mockProps)
    expect (marketplace.getByTestId("marketplace-search-form").toBeInTheDocument)
    expect (marketplace.getByText("Filter by artist type...").toBeInTheDocument)
    expect (marketplace.queryAllByTestId("biolink-feed-item").length).toBe(0)
});

test ("renders correct content when not loading ", () => {
    mockProps.loading = false
    // add feed items 
    mockProps.state.linkpages = [
        {
            id: 2,
            user: {
                id: 2,
                username: "test2",
                email: "test2@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            },
            header: "test header2",
            description: "test description2",
            is_dark_mode: true,
            pageImage: "/userImages/d20364384a11baf58caebe6_uYqWko8.png",
            links: [],
            average_rating: 0
        },
        {
            id: 1,
            user: {
                id: 1,
                username: "test1",
                email: "test1@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            },
            header: "test header1",
            description: "test description1",
            is_dark_mode: true,
            pageImage: "/userImages/d203b519f016564384a11baf58caebe6_uYqWko8.png",
            links: [],
            average_rating: 0
        }
    ]

    mockProps.state.filteredLinkpages = mockProps.state.linkpages

    let marketplace = mockMarketplace(mockProps)
    expect (marketplace.getByTestId("marketplace-search-form").toBeInTheDocument)
    expect (marketplace.getByText("Filter by artist type...").toBeInTheDocument)
    expect (marketplace.queryAllByTestId("biolink-feed-item").length).toBe(2)

});