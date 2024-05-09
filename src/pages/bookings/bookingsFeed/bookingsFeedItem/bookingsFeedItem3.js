import React from "react";
import style from "./bookingsFeedItem.module.css";
import Tags from "../../../../components/biolinkFeedItem/tags/tags";
import CounterBooking from "../../counterBooking/counterBooking";
import { NavLink } from "react-router-dom";
import Rating from "../../../../components/biolinkFeedItem/rating/rating";

const BookingsFeedItem3 = (props) => {

  console.log('before')
  console.log(props.booking?.artistState?.pageImage)
  console.log(props.booking?.artistState?.description)
  const renderProfileImage = (pageImage) => {
 
    if (pageImage) {
      return (
        <img src={pageImage} alt="profile" className={style.heading_image} />
      );
    } else {
      return (
        <img
          src="/pictures/temp/profile.png"
          alt="profile"
          className={style.heading_image + " " + style.loaded}
        />
      );
    }
  };



  const requestRefundButton = () => {
    const isArtist = props.booking?.artist === props.userState.id;
    const isUser = props.booking?.user === props.userState.id;
    // if isArtist, show request refund mail button for artist to cancel their booking
    // if isUser, show request refund mail button for user to cancel their booking
    if (isArtist) {
      return (
        <a
          className={style.mailto_link}
          href={`mailto:rossderrick261@gmail.com <rossderrick261@gmail.com>;?subject=Refund%2Fcancelation%20request%20(Artist)&body=Please%20state%20below%20the%20reason%20for%20this%20cancelation%20request.%20Check%20the%20terms%20at%20the%20bottom%20of%20the%20email%20before%20sending.%0A----------------------------------------------------------------------------------------------------------%0A%0A%23%20Enter%20here%20%23%0A%0A----------------------------------------------------------------------------------------------------------%0A%0Abooking%20id%3A%20${props.booking?.id}%0D%0A%0ABy%20sending%20this%20email%20you%20are%20formally%20requesting%20to%20cancel%20the%20service%20that%20was%20agreed%20upon%20between%20you%20and%20the%20user.%20You%20agree%20that%20this%20request%20has%20been%20made%20in%20good%20faith%20and%20matches%20the%20terms%20stated%20below.%20Each%20request%20will%20be%20moderated%20by%20a%20member%20of%20the%20Uplist%20team%20and%20a%20decision%20its%20and%20consequential%20action%20would%20be%20notified%20to%20you%20in%20an%20email%20reply.%0A%0AMake%20sure%3A%20The%20email%20of%20the%20above%20request%20matches%20the%20email%20of%20the%20respective%20Uplist%20account%20else%20you%20may%20need%20to%20provide%20further%20identification.%0A%0ATerms%3A%0A-%20If%20the%20request%20is%20accepted%2C%20the%20purchaser%20will%20receive%20a%20full%20refund%20for%20the%20service%3B%20and%20the%20service%20no%20longer%20needs%20to%20be%20carried%20out.%0A-%20If%20the%20request%20is%20denied%20you%20MUST%20fully%20carry%20out%20the%20service%20originally%20agreed%20upon.%20Failure%20to%20do%20so%20may%20result%20in%20the%20withholding%20and%2For%20seizure%20of%20your%20account%20funds%20and%2For%20the%20termination%2Frestriction%20on%20your%20account.%0A%0A%0A`}
        >
          <div className={style.action_button + " " + style.refund}>
            Request Refund
          </div>
        </a>
      );
    } else if (isUser) {
      return (
        <a
          className={style.mailto_link}
          href={`mailto:rossderrick261@gmail.com <rossderrick261@gmail.com>;?subject=Refund%2Fcancelation%20request%20(User)&body=Please%20state%20below%20the%20reason%20for%20the%20refund%20request.%20Check%20the%20terms%20at%20the%20bottom%20of%20the%20email%20before%20sending.%0A----------------------------------------------------------------------------------------------------------%0A%0A%23%20enter%20here%20%23%0A%0A----------------------------------------------------------------------------------------------------------%0A%0Abooking%20id%3A%20${props.booking?.id}%0A%0ABy%20sending%20this%20email%2C%20you%20are%20formally%20requesting%20for%20a%20refund%2Fcancellation%20of%20the%20service%20that%20was%20agreed%20upon%20between%20you%20and%20the%20artist.%20You%20agree%20that%20this%20request%20has%20been%20made%20in%20good%20faith%20and%20matches%20the%20terms%20stated%20below.%20Each%20request%20will%20be%20moderated%20by%20a%20member%20of%20the%20Uplist%20team%20and%20a%20decision%20and%20resulting%20action%20would%20be%20notified%20to%20you%20in%20an%20email%20reply.%0A%0AMake%20sure%20that%20the%20email%20of%20the%20above%20request%20matches%20the%20email%20of%20the%20respective%20Uplist%20account%2C%20otherwise%20further%20identification%20may%20need%20to%20be%20provided.%0A%0ATerms%3A%0A-%20If%20the%20request%20is%20accepted%2C%20the%20purchaser%20will%20receive%20a%20full%20refund%20for%20the%20service%3B%20and%20that%20service%20will%20no%20longer%20need%20to%20be%20carried%20out.%0A-%20If%20the%20request%20is%20denied%2C%20no%20refund%20will%20be%20processed%20and%20the%20Artist%20still%20has%20a%20commitment%20to%20carry%20out%20the%20service%20in%20full.%0A%0A%0A`}
        >
          <div className={style.action_button + " " + style.refund}>
            Request Refund
          </div>
        </a>
      );
    }
  };

  const renderActionButtons = (status) => {
    const isArtist = props.booking?.artist === props.userState.id;
    const isUser = props.booking?.user === props.userState.id;

    if (status === "pending_artist_action") {
      if (isArtist) {
        // actions accept, decline, counter
        return (
          <div className={style.action_buttons}>
            <button
              className={style.action_button + " " + style.accept}
              onClick={props.artistAccept}
            >
              Accept
            </button>
            <button
              className={style.action_button + " " + style.counter}
              onClick={artistCounter}
            >
              Counter
            </button>
            <button
              className={style.action_button + " " + style.decline}
              onClick={props.artistDecline}
            >
              Decline
            </button>
          </div>
        );
      } else if (isUser) {
        // actions include cancel enquiry,
        // where cancel would get rid of the booking enquiry entirely
        return (
          <div className={style.action_buttons}>
            <button
              className={style.action_button + " " + style.cancel}
              onClick={props.userCancel}
            >
              Cancel
            </button>
          </div>
        );
      }
    } else if (status === "pending_user_action") {
      if (isArtist) {
      } else if (isUser) {
        // actions include: accept, decline, counter
        // where decline would get rid of the booking enquiry entirely
        return (
          <div className={style.action_buttons}>
            <button
              className={style.action_button + " " + style.accept}
              onClick={props.userAccept}
            >
              Accept
            </button>
            <button
              className={style.action_button + " " + style.decline}
              onClick={props.userDecline}
            >
              Decline
            </button>
            <button
              className={style.action_button + " " + style.counter}
              onClick={userCounter}
            >
              Counter
            </button>
          </div>
        );
      }
    } else if (status === "rejected_by_artist") {
      if (isArtist) {
      } else if (isUser) {
        // actions include: create new enquiry
        return (
          <div className={style.action_buttons}>
            <NavLink to={`/book/${props.booking?.artistState?.user?.username}`}>
              <button className={style.action_button + " " + style.create}>
                New Enquiry
              </button>
            </NavLink>
          </div>
        );
      }
    } else if (status === "canceclled_by_user") {
    } else if (status === "pending_payment") {
      if (isArtist) {
      } else if (isUser) {
        // actions include: pay, cancel
        return (
          <div className={style.action_buttons}>
            <button
              className={style.action_button + " " + style.pay}
              onClick={props.userPay}
            >
              Pay
            </button>
            <button
              className={style.action_button + " " + style.cancel}
              onClick={props.userCancel}
            >
              Cancel
            </button>
          </div>
        );
      }
    } else if (status === "paid") {
      if (isArtist) {
        return (
          <div className={style.action_buttons}>{requestRefundButton()}</div>
        );
      } else if (isUser) {
        return (
          <div className={style.action_buttons}>{requestRefundButton()}</div>
        );
      }
    }
  };

  const calculateDateStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in one day
  
    if (now < startDate) {
      const daysToStart = Math.round((startDate - now) / oneDay);
      return { text: `${daysToStart} days left`, color: 'bg-green-100 text-green-700' }; // green before the event starts
    } else if (now >= startDate && now <= endDate) {
      return { text: 'Currently happening', color: 'bg-green-500 text-white' }; // darker green during the event
    } else {
      const daysSinceEnd = Math.round((now - endDate) / oneDay);
      return { text: `${daysSinceEnd} days ago`, color: 'bg-red-100 text-red-700' }; // red after the event ends
    }
  };

  const dateStatus = calculateDateStatus(props.booking?.enquiry?.start_datetime, props.booking?.enquiry?.end_datetime);

  const [counterModalOpen, setCounterModalOpen] = React.useState(false);
  const userCounter = () => {
    setCounterModalOpen(true);
  };
  const artistCounter = () => {
    setCounterModalOpen(true);
  };

  const onCounter = (price) => {
    setCounterModalOpen(false);
    props.onCounter(price);
  };

  const getRating = () => {
    if (props.booking?.userRating) {
      return props.booking?.userRating;
    } else return props.artistState?.user.average_rating;
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
    return new Date(dateString).toLocaleString('en-GB', options);
  };

  const formattedStartDateTime = formatDate(props.booking?.enquiry?.start_datetime);
  const formattedEndDateTime = formatDate(props.booking?.enquiry?.end_datetime);

  return (
    <div className="bg-white px-4 py-5 sm:px-6 shadow-xl max-w-7xl mx-6 rounded-lg w-full ">
         {counterModalOpen && (
        <CounterBooking
          booking={props.booking}
          onAction={props.onAction}
          onClose={() => setCounterModalOpen(false)}
          onCounter={onCounter}
          errorCallback={props.errorCallback}
          successCallback={props.successCallback}
        />
      )}
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={props.booking?.artistState?.pageImage}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">
     
          {props.booking?.artistState?.user?.username}
         
        </p>
        <p className="text-sm text-gray-500">
          <a href="#" className="hover:underline">
          {formattedStartDateTime} - {formattedEndDateTime}
          </a>
        </p>
      </div>
     
    <div className="flex flex-shrink-0 self-center">
          <span className={`inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium ${dateStatus.color}`}>
            <svg className="w-2.5 h-2.5 me-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
            </svg>
            {dateStatus.text}
          </span>
        </div>
      </div>
    <h1 className="text-xl font-bold text-gray-900 mt-4 max-w-3xl ">
    Price: {" £"}
              {props.booking?.enquiry?.price}
    </h1>
    <p className="text-sm  text-gray-900 mt-2 max-w-full break-words">
        {props.booking?.artistState?.description}
    </p>
    
   <div className="flex items-start gap-2.5 mt-6 bg-gray-100 p-6 rounded-lg shadow-sm">
  <img className="w-8 h-8 rounded-full" src="https://res.cloudinary.com/dl2adjye7/image/upload/v1715253503/blank-profile-picture-973460_960_720_1_fuwup7.webp" alt="Jese image"/>
  <div className="flex flex-col flex-1 min-w-0">
      <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold text-gray-900">User Request</span>
      </div>
      <div className="py-2 bg-gray-100 rounded-lg  overflow-hidden break-words">
    <p className="text-gray-900 text-sm">
        {props.booking?.enquiry?.notes ? props.booking?.enquiry?.notes : "n/a"}
    </p>
</div>
      <div className="inline-flex "> 
          <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
              <svg className="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true">
                <circle cx={3} cy={3} r={3} />
              </svg>
              {props.booking.status}
          </span>
          
      </div>
      
      
  </div>
  
  
</div>
<div className="mt-4 ">
{renderActionButtons(props.booking.status)}

</div>





    
  </div>
  );
};

export default BookingsFeedItem3;
