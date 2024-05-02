import { useEffect } from "react";
import Illustration from "../images/embeds/features-illustration.svg";
import mailchimp from "../images/embeds/mailchimp.gif";
import spotify from "../images/embeds/spotify.jpg";
import spotify_catalogue from "../images/embeds/spotify-catalogue.jpg";
import soundcloud from "../images/embeds/soundcloud.jpeg";
import skiddle from "../images/embeds/skiddle.png";
import Event from "../images/embeds/event.jpeg";
import Event2 from "../images/embeds/event2.jpg";
import Music from "../images/embeds/music.jpg";
import youtube from "../images/embeds/youtube.jpeg";
import MailchimpLogo from "../images/embeds/mailchimp-logo.svg";
import SpotifyLogo from "../images/embeds/spotify-logo.svg";
import YoutubeLogo from "../images/embeds/youtube-logo.svg";
import Icon02 from "../images/embeds/icon-02.svg";
import Icon03 from "../images/embeds/icon-03.svg";
import Party from "../images/embeds/party.svg";

// Import Swiper
import { Navigation } from "swiper/modules";
import Swiper from "swiper";
import "../swiper.min.css";
Swiper.use([Navigation]);

export default function Embeds() {
  useEffect(() => {
    const carousel = new Swiper(".carousel", {
      slidesPerView: "auto",
      grabCursor: true,
      loop: false,
      centeredSlides: false,
      initialSlide: 0,
      spaceBetween: 24,
      watchSlidesProgress: true,
      navigation: {
        nextEl: ".carousel-next",
        prevEl: ".carousel-prev",
      },
    });
  }, []);

  return (
    <section className="relative mt-10">
      {/* Bg */}
      <div className="absolute inset-0 bg-blue-600 -z-10" aria-hidden="true" />

      {/* Illustration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <img className="max-w-none" src={Illustration} alt="Illsutration" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl pb-12 md:pb-16">
            <h2 className="text-5xl text-left font-extrabold font-cabinet-grotesk text-white">
              All your content in one place
            </h2>
          </div>

          {/* Carousel */}
          <div className="pb-12 md:pb-16">
            {/* Carousel built with Swiper.js [https://swiperjs.com/] */}
            {/* * Custom styles in src/css/additional-styles/theme.scss */}
            <div className="carousel swiper-container max-w-sm mx-auto sm:max-w-none">
              <div className="swiper-wrapper">
                {/* Carousel items */}
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <img
                    className="w-full aspect-[4/3] object-cover h-full rounded-3xl"
                    src={spotify}
                    width="446"
                    height="335"
                    alt="Carousel 01"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <img
                    className="w-full aspect-[4/3] object-cover h-full rounded-3xl"
                    src={Event2}
                    width="446"
                    height="335"
                    alt="Carousel 02"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <img
                    className="w-full aspect-[4/3] object-cover h-full rounded-3xl"
                    src={Music}
                    width="446"
                    height="335"
                    alt="Carousel 03"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <img
                    className="w-full aspect-[4/3] object-cover h-full rounded-3xl"
                    src={Event}
                    width="446"
                    height="335"
                    alt="Carousel 04"
                  />
                </div>
                <div className="swiper-slide max-w-[446px] h-auto">
                  {/* Image */}
                  <img
                    className="w-full aspect-[4/3] object-cover h-full rounded-3xl"
                    src={spotify_catalogue}
                    width="446"
                    height="335"
                    alt="Carousel 05"
                  />
                </div>
              </div>
            </div>

            {/* Arrows */}
            <div className="flex mt-12 space-x-3 justify-end">
              <button className="carousel-prev relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-gray-900">
                <span className="sr-only">Previous</span>
                <svg
                  className="fill-blue-500 group-hover:fill-white transition duration-150 ease-in-out"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m3.914 5 3.5-3.5L6 .086 1.086 5H1v.086L.086 6 1 6.914V7h.086L6 11.914 7.414 10.5 3.914 7H13V5z" />
                </svg>
              </button>
              <button className="carousel-next relative z-20 w-11 h-11 rounded-full flex items-center justify-center group bg-gray-900">
                <span className="sr-only">Next</span>
                <svg
                  className="fill-blue-500 group-hover:fill-white transition duration-150 ease-in-out"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m9.086 5-3.5-3.5L7 .086 11.914 5H12v.086l.914.914-.914.914V7h-.086L7 11.914 5.586 10.5l3.5-3.5H0V5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Grid */}
          <div className="max-w-sm mx-auto grid sm:grid-cols-2 sm:max-w-3xl lg:grid-cols-4 lg:max-w-none items-start">
            {/* #1 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
            >
              <img className="mb-3" src={MailchimpLogo} alt="Icon 01" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white text-left">
                Mailchimp
              </h3>
              <div className="text-white text-opacity-80 text-left">
                Create your mailing list in an instant and connect with your
                fans like never before.
              </div>
            </div>

            {/* #2 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <img className="mb-3" src={Party} alt="Icon 02" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white text-left">
                Skiddle & Events
              </h3>
              <div className="text-white text-opacity-80 text-left">
                With Stripe and Skiddle, sell your services to anyone at
                anytime.
              </div>
            </div>

            {/* #3 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img className="mb-3" src={SpotifyLogo} alt="Icon 03" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white text-left">
                Spotify & Soundcloud
              </h3>
              <div className="text-white text-opacity-80 text-left">
                All your music, available to anyone on the same page.
              </div>
            </div>

            {/* #4 */}
            <div
              className="relative p-5 before:opacity-0 hover:before:opacity-20 before:absolute before:inset-0 before:rounded before:bg-gradient-to-tr before:from-white before:to-white/25 before:shadow-xl before:transition-all before:duration-150 before:ease-in-out"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <img className="mb-3" src={YoutubeLogo} alt="Icon 04" />
              <h3 className="font-cabinet-grotesk font-bold text-lg text-white text-left">
                Youtube
              </h3>
              <div className="text-white text-opacity-80 text-left">
                Embed your youtube videos, sets and more.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
