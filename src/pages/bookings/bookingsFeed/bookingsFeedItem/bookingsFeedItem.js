import React from "react";
import style from "./bookingsFeedItem.module.css";
import Tags from "../../../../components/biolinkFeedItem/tags/tags";
import CounterBooking from "../../counterBooking/counterBooking";
import { NavLink } from "react-router-dom";
import Rating from "../../../../components/biolinkFeedItem/rating/rating";

const BookingsFeedItem = (props) => {

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

  const renderDateFormated = (start_datetime, end_datetime) => {
    let startDate = new Date(start_datetime);
    let startTime = startDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    let endDate = new Date(end_datetime);
    let endTime = endDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className={style.date}>
        <b> Start: </b> <span>{startDate.toDateString()} </span>{" "}
        <span>{startTime}</span>
        <br />
        <b> End: </b>
        <span>{endDate.toDateString()} </span>
        <span>{endTime}</span>
      </div>
    );
  };

  const renderStatus = (status) => {
    const isArtist = props.booking?.artist === props.userState.id;
    const isUser = props.booking?.user === props.userState.id;

    let color = "grey";

    if (status === "pending_artist_action") {
      if (isArtist) {
        // actions accepti decline counter
        // message respond to user
        color = "blue";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}> respond to the enquiry </span>
          </div>
        );
      } else if (isUser) {
        color = "orange";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}>
              {" "}
              waiting for the artist to respond{" "}
            </span>
          </div>
        );
      }
    } else if (status === "pending_user_action") {
      if (isArtist) {
        color = "orange";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}>
              {" "}
              waiting for the users response{" "}
            </span>
          </div>
        );
      } else if (isUser) {
        color = "blue";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}>
              {" "}
              respond to the updated enquiry{" "}
            </span>
          </div>
        );
      }
    } else if (status === "rejected_by_artist") {
      color = "red";
      if (isUser) {
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}> rejected by the artist </span>
          </div>
        );
      }
    } else if (status === "canceclled_by_user") {
      color = "red";
      return (
        <div className={style.status}>
          <b>Status:</b> <span style={{ color: `${color}` }}> cancelled </span>
        </div>
      );
    } else if (status === "pending_payment") {
      if (isArtist) {
        color = "orange";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}> waiting for payment </span>
          </div>
        );
      } else if (isUser) {
        color = "blue";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}>
              {" "}
              pay now to confirm booking{" "}
            </span>
          </div>
        );
      }
    } else if (status === "paid") {
      // if history, allowRatings = true then status = "service_completed"
      if (!props.booking?.completed) {
        color = "green";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}> booking confirmed </span>
          </div>
        );
      } else if (props.booking?.completed) {
        color = "green";
        return (
          <div className={style.status}>
            <b>Status:</b>{" "}
            <span style={{ color: `${color}` }}> service completed </span>
          </div>
        );
      }
    } else if (status === "refunded") {
      return (
        <div className={style.status}>
          <b>Status:</b> <span style={{ color: `${color}` }}> refunded </span>
        </div>
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

  return (
    <div data-testid="bookings-feed-item">
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

      <div className={style.bookingsFeedItem}>
        <Tags tags={[props.userState.artist_type]} />

        <div className={style.container}>
          <div className={style.image_contaienr}>
            <NavLink
              to={"/biolink/" + props.booking?.artistState?.user?.username}
            >
              {renderProfileImage(props.booking?.artistState?.pageImage)}
            </NavLink>
          </div>
          <div className={style.content}>
            <div className={style.title}>
              {props.booking?.artistState?.user?.username}
            </div>

            <div className={style.description}>
              {props.booking?.artistState?.description}
            </div>

            <div className={style.price}>
              Price: {" £"}
              {props.booking?.enquiry?.price}
            </div>

            {renderDateFormated(
              props.booking?.enquiry?.start_datetime,
              props.booking?.enquiry?.end_datetime
            )}

            <div className={style.notes}>
              <b> User notes: </b>{" "}
              {props.booking?.enquiry?.notes
                ? props.booking?.enquiry?.notes
                : "n/a"}
            </div>

            <div className={style.status}>
              {renderStatus(props.booking.status)}
            </div>

            {props.booking?.allowRatings && (
              <div className={style.rating_container}>
                <div className={style.rating}>
                  <b>Rating: </b>
                  <span className={style.rating_item}>
                    <Rating
                      className={style.rating_item}
                      ratingState={props.ratingState}
                      rating={getRating()}
                      onRatingChange={props.onRatingChange}
                    />
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={style.action_buttons_container}>
          {renderActionButtons(props.booking.status)}
        </div>
      </div>
    </div>
  );
};

export default BookingsFeedItem;
