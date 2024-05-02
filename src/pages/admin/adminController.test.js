import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./admin";

const handleApproveUser = jest.fn();
const handleRejectUser = jest.fn();
const handleRemoveUserSearch = jest.fn();
const setBanUserSearchResults = jest.fn();
const handleBanUserInputChanged = jest.fn();
const handleBanUser = jest.fn();
const handleMakeAdminSearch = jest.fn();

const setMakeAdminSearchResult = jest.fn();
const handleMakeAdminInputChanged = jest.fn();
const handleMakeAdmin = jest.fn();
const handleDemoteAdmin = jest.fn();



let mockProps = {
    loading: false,

    unaprovedLinkpages: [],
    handleApproveUser: handleApproveUser,
    handleRejectUser: handleRejectUser,

    handleRemoveUserSearch: handleRemoveUserSearch,
    banUserSearchTerm: "",
    banUserSearchResult: undefined,
    setBanUserSearchResults: setBanUserSearchResults,
    handleBanUserInputChanged: handleBanUserInputChanged,
    handleBanUser: handleBanUser,

    handleMakeAdminSearch: handleMakeAdminSearch,
    makeAdminSearchTerm: "",
    makeAdminSearchResult: undefined,
    setMakeAdminSearchResult: setMakeAdminSearchResult,
    handleMakeAdminInputChanged: handleMakeAdminInputChanged,
    handleMakeAdmin: handleMakeAdmin,
    handleDemoteAdmin: handleDemoteAdmin,
}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        loading: false,
    
        unaprovedLinkpages: [],
        handleApproveUser: handleApproveUser,
        handleRejectUser: handleRejectUser,
    
        handleRemoveUserSearch: handleRemoveUserSearch,
        banUserSearchTerm: "",
        banUserSearchResult: undefined,
        setBanUserSearchResults: setBanUserSearchResults,
        handleBanUserInputChanged: handleBanUserInputChanged,
        handleBanUser: handleBanUser,
    
        handleMakeAdminSearch: handleMakeAdminSearch,
        makeAdminSearchTerm: "",
        makeAdminSearchResult: undefined,
        setMakeAdminSearchResult: setMakeAdminSearchResult,
        handleMakeAdminInputChanged: handleMakeAdminInputChanged,
        handleMakeAdmin: handleMakeAdmin,
        handleDemoteAdmin: handleDemoteAdmin,
    }
    
});

const mockAdmin = (props) => {
    return (render(
        <Router>
            <Admin {...props} />
        </Router>
    ));
}

test ("renders correctly without crashing", () => {
    let admin = mockAdmin(mockProps)

    expect(admin.queryByTestId("admin-view").toBeInTheDocument);

    // current users section is shown
    expect(admin.getByText("Current Users").toBeInTheDocument);
    expect(admin.getByText("Remove User").toBeInTheDocument);

    // account approval section is shown
    expect(admin.getByText("Account Aprroval").toBeInTheDocument);

    // make admin section is shown, title and button
    expect(admin.getAllByText("Make Admin").length).toBe(2);
})

test ("approval feed is empty when no unaproved linkpages", () => {
    mockProps.unaprovedLinkpages = []
    let admin = mockAdmin(mockProps)

    expect(admin.queryAllByTestId("unaproval-feed-item").length).toBe(0);

})

test ("approval feed is not empty when unaproved linkpages contains linkpages", () => {
    mockProps.unaprovedLinkpages = [
        {
            id: 1,
            user: {
                id: 1,
                username: "e7",
                email: "fdsa@fdas.com",
                is_artist: true,
                is_approved: true,
                is_active: true,
                artist_type: "music artist",
                is_linkpage_visible: true
            },
            header: "sdfafkldjsafs",
            description: "dfsafdsnuadfhdusafdsa",
            is_dark_mode: true,
            pageImage: "/userImages/d203b519f016564384a11baf58caebe6_uYqWko8.png",
            links: [],
            average_rating: 0
        },
        {
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
    
    ];
    let admin = mockAdmin(mockProps)

    expect(admin.queryAllByTestId("unaproval-feed-item").length).toBe(2);

    // aproval and deny buttons should be visible
    expect(admin.queryAllByText("Approve").length).toBe(2);
    expect(admin.queryAllByText("Deny").length).toBe(2);

})

test ("no search result is shown when banUserSearchResult is undefined", () => {
    mockProps.banUserSearchResult = undefined;
    let admin = mockAdmin(mockProps)

    expect(admin.queryByTestId("ban-user-search-result")).toBeNull();
})

test ("search result is shown when banUserSearchResult is defined", () => {
    mockProps.banUserSearchResult = {
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
    let admin = mockAdmin(mockProps)
    
    expect(admin.queryByTestId("ban-user-search-result").toBeInTheDocument);

    // ban button should be visible
    expect(admin.queryByText("Remove").toBeInTheDocument);
    expect(admin.queryByText("Unaprove").toBeInTheDocument);
    
})

test ("no search result is shown when makeAdminSearchResult is undefined", () => {
    mockProps.makeAdminSearchResult = undefined;
    let admin = mockAdmin(mockProps)

    expect(admin.queryByTestId("make-admin-search-result")).toBeNull();
})

test ("search result is shown when makeAdminSearchResult is defined", () => {
    mockProps.makeAdminSearchResult =  {
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
    let admin = mockAdmin(mockProps)

    expect(admin.queryByTestId("make-admin-search-result").toBeInTheDocument);

    // make admin button should be visible
    expect(admin.queryAllByText("Make Admin").length).toBe(3);
    expect(admin.queryByText("Demote Admin").toBeInTheDocument);

})


