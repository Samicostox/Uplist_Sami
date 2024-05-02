import CreativesImage from "../images/creatives/creatives.jpg";
import ComunityImage from "../images/creatives/image1.png";
import React, { useEffect, useState } from "react";

export default function Creatives() {
  const initialValues = {
    EMAIL: "",
  };
  const [formInput, setformInput] = useState(initialValues);
  const [subscribed, setSubscribed] = useState(false);
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
        <div className="relative flex items-center">
          <input
            type="email"
            value={formInput.EMAIL}
            name="EMAIL"
            className="pl-2 w-full rounded-tr-lg rounded-br-lg"
            id="mce-EMAIL"
            onChange={handleEmailChange}
            placeholder="Enter your email here"
            required
          />
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            className="absolute right-0 w-28 h-10 border-none bg-black text-white text-center text-lg font-normal cursor-pointer transition duration-300 rounded-tr-lg rounded-br-lg"
          />
        </div>
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
          />
        </div>
      </form>
    );
  }
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="text-5xl font-extrabold font-cabinet-grotesk">
              Join emerging music artists from around the UK and Worldwide
            </h2>
          </div>
          {/* Section content */}
          <div className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
            {/* Creatives cards */}
            <div className="md:w-1/2" data-aos-id-cards>
              <img
                className="inline-block mb-12"
                src={ComunityImage}
                width={500}
                height={181}
                alt="Creatives"
              />
            </div>
            {/* Content */}
            <div className="md:w-1/2 md:pl-10 lg:pl-20">
              <div className="text-center md:text-left">
                <img
                  className="inline-block mb-12"
                  src={CreativesImage}
                  width={330}
                  height={181}
                  alt="Creatives"
                />
                <h3 className="text-3xl font-extrabold text-left font-cabinet-grotesk text-4xl mb-4">
                  More than a community
                </h3>
                <p className="text-xl text-gray-500 mb-6 text-left">
                  We support the top independent music talent in the UK raise
                  their profile, perform at exciting venues and nurture
                  relationships within the industry.
                </p>
                <div>
                  <div className={!subscribed ? "block" : "hidden"}>
                    <p className="text-black font-bold text-left mb-2 text-xl">
                      Booking an event?
                    </p>
                    <>{form({ onSubmitEmail })}</>
                  </div>
                  {subscribed && (
                    <div className="text-2xl text-left font-semibold text-black mt-2.5 outline-none">
                      Thank you for subscribing!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
