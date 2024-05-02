import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";

import { MemoryRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./auth";

test("renders login form", () => {
    render (
        <Router>
                <Auth />
        </Router>
    );



    // headers
    expect(screen.getByText("Login to Your Account").toBeInTheDocument)
    expect(screen.getByText("Login to your uplist account to get started").toBeInTheDocument)

    // form
    expect(screen.getByText("USERNAME").toBeInTheDocument)
    expect(screen.getByText("PASSWORD").toBeInTheDocument)
    expect(screen.getByText("Continue").toBeInTheDocument)

    // already have an account
    expect(screen.getByText("Dont have an account?").toBeInTheDocument)
    expect(screen.getByText("Sign up here").toBeInTheDocument)
    
});