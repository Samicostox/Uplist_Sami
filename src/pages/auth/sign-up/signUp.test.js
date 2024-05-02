import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import SignUp from "./signUp";
import { MemoryRouter as Router, Route, Routes } from "react-router-dom";


// pay attention to write it at the top level of your file
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom') ,
  useNavigate: () => mockedUsedNavigate,
}));


const renderStage1 = () => {
    return render(
        <Router>
            <SignUp />
        </Router>
    );
};



const renderStage2 = async() => {
    render(
        // base64 encoded string of username and email
        <Router initialEntries={['/auth/sign-up/dXNlcm5hbWU9dGVzdE5hbWUmZW1haWw9dGVzdEBlbWFpbC5jb20=']}>
            <Routes >
                <Route path="/auth/sign-up/:query" element={<SignUp />} />
            </Routes>
            <SignUp />
        </Router>
    );

    // wait for page to load
    await waitFor(() => screen.getByText("PASSWORD"));
   
    return screen;

    
};
const renderStage3 = async() => {
    render(
        // base64 encoded string of username and email
        <Router initialEntries={['/auth/sign-up/dXNlcm5hbWU9dGVzdE5hbWUmZW1haWw9dGVzdEBlbWFpbC5jb20mcGFzc3dvcmQ9dGVzdFBhc3N3b3Jk']}>
            <Routes >
                <Route path="/auth/sign-up/:query" element={<SignUp />} />
            </Routes>
            <SignUp />
        </Router>
    );

    // wait for page to load
    await waitFor(() => screen.getByText("Personal"));
   
    return screen;

    
};

const renderStage4 = async() => {

    render(
        // base64 encoded string of username and email
        <Router initialEntries={['/auth/sign-up/dXNlcm5hbWU9dGVzdE5hbWUmZW1haWw9dGVzdEBlbWFpbC5jb20mcGFzc3dvcmQ9dGVzdFBhc3N3b3Jk']}>
            <Routes >
                <Route path="/auth/sign-up/:query" element={<SignUp />} />
            </Routes>
            <SignUp />
        </Router>
    );
    
    

    // wait for page to load
    await waitFor(() => {
        screen.getByText("Business")


        // click  business
        fireEvent.click(screen.getByText("Business"));
        
    });

    // wait for page to load
    await waitFor(() => screen.getByText("Type of Artist"));
    
    return screen;

};

afterEach(() => {
    jest.clearAllMocks();
});


//test block
test("renders stage 1 of the sign up", () => {
    
    const stage1 = renderStage1();

    // headers
    expect(stage1.getByText("Create an account").toBeInTheDocument)
    expect(stage1.getByText("create your uplist account in seconds").toBeInTheDocument)

    // form
    expect(stage1.getByText("USERNAME").toBeInTheDocument)
    expect(stage1.getByText("EMAIL").toBeInTheDocument)
    expect(stage1.getByText("Continue").toBeInTheDocument)

    // already have an account
    expect(stage1.getByText("Already have an account?").toBeInTheDocument)
    expect(stage1.getByText("Sign In here!").toBeInTheDocument)
    
});

// test("test it navigatesthe correct binary string to the url query when transitioning from 1-2 ", async () => {
//     const stage1 = renderStage1();

//     // fill out form
//     fireEvent.change(stage1.getByTestId("username"), { target: { value: "testName" } });
//     fireEvent.change(stage1.getByTestId("email"), { target: { value: "test@email.com" } });


//     // get the continue button
//     const continueButton = stage1.getByText("Continue");

//     expect(stage1.getByText("Continue").toBeInTheDocument);

//     // expect the button to be on the page
//     expect(continueButton.toBeInTheDocument);

//     // submit on the continue button
//     fireEvent.click(continueButton);

//    console.log(mockedUsedNavigate.mock.calls)
//     // check if useNavigate was called with the correct binary string
//     expect(mockedUsedNavigate).toHaveBeenCalledWith("/auth/sign-up/dXNlcm5hbWU9dGVzdE5hbWUmZW1haWw9dGVzdEBlbWFpbC5jb20=");
// });


test("renders stage 2 of the sign up", async () => {
    renderStage2();


    // check state of page 2

    // headers
    expect(screen.getAllByText("Create an account")[0].toBeInTheDocument)
    expect(screen.getAllByText("create your uplist account in seconds")[0].toBeInTheDocument)

    // form
    expect(screen.getByText("PASSWORD").toBeInTheDocument)
    expect(screen.getByText("CONFIRM PASSWORD").toBeInTheDocument)
    expect(screen.getAllByText("Continue")[0].toBeInTheDocument)

    // already have an account
    expect(screen.getAllByText("Already have an account?")[0].toBeInTheDocument)
    expect(screen.getAllByText("Sign In here!")[0].toBeInTheDocument)
});

test("renders stage 3 of the sign up", async () => {
    renderStage3();

    // check state of page 3

    // headers
    expect(screen.getAllByText("Create an account")[0].toBeInTheDocument)
    expect(screen.getAllByText("create your uplist account in seconds")[0].toBeInTheDocument)

    // form
    expect(screen.getByText("Personal").toBeInTheDocument)
    expect(screen.getByText("Business").toBeInTheDocument)

    // already have an account
    expect(screen.getAllByText("Already have an account?")[0].toBeInTheDocument)
    expect(screen.getAllByText("Sign In here!")[0].toBeInTheDocument)
});


test("renders stage 4 of the sign up", async () => {
    renderStage4();

    // check state of page 4

    // headers
    expect(screen.getAllByText("Create an account")[0].toBeInTheDocument)
    expect(screen.getAllByText("create your uplist account in seconds")[0].toBeInTheDocument)

    // form
    expect(screen.getByText("Type of Artist").toBeInTheDocument)
    expect(screen.getByTestId("artist_type_select").toBeInTheDocument)
    expect(screen.getAllByText("Continue")[0].toBeInTheDocument)

    // already have an account
    expect(screen.getAllByText("Already have an account?")[0].toBeInTheDocument)
    expect(screen.getAllByText("Sign In here!")[0].toBeInTheDocument)


});


