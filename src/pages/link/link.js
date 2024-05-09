import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaLink } from "react-icons/fa";

import style from "./link.module.css";
import { getWebsiteLogo } from "./websiteLogos";
import UserService from "../../request-model/services/user.service";
import EditBanner from "./edit/edit-banner/editBanner";
import shadergradient from "./shadergradient2.gif";
import background from "./background.gif";

function Profile(props) {
  const renderLinkImage = (url) => {
    const imageUrl = getWebsiteLogo(url);

    if (imageUrl !== undefined) {
      return (
        <img src={imageUrl} alt="link" className={style.link_image_item} />
      );
    }
  };

  const renderSocialMediaLinks = () => {
    return (
      <>
        {props.socialMediaIconLinks.map((link) => (
          <>
            <a href={link.url} target="_blank" rel="noreferrer" key={link.id}>
              <div
                className={style.social_media_link_item}
                data-testid="social-media-icon"
              >
                <img
                  className={style.social_media_link_image}
                  src={getWebsiteLogo(link.url)}
                  alt={link.url}
                />
              </div>
            </a>
          </>
        ))}
      </>
    );
  };

  const profileDataBox = (heading, subheading, socialMediaIconLinks) => {
    return (
      <div className="w-full shadow-md h-80 max-w-2xl bg-white  border-[var(--overlay-3)] rounded-lg p-6 box-border m-auto overflow-hidden text-ellipsis break-words flex justify-center flex-col">
        <div className="pb-2 font-medium text-5xl text-left w-full overflow-hidden text-ellipsis flex items-center justify-between">
          {heading}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              props.successCallback("Copied link to clipboard!");
            }}
            className="px-4 py-2 mr-2 rounded-md border border-black bg-white text-neutarl-700 flex justify-between items-center text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            <FaLink className="m-0 ml-1 font-medium mr-2" />
            <p className="">Copy link</p>
          </button>
        </div>
        <div className="flex items-center">
          <div className="text-xl flex text-gray-400 font-mono font-medium pr-5">
            @{props.state.username}
          </div>
          <span className="inline-flex max-w-20 items-center gap-x-1.5 rounded-md bg-indigo-100 px-2 py-1 text-sm md:text-md font-medium text-indigo-700">
            <svg
              className="h-1.5 w-1.5 fill-indigo-500"
              viewBox="0 0 6 6"
              aria-hidden="true"
            >
              <circle cx={3} cy={3} r={3} />
            </svg>
            {props.state.artistType}
          </span>
        </div>

        <div className="w-full max-h-20 mt-5 pb-2 pr-14 font-medium text-gray-800 text-xl text-left  text-ellipsis">
          {subheading}
        </div>

        <div className={style.profileDataBoxSocialMediaLinks}>
          <a href={`mailto:${props.state.email}`}>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
              Contact Me
            </button>
          </a>
          {renderSocialMediaLinks()}
        </div>
      </div>
    );
  };

  const profileImageBlock = (headerImage) => {
    if (!headerImage) {
      return (
        <div className="max-h-24 rounded-lg shadow-md m-auto bg-[var(--overlay-2)]"></div>
      );
    } else if (headerImage) {
      return (
        <img
          src={headerImage}
          alt="profile"
          className="h-80 rounded-lg shadow-md m-auto bg-[var(--overlay-2)]"
        />
      );
    } else {
      return (
        <img
          src="/pictures/temp/profile.png"
          alt="profile"
          className="h-80 rounded-lg shadow-md m-auto bg-[var(--overlay-2)]"
        />
      );
    }
  };

  const eventsBlock = () => {
    if (props.skiddleLinks.length > 0) {
      return (
        <a
          href={props.skiddleLinks[0].url}
          target="_blank"
          rel="noreferrer"
          className="w-full bg-black no-underline rounded-md shadow-lg  flex flex-col justify-center items-center text-center text-2xl text-[var(--white-color)] font-medium transition duration-200 ease-in-out hover:cursor-pointer"
        >
          <div class="relative max-h-40 mx-auto">
            <img
              class=" w-[490px] max-h-40 object-cover rounded-md"
              src="/pictures/link/event.jpeg"
              alt="Booking an event"
            ></img>
            <div class="absolute inset-0 bg-gray-700 opacity-70 rounded-md"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <h2 class="text-white text-3xl font-medium">View our Events</h2>
            </div>
          </div>
        </a>
      );
    }
  };

  const bookingsBlock = () => {
    // bookable if is artist and is approved

    if (
      props.bookingModule.length > 0 &&
      props.bookingModule[0].is_active &&
      props.state.isArtist &&
      props.state.isApproved &&
      props.state.is_active
    ) {
      return (
        <NavLink to={`/book/${props.state.username}`}>
          <div class="relative max-h-40 mx-auto">
            <img
              class=" w-[490px] max-h-40 object-cover rounded-md"
              src="/pictures/link/booking.jpeg"
              alt="Booking an event"
            ></img>
            <div class="absolute inset-0 bg-gray-700 opacity-70 rounded-md"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <h2 class="text-white text-3xl font-medium">Make a Booking</h2>
            </div>
          </div>
        </NavLink>
      );
    } else {
      return <></>;
    }
  };

  const investBlock = () => {
    return <div className={style.invest_block}>Invest</div>;
  };

  const linksBlock = (links) => {
    // render in blocks of 4
    const blockSize = 1;

    let numberOfBlocks = Math.ceil(links.length / blockSize);

    let blocks = [];
    for (let i = 0; i < numberOfBlocks; i++) {
      let linksInBlock = links.slice(i * blockSize, (i + 1) * blockSize);

      let blockContent = linksInBlock.map((link) => (
        <a
          href={link.url}
          className="no-underline text-[var(--overlay-12)]  flex"
          target="_blank"
          rel="noreferrer"
          key={link.id}
        >
          <div
            className="h-16 w-full rounded-md pl-8 bg-white text-[var(--font-color-1)] text-lg leading-[6.1rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis flex items-center transition duration-200 ease-in-out"
            data-testid="link-item"
          >
            {renderLinkImage(link.url)}
            <FaLink className="" /> {link.content}
          </div>
        </a>
      ));

      blocks.push(blockContent);
    }

    return blocks.map((block) => (
      <div className=" w-full bg-[var(--overlay-3)] rounded-lg border-2 border-[var(--overlay-3)] block">
        <div className="">{block}</div>
      </div>
    ));
  };

  const spotifyBlock = (links) => {
    // render in blocks of 3
    const blockSize = 1;

    let numberOfBlocks = Math.ceil(links.length / blockSize);

    let blocks = [];
    for (let i = 0; i < numberOfBlocks; i++) {
      let linksInBlock = links.slice(i * blockSize, (i + 1) * blockSize);

      let blockContent = linksInBlock.map((link) => (
        <div data-testid="spotify-link">
          {link.isArtist ? (
            <iframe
              className="w-full h-[9.48rem]   rounded-lg overflow-y-hidden"
              src={`https://open.spotify.com/embed/artist/${link.embed_id}?utm_source=generator&theme=0`}
              width="100%"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="spotify"
            ></iframe>
          ) : (
            <iframe
              className="w-full h-[9.48rem]   rounded-lg overflow-y-hidden"
              src={`https://open.spotify.com/embed/track/${link.embed_id}?utm_source=generator&theme=0`}
              width="100%"
              frameBorder="0"
              allowfullscreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="spotify"
            ></iframe>
          )}
        </div>
      ));

      blocks.push(blockContent);
    }

    return blocks.map((block) => (
      <div className="w-full rounded-lg overflow-hidden">
        <div className=" rounded-lg shadow-md">{block}</div>
      </div>
    ));
  };

  const youtubeBlock = (videos) => {
    // render in blocks of 3
    const blockSize = 1;

    let numberOfBlocks = Math.ceil(videos.length / blockSize);

    let blocks = [];
    for (let i = 0; i < numberOfBlocks; i++) {
      let linksInBlock = videos.slice(i * blockSize, (i + 1) * blockSize);

      let blockContent = linksInBlock.map((video) => (
        <div data-testId="youtube-link">
          {video.isArtist ? (
            <>
              <div class="w-full">
                <iframe
                  class="w-full aspect-video  rounded-lg"
                  src={`https://www.youtube.com/embed/${video.embed_id}`}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="youtube"
                ></iframe>
              </div>
            </>
          ) : (
            <>
              <div class="w-full">
                <iframe
                  class="w-full aspect-video  rounded-lg"
                  src={`https://www.youtube.com/embed/${video.embed_id}`}
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="youtube"
                ></iframe>
              </div>
            </>
          )}
        </div>
      ));

      blocks.push(blockContent);
    }

    return blocks.map((block) => (
      <div className="rounded-lg bg-[var(--overlay-3)] shadow-lg ">{block}</div>
    ));
  };

  const soundcloudBlock = (links) => {
    // render in blocks of 3
    const blockSize = 1;

    let numberOfBlocks = Math.ceil(links.length / blockSize);

    let blocks = [];
    for (let i = 0; i < numberOfBlocks; i++) {
      let linksInBlock = links.slice(i * blockSize, (i + 1) * blockSize);

      let blockContent = linksInBlock.map((link) => (
        <div data-testid="soundcloud-link">
          {link.isArtist ? (
            <iframe
              className="w-full h-[9.47rem] border-2 border-gray-200 rounded-lg  "
              loading="lazy"
              scrolling="no"
              width="100%"
              frameborder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=https://soundcloud.com/${link.embed_id}&color=%235e676a&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`}
              title="soundcloud"
            ></iframe>
          ) : (
            <iframe
              className="w-full h-[9.47rem] border-2 border-gray-200 rounded-lg  "
              loading="lazy"
              scrolling="no"
              width="100%"
              frameborder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=https://soundcloud.com/${link.embed_id}&color=%235e676a&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=true`}
              title="soundcloud"
            ></iframe>
          )}
        </div>
      ));

      blocks.push(blockContent);
    }

    return blocks.map((block) => (
      <div className="w-full  overflow-hidden rounded-lg shadow-lg">
        {block}
      </div>
    ));
  };

  const [mailingListInput, setMailingListInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const mailingListBlock = () => {
    const handleMailListEmailChange = (e) => {
      setMailingListInput(e.target.value);
    };

    const onSubscribe = async () => {
      try {
        let resp = await UserService.subscribeToMailchimp(
          mailingListInput,
          props.state.userId
        );

        if (resp.status === 204) {
          props.successCallback("Subscribed to mailing list!");
          setSubscribed(true);
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          props.errorCallback("Failed to subscribe to mailing list");
        } else if (err.response.status === 404) {
          props.errorCallback("No mailing list found");
        } else {
          props.errorCallback("Something went wrong, please try again later");
        }
      }
    };

    if (props.emailList.length === 0) {
      return <></>;
    }
    return (
      <div className="w-[490px] rounded-lg shadow-lg bg-white bg-cover bg-center justify-center items-center text-left text-[var(--white-color)] transition duration-200 ease-in-out">
        <div className="text-left pt-5 pl-5 pb-2 text-2xl font-medium text-[var(--font-color-1)]">
          Subscribe to their mailing list!
        </div>
        <div className="">
          <div className="flex justify-center w-full">
            {!subscribed ? (
              <>
                <input
                  className="w-[70%] h-15 rounded-lg border-2 pl-4 text-lg leading-[60px] -mr-2 font-medium text-black transition duration-200 ease-in-out"
                  type="email"
                  placeholder="Email Address"
                  value={mailingListInput}
                  onChange={handleMailListEmailChange}
                />
                <button
                  className="px-6 h-10 py-2 bg-blue-500 text-white rounded-r-lg font-bold transform "
                  onClick={onSubscribe}
                >
                  Subscribe
                </button>
              </>
            ) : (
              <>
                <div className={style.mailing_list_subscribed}>
                  Thank you for subscribing!
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const profile_container_uneven_full = props.state.headerImage
    ? ""
    : style.full;
  return (
    <div
      className="pt-20"
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <EditBanner canEdit={props.editable} />
      {!props.pageLoading && (
        <div className={style.profile_content}>
          <div className="max-w-[1000px] px-2 pt-8 pb-4 m-auto grid items-center lg:grid-cols-[1.8fr_1fr] grid-cols-1 gap-5 row-gap-0 box-content">
            <div className="order-2 lg:order-1">
              {profileDataBox(
                props.state.header,
                props.state.subheading,
                props.socialMediaIconLinks
              )}
            </div>
            <div className="order-1 lg:order-2">
              {profileImageBlock(props.state.headerImage)}
            </div>
          </div>

          <div className="w-[1000px] px-2 pt-8 pb-4 mx-auto grid items-start grid-cols-[1fr_1fr] gap-5 box-content">
            {bookingsBlock()}

            {mailingListBlock()}

            {eventsBlock()}

            {soundcloudBlock(props.soundcloudLinks)}

            {linksBlock(props.links)}

            {spotifyBlock(props.spotifyLinks)}

            {youtubeBlock(props.youtubeLinks)}

            {/* {investBlock()} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
