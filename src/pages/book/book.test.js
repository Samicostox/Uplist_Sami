import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Book from "./book";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

let handleStage1Submit = jest.fn();
let handleStage2Submit = jest.fn();



let mockProps = {
    bookingInfo : "This is a booking",
    pageImage : "image.jpg",
    loading : false,

    currentStage : 1,
    handleStage1Submit : handleStage1Submit,
    handleStage2Submit : handleStage2Submit,
    
    startDateTime: dayjs(),
    endDateTime: dayjs(),
    handleStartTimeChange: jest.fn(),
    handleEndTimeChange: jest.fn(),

    price: '£100',
    notes: "This is a note",
    handlePriceChange: jest.fn(),
    handleNotesChange: jest.fn(),


}
const mockBook = (props) => {
    return (
        render (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Router >
                    <Book {...props}/>
                </Router>
            </LocalizationProvider>
        )
    )
}

afterEach(() => {
    jest.clearAllMocks();
    mockProps = {
        bookingInfo : "This is a booking",
        pageImage : "image.jpg",
        loading : false,
    
        currentStage : 1,
        handleStage1Submit : handleStage1Submit,
        handleStage2Submit : handleStage2Submit,
        
        startDateTime: dayjs(),
        endDateTime: dayjs(),
        handleStartTimeChange: jest.fn(),
        handleEndTimeChange: jest.fn(),
    
        price: '£100',
        notes: "This is a note",
        handlePriceChange: jest.fn(),
        handleNotesChange: jest.fn(),
    
    
    }

});

test ("Book page renders without crashing",  () => {
    let book = mockBook(mockProps);
    expect(book).toBeTruthy();
});

test ("stage 1 content not show during loading",  () => {
    mockProps.loading = true;
    mockProps.bookingInfo = "this is a booking";
    let book = mockBook(mockProps);
    expect(book.queryByText("Bookings")).toBeFalsy();
    expect(book.queryByText("this is a booking")).toBeFalsy();
    expect(book.queryByText("Start time")).toBeFalsy();
    expect(book.queryByText("End time")).toBeFalsy();
    expect(book.queryByText("Confirm")).toBeFalsy();
}  );

test ("stage 1 content shown after loading",  () => {
    mockProps.loading = false;
    mockProps.bookingInfo = "this is a booking";
    let book = mockBook(mockProps);
    expect(book.queryByText("Bookings")).toBeTruthy();
    expect(book.queryByText("this is a booking")).toBeTruthy();
    expect(book.queryByText("Start time")).toBeTruthy();
    expect(book.queryByText("End time")).toBeTruthy();
    expect(book.queryByText("Confirm")).toBeTruthy();
});

test ("handleStage1Submit function called when stage 1 confirm button is pressed",  () => {
    mockProps.loading = false;
    mockProps.bookingInfo = "this is a booking";
    let book = mockBook(mockProps);
    let confirmButton = book.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(handleStage1Submit).toHaveBeenCalledTimes(1);
});

test ("stage 2 content not show during loading",  () => {
    mockProps.loading = true;
    mockProps.currentStage = 2;
    mockProps.bookingInfo = "this is a booking";
    let book = mockBook(mockProps);
    expect(book.queryByText("Bookings")).toBeFalsy();
    expect(book.queryByText("Price")).toBeFalsy();
    expect(book.queryByText("Notes")).toBeFalsy();
    expect(book.queryByText("Submit")).toBeFalsy();
});

test ("stage 2 content shown after loading",  () => {
    mockProps.loading = false;
    mockProps.currentStage = 2;
    mockProps.bookingInfo = "this is a booking";
    let book = mockBook(mockProps);
    expect(book.queryByText("Bookings")).toBeTruthy();
    expect(book.queryByText("Price")).toBeTruthy();
    expect(book.queryByText("Notes")).toBeTruthy();
    expect(book.queryByText("Submit")).toBeTruthy();
});

test ("handleStage2Submit function called when stage 2 submit button is pressed",  () => {
    mockProps.loading = false;
    mockProps.currentStage = 2;
    mockProps.bookingInfo = "this is a booking";
    let book = mockBook(mockProps);
    let submitButton = book.getByText("Submit");
    fireEvent.click(submitButton);
    expect(handleStage2Submit).toHaveBeenCalledTimes(1);
});
