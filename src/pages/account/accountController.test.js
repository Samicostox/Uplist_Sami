import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./account";
import style from './account.module.css';

let mockProps = {
    username: undefined,
    userId: undefined,
    email: undefined,
    accountType: undefined,
    tag: undefined,
    biolinkVisible: undefined,
    status: undefined,
    isReviewed: undefined,
    isLoading: undefined,
}

// mock delete account
const deleteAccount = jest.fn();

// mock save account
const saveAccountInfo = jest.fn();

// mock save state
const saveState = jest.fn();

// mock update form input
const updateFormInput = jest.fn();

// mock error callback
const errorCallback = jest.fn();

// mock success callback
const successCallback = jest.fn();

const mockAccount = ({username = "", 
            userId = "", 
            email = "", 
            accountType = "business",
            tag = "dj", 
            biolinkVisible = false,
            status = "approved",
            isReviewed = true,
            isLoading = false}
) => {
    const formInput = {
        username: username,
        userId: userId,
        email: email,
        accountType: accountType,
        tag: tag,
        biolinkVisible: biolinkVisible,
        status: status,
        isReviewed: isReviewed,
    }




    return render (
        
        <Router>
                <Account  
                    form={formInput}    
                    onDeleteAccount = {deleteAccount} 
                    onSaveAccount = {saveAccountInfo} 
                    saveState = {saveState}
                    updateFormInput = {updateFormInput}
                    // setSaveState = {setSaveState}
                    isLoading = {isLoading}
                    errorCallback ={errorCallback}
                    successCallback = {successCallback}
            />
        </Router>
    );
}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        username: undefined,
        userId: undefined,
        email: undefined,
        accountType: undefined,
        tag: undefined,
        biolinkVisible: undefined,
        status: undefined,
        isReviewed: undefined,
        isLoading: undefined,
    }

});

test("form sections not shown during loading", () => {
    mockProps.isLoading = true;
    let account = mockAccount(mockProps);


    // headers
    expect(account.queryByText("My Account")).toBeNull()

    expect(account.queryByText("My details")).toBeNull()
    expect(account.queryByText("Username")).toBeNull()
    expect(account.queryByText("Email")).toBeNull()

    expect(account.queryByText("Account information")).toBeNull()
    expect(account.queryByText("Biolink visible")).toBeNull()
    expect(account.queryByText("Account Type")).toBeNull()


    expect(account.queryByText("Security settings")).toBeNull()

    expect(account.queryByText("Change your password")).toBeNull()

    expect(account.queryByText("Delete your account")).toBeNull()

} );


test("form sections shown after loading", () => {
    mockProps.isLoading = false;
    mockAccount(mockProps);

    // headers
    expect(screen.getByText("My Account").toBeInTheDocument)

    expect(screen.getByText("My details").toBeInTheDocument)
    expect(screen.getByText("Username").toBeInTheDocument)
    expect(screen.getByText("Email").toBeInTheDocument)

    expect(screen.getByText("Account information").toBeInTheDocument)
    expect(screen.getByText("Biolink visible").toBeInTheDocument)
    expect(screen.getByText("Account Type").toBeInTheDocument)


    expect(screen.getByText("Security settings").toBeInTheDocument)
    expect(screen.getByText("Change your password").toBeInTheDocument)
    expect(screen.getByText("Delete your account").toBeInTheDocument)

} );

test("if account type is business, show the tag select, and status", () => {
    mockProps.accountType = "business";
    mockAccount(mockProps);

    // headers
    

    expect(screen.getByText("Account Type").toBeInTheDocument)
    expect(screen.getByText("Tag").toBeInTheDocument)
    expect(screen.getByText("Status").toBeInTheDocument)

});

test("if account type is personal, do not show the tag select, and status", () => {
    mockProps.accountType = "personal";
    mockAccount(mockProps);

    // headers
    

    expect(screen.getByText("Account Type").toBeInTheDocument)
    expect(screen.queryByText("Tag")).toBeNull()
    expect(screen.queryByText("Status")).toBeNull()

}
);

test("if status is approved show 'Approved' and is shown", () => {
    mockProps.status = "approved";
    mockAccount(mockProps);

    let status = screen.getByTestId("status");
    expect(status).toBeInTheDocument
    expect(status).toHaveTextContent("Approved")
    expect(status.classList.contains(style.ppproved)).toBe(true);

    
});


test("when delete account button is pressed the onDeleteAccount function is called", () => {
    mockProps.isLoading = false;
    mockProps.accountType = "personal";
    mockProps.username = "testUser";
    mockProps.userId = "1234";
    mockProps.email = "test@email.com";
    mockProps.tag = "dj";
    mockProps.biollinkVisible = true;
    mockProps.status = "approved";
    mockProps.isReviewed = true;
    mockProps.isLoading = false;
    
    mockAccount(mockProps);

    let button = screen.getByText("Delete");
    fireEvent.click(button);

    expect(deleteAccount).toHaveBeenCalledTimes(1);

});


test("when save account button is pressed the onSaveAccount function is called", () => {
    mockProps.isLoading = false;
    mockProps.accountType = "personal";
    mockProps.username = "testUser";
    mockProps.userId = "1234";
    mockProps.email = "test@email.com";

    mockProps.tag = "dj";
    mockProps.biollinkVisible = true;
    mockProps.status = "approved";
    mockProps.isReviewed = true;
    mockProps.isLoading = false;

    mockAccount(mockProps);

    let button = screen.getByText("Save");

    fireEvent.click(button);

    expect(saveAccountInfo).toHaveBeenCalledTimes(1);

});

test("when change your password is called, the change modal shows", () => {
    mockProps.isLoading = false;
    mockProps.accountType = "personal";
    mockProps.username = "testUser";
    mockProps.userId = "1234";
    mockProps.email = "test@email.com"
    mockProps.tag = "dj";
    mockProps.biollinkVisible = true;
    mockProps.status = "approved";
    mockProps.isReviewed = true;
    mockProps.isLoading = false;

    mockAccount(mockProps);

    let button = screen.getByText("Change");

    fireEvent.click(button);

    expect(screen.getByText("Update your Password").toBeInTheDocument);
    expect(screen.getByText("Old Password").toBeInTheDocument);
    expect(screen.getByText("New Password").toBeInTheDocument);
    expect(screen.getByText("Confirm Password").toBeInTheDocument);

});



