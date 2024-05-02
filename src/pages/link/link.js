import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaLink } from "react-icons/fa";

import style from "./link.module.css";
import { getWebsiteLogo } from "./websiteLogos";
import UserService from "../../request-model/services/user.service";
import EditBanner from "./edit/edit-banner/editBanner";

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
      <div className={style.profileDataBox}>
        <div className={style.profileDataBoxHeading}>
          {heading}
          <button
            className={style.copyLink}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              props.successCallback("Copied link to clipboard!");
            }}
          >
            <FaLink className={style.copyLinkIcon} />
            <p>Copy link</p>
          </button>
        </div>

        <div className={style.username}>@{props.state.username}</div>

        <div className={style.profileDataBoxSubheading}>{subheading}</div>
        <div className={style.profileDataBoxArtistType}>
          {props.state.artistType}
        </div>
        <div className={style.profileDataBoxSocialMediaLinks}>
          <a href={`mailto:${props.state.email}`}>
            <div className={style.contact_me_button}>Contact Me</div>
          </a>
          {renderSocialMediaLinks()}
        </div>
      </div>
    );
  };

  const profileImageBlock = (headerImage) => {
    if (!headerImage) {
      return <div className={style.header_image}></div>;
    } else if (headerImage) {
      return (
        <img src={headerImage} alt="profile" className={style.heading_image} />
      );
    } else {
      return (
        <img
          src="/pictures/temp/profile.png"
          alt="profile"
          className={style.heading_image}
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
          className={style.events_block}
        >
          Events
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
        <NavLink to={`/book/${props.state.username}`} className={style.link}>
          <div className={style.bookings_block} data-testid="booking-item">
            Bookings
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
    const blockSize = 4;

    let numberOfBlocks = Math.ceil(links.length / blockSize);

    let blocks = [];
    for (let i = 0; i < numberOfBlocks; i++) {
      let linksInBlock = links.slice(i * blockSize, (i + 1) * blockSize);

      let blockContent = linksInBlock.map((link) => (
        <a
          href={link.url}
          className={style.link}
          target="_blank"
          rel="noreferrer"
          key={link.id}
        >
          <div className={style.link_item} data-testid="link-item">
            {renderLinkImage(link.url)}
            <FaLink className={style.link_icon} /> {link.content}
          </div>
        </a>
      ));

      blocks.push(blockContent);
    }

    return blocks.map((block) => (
      <div className={style.links_block}>
        <div className={style.links_block_inner}>{block}</div>
      </div>
    ));
  };

  const spotifyBlock = (links) => {
    // render in blocks of 3
    const blockSize = 3;

    let numberOfBlocks = Math.ceil(links.length / blockSize);

    let blocks = [];
    for (let i = 0; i < numberOfBlocks; i++) {
      let linksInBlock = links.slice(i * blockSize, (i + 1) * blockSize);

      let blockContent = linksInBlock.map((link) => (
        <div data-testid="spotify-link">
          {link.isArtist ? (
            <iframe
              className={style.spotify_embed}
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
              className={style.spotify_embed}
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
      <div className={style.spotify_links_block}>
        <div className={style.spotify_links_block_inner}>{block}</div>
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
              <div className={style.youtube_title}>{video.content}</div>
              <div className={style.underline}></div>
              <div className={style.embed_container}>
                <iframe
                  className={style.youtube_embed}
                  src={`https://www.youtube.com/embed/${video.embed_id}`}
                  width="100%"
                  frameBorder="0"
                  allowfullscreen=""
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="youtube"
                ></iframe>
              </div>
            </>
          ) : (
            <>
              <div className={style.youtube_title}>{video.content}</div>
              <div className={style.underline}></div>
              <div className={style.embed_container}>
                <iframe
                  className={style.youtube_embed}
                  src={`https://www.youtube.com/embed/${video.embed_id}`}
                  width="100%"
                  frameBorder="0"
                  allowfullscreen=""
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
      <div className={style.youtube_links_block}>{block}</div>
    ));
  };

  const soundcloudBlock = (links) => {
    // render in blocks of 3
    const blockSize = 3;

    let numberOfBlocks = Math.ceil(links.length / blockSize);

    let blocks = [];
    for (let i = 0; i < numberOfBlocks; i++) {
      let linksInBlock = links.slice(i * blockSize, (i + 1) * blockSize);

      let blockContent = linksInBlock.map((link) => (
        <div data-testid="soundcloud-link">
          {link.isArtist ? (
            <iframe
              className={style.soundcloud_embed}
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
              className={style.soundcloud_embed}
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
      <div className={style.soundcloud_links_block}>{block}</div>
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
      <div className={style.mailing_list_block}>
        <div className={style.mailing_list_block_header}>
          Subscribe to their mailing list!
        </div>
        <div className={style.mailing_list_block_content}>
          <div className={style.mailing_list_item}>
            {!subscribed ? (
              <>
                <input
                  className={style.mailing_list_input}
                  type="email"
                  placeholder="Email Address"
                  value={mailingListInput}
                  onChange={handleMailListEmailChange}
                />
                <button
                  className={style.mailing_list_button}
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
    <div className={style.profile}>
      <EditBanner canEdit={props.editable} />
      {!props.pageLoading && (
        <div className={style.profile_content}>
          <div
            className={
              style.profile_container_uneven +
              " " +
              profile_container_uneven_full
            }
          >
            {profileDataBox(
              props.state.header,
              props.state.subheading,
              props.socialMediaIconLinks
            )}

            {profileImageBlock(props.state.headerImage)}
          </div>

          <div className={style.profile_container}>
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
