import React from "react";
import style from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Auth from "./pages/auth/auth";
import ProfileController from "./pages/link/linkController";
import SignUp from "./pages/auth/sign-up/signUp";
import Navbar from "./components/navbar/navbar";
import ToasterBanner from "./components/toasterBanner/toasterBanner";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PaymentSuccess from "./pages/stripeCallbacks/paymentSuccess/paymentSuccess";
import Return from "./pages/stripeCallbacks/return/return";
import Refresh from "./pages/stripeCallbacks/refresh/refresh";
import AccountController from "./pages/account/accountController";
import EditController from "./pages/link/edit/editController";
import AdminController from "./pages/admin/adminController";
import BookController from "./pages/book/bookController";
import BookingsController from "./pages/bookings/bookingsController";
import MarketplaceController from "./pages/marketplace/marketplaceController";
import PrivacyPolicy from "./pages/terms/PrivacyPolicy";
import TermsAndConditions from "./pages/terms/termsAndConditions";
import CookiesBanner from "./components/cookies/cookies";
import ResetPassword from "./pages/auth/ResetPassword/resetPassword";
import Example from "./pages/sami-hugo/landing";
import Auth2 from "./pages/auth/auth";
import GrayRectangle from "./components/biolinkFeedItem/biolinkFeedItem2";
import BookingsFeedItem from "./pages/bookings/bookingsFeed/bookingsFeedItem/bookingsFeedItem";
import BookingsFeedItem2 from "./pages/bookings/bookingsFeed/bookingsFeedItem/bookingsFeedItem2";
import ResetPassword2 from "./pages/auth/ResetPassword/resetPassword";
import SignUp2 from "./pages/auth/sign-up/signUp";

function App() {
  const toasterBannerRef = React.useRef(null);

  const recievedSuccessCallback = (message) => {
    if (toasterBannerRef.current) {
      toasterBannerRef.current.notifySuccess(message);
    }
  };

  const recievedErrorCallback = (message) => {
    if (toasterBannerRef.current) {
      toasterBannerRef.current.notifyError(message);
    }
  };

  const recievedLoadCallback = () => {
    if (toasterBannerRef.current) {
      toasterBannerRef.current.notifyLoad();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={style.app}>
        <ToasterBanner ref={toasterBannerRef} />

        <CookiesBanner />

        <Router>
          {/* 
        {window.location.host.split('.')[0] === 'auth' ? (
          <Routes>
            <Route path="/" element={<Auth 
            errorCallback = {recievedErrorCallback} 
            successCallback = {recievedSuccessCallback}/>} />
            <Route path = "/sign-up" element={<SignUp 
            errorCallback = {recievedErrorCallback} 
            successCallback = {recievedSuccessCallback}/>} />


            <Route path="*" exact= {true} element={<div>404-page not found </div>} /> 
          </Routes>
        ):( */}

          {process.env.REACT_APP_LANDING_PAGE_ONLY !== "true" && <Navbar />}

          <Routes>
            {process.env.REACT_APP_LANDING_PAGE_ONLY === "true" ? (
              <Route path="*" exact={true} element={<Example />} />
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <Example successCallback={recievedSuccessCallback} />
                  }
                />
                <Route path="/biolink" element={<Landing />} />

                <Route path="/example" element={<Example />} />
                <Route path="/biolink" element={<Landing />} />

                <Route
                  path="/auth/login2"
                  element={
                    <Auth
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route
                  path="/auth/login"
                  element={
                    <Auth2
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route path="/gray" element={<GrayRectangle />} />

                <Route
                  path="/auth/forgot-password"
                  element={
                    <ResetPassword2
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route
                  path="/auth/forgot-password2"
                  element={
                    <ResetPassword
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />

                <Route
                  path="/auth/sign-up/:query"
                  element={
                    <SignUp
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />

                <Route
                  path="/auth/sign-up"
                  element={
                    <SignUp
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />

                <Route
                  path="/auth/sign-up2"
                  element={
                    <SignUp2
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />

                <Route
                  path="/biolink/:username"
                  element={
                    <ProfileController
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route
                  path="/biolink/:username/edit"
                  element={
                    <EditController
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route
                  path="/book/:username"
                  element={
                    <BookController
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />

                <Route
                  path="/artists"
                  element={
                    <MarketplaceController
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />

                <Route
                  path="/account"
                  element={
                    <AccountController
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminController
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <BookingsController
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                      loadCallback={recievedLoadCallback}
                    />
                  }
                />

                <Route
                  path="/bookingfeedtest"
                  element={<BookingsFeedItem2 />}
                />

                <Route
                  path="/booking/success"
                  element={
                    <PaymentSuccess
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />

                <Route
                  path="/return"
                  element={
                    <Return
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route
                  path="/reauth"
                  element={
                    <Refresh
                      errorCallback={recievedErrorCallback}
                      successCallback={recievedSuccessCallback}
                    />
                  }
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route
                  path="/terms-of-service"
                  element={<TermsAndConditions />}
                />

                <Route
                  path="*"
                  exact={true}
                  element={
                    <div className={style.pageNotFound}>
                      <p>404</p>
                      <p>THIS PAGE DOES NOT EXIST</p>
                    </div>
                  }
                />
              </>
            )}
          </Routes>
          {/* )} */}
        </Router>
      </div>
    </LocalizationProvider>
  );
}

export default App;
