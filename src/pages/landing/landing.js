import React, { useEffect, useState } from "react";
import { useRef } from "react";
import style from "./landing.module.css";
import { ReactComponent as BiolinkScreenshot } from "./screenshot-page.svg";
import { ReactComponent as MiniBiolinkScreenshot } from "./mini-screenshot.svg";
import VanillaTilt from "vanilla-tilt";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

const initialValues = {
  EMAIL: "",
};

function Tilt(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

function Landing(props) {
  const tiltOptions = {
    scale: 1.07,
    speed: 2000,
    max: 10,
  };

  const [formInput, setformInput] = useState(initialValues);
  const [subscribed, setSubscribed] = useState(false);

  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
          return supportsPassive;
        },
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // set scoll to top
  window.scrollTo(0, 0);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  disableScroll();
  setTimeout(() => {
    enableScroll();
  }, 1750);

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setformInput({
      ...formInput,
      ...formInput.EMAIL,
      [name]: value,
    });
  };

  const onSubmitEmail = (e) => {
    setSubscribed(true);
    props.successCallback("Thank you for subscribing!");
  };

  const [emailText, setEmailText] = useState("");
  const handleEmailTextChange = (e) => {
    setEmailText(e.target.value);
  };

  function form({ onSubmitEmail }) {
    const handleSubmit = (e) => {
      onSubmitEmail(
        e.currentTarget.elements.EMAIL.value,
        e.currentTarget.elements.b_2dd2613b011d7f58dea48fe22_fed918f2f4.value
      );
    };
    // const formAction = process.env.REACT_APP_LANDING_PAGE_MAILCHIMP_EMBED_FORM_ACTION;
    const formAction =
      "https://uplist.us21.list-manage.com/subscribe/post?u=2dd2613b011d7f58dea48fe22&amp;id=fed918f2f4&amp;f_id=00ced7e6f0";

    return (
      <form
        action={formAction}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        onSubmit={handleSubmit}
        noValidate
      >
        <input
          type="email"
          value={formInput.EMAIL}
          name="EMAIL"
          className={style.email_input}
          id="mce-EMAIL"
          onChange={handleEmailChange}
          placeholder="Enter your email here"
          required
        ></input>
        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-5000px" }}
        >
          <input
            type="text"
            name="b_2dd2613b011d7f58dea48fe22_fed918f2f4"
            tabindex="-1"
            value={emailText}
            onChange={handleEmailTextChange}
          ></input>
        </div>
        <input
          type="submit"
          value="Subscribe"
          name="subscribe"
          id="mc-embedded-subscribe"
          className={style.email_submit_button}
        ></input>
      </form>
    );
  }

  const renderLogoHeader = () => {
    return (
      <div className={style.logo_container}>
        <div className={style.landing_logo}>
          <img src="/logo/logo.png" alt="logo" className={style.logo} />
        </div>
      </div>
    );
  };

  const renderEmailContent = () => {
    return (
      <div className={style.content_container}>
        {renderLogoHeader()}
        <div className={style.landing_title_container}>
          <span className={style.landing_title}>
            ARTIST BOOKINGS MADE SIMPLE
          </span>
        </div>
        <br />

        <div className={!subscribed ? style.display_form : style.hide_form}>
          <p
            style={{ color: "white", fontSize: "25px", marginBottom: "-10px" }}
          >
            Booking an event?
          </p>
          <>{form({ onSubmitEmail })}</>
        </div>
        {subscribed && (
          <div className={style.subscribe_success}>
            Thank you for subscribing!
          </div>
        )}
      </div>
    );
  };

  const renderDescriptionContent = () => {
    return (
      <div className={style.description_container}>
        <div className={style.description}>
          <ScrollAnimation
            animateIn="animate__fadeInDown"
            animateOnce={true}
            offset={300}
          >
            <span className={style.description_text}>
              Restoring Sovereignty to musicians <br /> through innovation and{" "}
              <br /> personalisation
            </span>
          </ScrollAnimation>
        </div>
      </div>
    );
  };

  const renderBiolinkScreenShotContent = () => {
    return (
      <div className={style.screenshot_container}>
        <ScrollAnimation
          animateIn="animate__fadeInLeft"
          animateOnce={true}
          delay={550}
          offset={250}
        >
          <div className={style.biolink_screenshot_description_container}>
            <div className={style.biolink_screenshot_description}>
              <span className={style.biolink_screenshot_description_text}>
                Your own customisable page, all your content in one place and
                easy bookings management
              </span>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="animate__fadeInRight"
          animateOnce={true}
          delay={600}
          offset={250}
        >
          <Tilt className={style.tilt} options={tiltOptions}>
            <div className={style.biolink_screenshot}>
              <BiolinkScreenshot className={style.biolink_screenshot_item} />
            </div>
          </Tilt>
        </ScrollAnimation>
      </div>
    );
  };

  const renderBufferContent = () => {
    return (
      <div className={style.buffer_container}>
        <div className={style.buffer}>
          <ScrollAnimation
            animateIn="animate__fadeIn"
            animateOnce={true}
            offset={300}
          >
            <span className={style.buffer_text}>On Your Laptop or phone</span>
          </ScrollAnimation>
        </div>
      </div>
    );
  };

  const renderMiniBiolinkContent = () => {
    return (
      <div className={style.mini_biolink_container}>
        <ScrollAnimation
          animateIn="animate__fadeInLeft"
          animateOnce={true}
          delay={400}
          offset={550}
        >
          <Tilt className={style.tilt} options={tiltOptions}>
            <div className={style.mini_biolink}>
              <MiniBiolinkScreenshot className={style.mini_biolink_image} />
            </div>
          </Tilt>
        </ScrollAnimation>
        <ScrollAnimation
          animateIn="animate__fadeInRight"
          animateOnce={true}
          delay={150}
          offset={250}
        >
          <div className={style.mini_biolink_description}>
            <span className={style.mini_biolink_description_text}>
              Bringing the industry closer to you and you closer to your fans
            </span>
          </div>
        </ScrollAnimation>
      </div>
    );
  };

  const renderLandingFooter = () => {
    return (
      <div className={style.landing_footer}>
        <div className={style.address}>
          <strong>UPlist</strong>
          <div />3 Centenary Sq, Birmingham B1 2DR
        </div>
      </div>
    );
  };

  return (
    <div className={style.landing}>
      <div className={style.landing_page}>
        {renderEmailContent()}
        {renderDescriptionContent()}
        {renderBiolinkScreenShotContent()}
        {renderBufferContent()}
        {renderMiniBiolinkContent()}
        {renderLandingFooter()}
      </div>
    </div>
  );
}

export default Landing;
