import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Edit from "./edit";





// mock successCallback
const successCallback = jest.fn(); 
const errorCallback = jest.fn();
const onDeleted = jest.fn();
const onAdded = jest.fn();
const handleSave = jest.fn();
const onAddCallback = jest.fn();
const onGetImageFileUploadCallback = jest.fn();

let mockForm = {
    headerImage: "",
    linkpageId: 1,
    heading: "test heading",
    subheading: "test subheading",
    username: "test_username",
    userId: 1,
}


let mockProps = {
        form: mockForm,
        handleFormChange: jest.fn(),
        links: [],
        editLink: -1,
        setEditLink: jest.fn(),
        onDeleted: onDeleted,
        onAdded: onAdded,
        onAddCallback: onAddCallback,
        
        handleSave: handleSave,
        saveState: "changed",

        emailLists : [],
        bookingModule: [],

        onGetImageFileUploadCallback: onGetImageFileUploadCallback,

        theme: "light",
        setTheme: jest.fn(),

        loading: false,

}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        form: mockForm,
        handleFormChange: jest.fn(),
        links: [],
        editLink: -1,
        setEditLink: jest.fn(),
        onDeleted: onDeleted,
        onAdded: onAdded,
        onAddCallback: onAddCallback,
        
        handleSave: handleSave,
        saveState: "changed",

        emailLists : [],
        bookingModule: [],

        onGetImageFileUploadCallback:onGetImageFileUploadCallback,

        theme: "light",
        setTheme: jest.fn(),

        loading: false,

    }
});

const mockEdit = (props) => {
    return (
        render(
        <Router>
            <Edit {...props} />
        </Router>
    ));
}

test("content is not shown during loading", () => {
    mockProps.loading = true;

    let edit = mockEdit(mockProps);
    // header 
    expect(edit.queryByText("Header:")).toBeNull();
    expect(edit.queryByText("test heading")).toBeNull();

    // subheader
    expect(edit.queryByText("Bio:")).toBeNull();
    expect(edit.queryByText("test subheading")).toBeNull();
    
    // add content button
    expect(edit.queryByText("Add Content")).toBeNull();

});

test("content is shown after loading", () => {
    mockProps.loading = false;
    mockProps.saveState = "no_changes"
    let edit = mockEdit(mockProps);
    // header 
    expect(edit.queryByText("Header:").toBeInTheDocument);
    expect(edit.queryByText("test heading").toBeInTheDocument);

    // subheader
    expect(edit.queryByText("Bio:").toBeInTheDocument);
    expect(edit.queryByText("test subheading").toBeInTheDocument);
    
    // add content button
    expect(edit.queryByText("Add Content").toBeInTheDocument);

});

test("add module form opens when add content button is pressed", () => {
    mockProps.loading = false;
    mockProps.saveState = "no_changes"
    let edit = mockEdit(mockProps);
    // add content button
    expect(edit.queryByText("Add Content").toBeInTheDocument);

    // add content form is not shown
    expect(edit.queryByTestId("add-module")).toBeNull();

    // press add content button
    fireEvent.click(edit.getByText("Add Content"));
    // wait for add-module to be shown
    waitFor(() => expect(edit.queryByTestId("add-module")).toBeInTheDocument);

});


test("add image form opens when image button is pressed", () => {
    mockProps.loading = false;
    let edit = mockEdit(mockProps);
    // find image button
    let editImageButton = edit.getByTestId("edit-image-button");

    expect(editImageButton.toBeInTheDocument);

    // add content form is not shown
    expect(edit.queryByTestId("get-image")).toBeNull();

    // press add content button
    fireEvent.click(editImageButton);
    // wait for add-module to be shown
    waitFor(() => expect(edit.queryByTestId("get-image")).toBeInTheDocument);

});

test("links are not shown when empty", () => {
    mockProps.loading = false;
    mockProps.links = [];
    let edit = mockEdit(mockProps);

    // links are not shown
    expect(edit.queryByText("Custom Links")).toBeNull();
    expect(edit.queryByText("Spotify Links")).toBeNull();
    expect(edit.queryByText("Soundcloud Links")).toBeNull();
    expect(edit.queryByText("Youtube Links")).toBeNull();
    // TODO add skiddle links 
    expect(edit.queryAllByTestId("edit-link").length).toBe(0);

});


test("links are shown when not empty", () => {
    mockProps.loading = false;
    mockProps.links = [

        {
            id: 1,
            type: "link",
            content: "website",
            url: "www.instagram.com",
            embed_id: undefined,
            index: 0,
            isArtist: false,
        },

        { // soundcloud
            id: 2,
            type: "soundcloud",
            content: "soundcloud",
            embed_id: "kanyewest/ghost-town",
            url: "https://soundcloud.com/kanyewest/ghost-town",
            index: 1,
            isArtist: false,
        },
        {
            id: 3,
            type: "spotify",
            content: "",
            embed_id: "7yNK27ZTpHew0c55VvIJgm",
            url: "https://open.spotify.com/track/7yNK27ZTpHew0c55VvIJgm?si=707a7b636e624f95",
            index: 2,
            isArtist: false,
        },
        {
            id: 4,
            type: "youtube",
            content: "geo",
            embed_id: "JAjtdGEgdOQ",
            url: "https://www.youtube.com/watch?v=JAjtdGEgdOQ",
            index: 3,
            isArtist: false,
        },
    ];
    let edit = mockEdit(mockProps);

    // links are shown
    expect(edit.queryByText("Custom Links").toBeInTheDocument);
    expect(edit.queryByText("Spotify Links").toBeInTheDocument);
    expect(edit.queryByText("Soundcloud Links").toBeInTheDocument);
    expect(edit.queryByText("Youtube Links").toBeInTheDocument);

    // TODO add skiddle links

    // links are shown
    expect(edit.queryAllByTestId("edit-link").length).toBe(4);

    
});

test("when link is clicked the edit link property is called", () => {
    mockProps.loading = false;
    mockProps.links = [

        {
            id: 1,
            type: "link",
            content: "website",
            url: "www.instagram.com",
            embed_id: undefined,
            index: 0,
            isArtist: false,
        },

        
    ];
    let edit = mockEdit(mockProps);

    // links are shown
    expect(edit.queryAllByTestId("edit-link").length).toBe(1);
    // get link element
    let link = edit.queryAllByTestId("edit-link")[0];


    // click the link
    fireEvent.click(link);

    // check editLink is called with correct id
    expect(mockProps.setEditLink).toBeCalledWith(1);
    
});

test("the edit link form is displayed when editLink is set", () => {
    mockProps.links = [

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
            type: "spotify",
            content: "",
            embed_id: "7yNK27ZTpHew0c55VvIJgm",
            url: "https://open.spotify.com/track/7yNK27ZTpHew0c55VvIJgm?si=707a7b636e624f95",
            index: 1,
            isArtist: false,
        },

        
    ];
    mockProps.editLink = 1;
    mockProps.loading = false;
    let edit = mockEdit(mockProps);

    // edit link form is shown
    expect(edit.queryByTestId("edit-module")).toBeInTheDocument;
    expect(edit.queryAllByTestId("edit-module").length).toBe(1);



});

test("the edit link form is not displayed when editLink is not set", () => {
    mockProps.links = [

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
            type: "spotify",
            content: "",
            embed_id: "7yNK27ZTpHew0c55VvIJgm",
            url: "https://open.spotify.com/track/7yNK27ZTpHew0c55VvIJgm?si=707a7b636e624f95",
            index: 1,
            isArtist: false,
        },

        
    ];
    mockProps.editLink = -1;
    mockProps.loading = false;
    let edit = mockEdit(mockProps);

    // edit link form is shown
    expect(edit.queryByTestId("edit-module")).toBeNull;
    expect(edit.queryAllByTestId("edit-module").length).toBe(0);

});


test(" booking form is not shown when empty", () => {
    mockProps.loading = false;
    mockProps.bookingModule = [];
    let edit = mockEdit(mockProps);

    // booking form is not shown
    expect(edit.queryByText("Booking Feature")).toBeNull();
    expect(edit.queryByText("Manage Booking feature")).toBeNull();
});

test(" booking form is shown when not empty", () => {
 
    mockProps.loading = false;
    mockProps.bookingModule = [{
        "id": 27,
        "user": 23,
        "is_active": true,
        "account_id": "testId",
        "service_info": "this is some test info about the service"
    }];
    let edit = mockEdit(mockProps);

    // booking form is shown
    expect(edit.queryByText("Booking Feature").toBeInTheDocument);
    expect(edit.queryByText("Manage Booking feature").toBeInTheDocument);
});

test ("booking feature is not when loading", () => {
    mockProps.loading = true;
    mockProps.bookingModule = [{
        "id": 27,
        "user": 23,
        "is_active": true,
        "account_id": "testId",
        "service_info": "this is some test info about the service"
    }];
    let edit = mockEdit(mockProps);

    // booking feature is not shown
    expect(edit.queryByText("Booking Feature")).toBeNull();
    expect(edit.queryByText("Manage Booking feature")).toBeNull();
});

test("booking form is displayed when booking feature is clicked", () => {
    mockProps.loading = false;
    mockProps.bookingModule = [{
        "id": 27,
        "user": 23,
        "is_active": true,
        "account_id": "testId",
        "service_info": "this is some test info about the service"
    }];
    let edit = mockEdit(mockProps);

    // booking form is shown
    expect(edit.queryByText("Booking Feature").toBeInTheDocument);
    expect(edit.queryByText("Manage Booking feature").toBeInTheDocument);

    // click booking feature
    fireEvent.click(edit.queryByText("Manage Booking feature"));

    // booking form is shown
    expect(edit.queryByText("Allow users to book your services!").toBeInTheDocument);

});

test("booking form is not displayed when booking feature is not clicked", () => {
    mockProps.loading = false;
    mockProps.bookingModule = [{
        "id": 27,
        "user": 23,
        "is_active": true,
        "account_id": "testId",
        "service_info": "this is some test info about the service"
    }];
    let edit = mockEdit(mockProps);


    // booking form is not shown
    expect(edit.queryByText("Allow users to book your services!")).toBeNull();

});


test ("email feature is not shown when loading", () => {
    mockProps.loading = true;
    mockProps.emailLists = [ // display mock list with limited data
        {
            "lists": [
                {
                    "id": "aa4a766c85",
                    "name": "Test List",
                    "contact": {}
                }
            ],
        }
    ];
    let edit = mockEdit(mockProps);

    // email feature is not shown
    expect(edit.queryByText("Mailing List")).toBeNull();
    expect(edit.queryByText("Email Subscription Lists")).toBeNull();
});

test("email feature is not shown when empty", () => {
    mockProps.loading = false;
    mockProps.emailLists = [];
    let edit = mockEdit(mockProps);

    // email feature is not shown
    expect(edit.queryByText("Mailing List")).toBeNull();
    expect(edit.queryByText("Email Subscription Lists")).toBeNull();
});

test("email feature is shown when present", () => {
    mockProps.loading = false;
    mockProps.emailLists = [ // display mock list with limited data
        {
            "lists": [
                {
                    "id": "aa4a766c85",
                    "name": "Test List",
                    "contact": {}
                }
            ],
        }
    ];
    let edit = mockEdit(mockProps);

    // email feature is shown
    expect(edit.queryByText("Mailing List")).toBeInTheDocument();
    expect(edit.queryByText("Email Subscription Lists")).toBeInTheDocument();
})

test("email form is displayed when email feature is clicked", () => {
    mockProps.loading = false;
    mockProps.emailLists = [ // display mock list with limited data
        {
            "lists": [
                {
                    "id": "aa4a766c85",
                    "name": "Test List",
                    "contact": {}
                }
            ],
        }
    ];
    let edit = mockEdit(mockProps);

    // email feature is shown
    expect(edit.queryByText("Mailing List")).toBeInTheDocument();
    expect(edit.queryByText("Email Subscription Lists")).toBeInTheDocument();

    // click email feature
    fireEvent.click(edit.queryByText("Email Subscription Lists"));

    // email form is shown
    expect(edit.queryByTestId("update-email-list-form")).toBeInTheDocument();

});

test("email form is not displayed when email feature is not clicked", () => {
    mockProps.loading = false;
    mockProps.emailLists = [ // display mock list with limited data
        {
            "lists": [
                {
                    "id": "aa4a766c85",
                    "name": "Test List",
                    "contact": {}
                }
            ],
        }
    ];
    let edit = mockEdit(mockProps);

    // email form is not shown
    expect(edit.queryByTestId("update-email-list-form")).toBeNull();

});
