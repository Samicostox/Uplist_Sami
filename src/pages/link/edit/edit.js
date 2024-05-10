import React from "react";
import style from "../link.module.css";
import { useState } from "react";
import formStyle from "./edit.module.css";
import AddModule from "./add-component/addModule";
import GetImageFile from "../../../components/getImageFile/getImageFile";
import SaveBanner from "../../../components/saveBanner/saveBanner";
import EditModule from "./update-component/editModule";
import { FaLink, FaPlusCircle } from "react-icons/fa";
import link from "./link.svg";
import Toggle from "./toggle_dark_mode";
import uplist from "./logo-uplist.png";
import mailchimp from "./logo-mailchimp.jpg";
import logospotify from "./logo-spotify.png";
import logoskiddle from "./logo-skiddle.png";
import logoyoutube from "./logo-youtube.webp";
import logosoundcloud from "./logo-soundcloud.png";

function Edit(props) {
  const renderProfileImage = () => {
    if (props.form.headerImage) {
      if (props.form.headerImage.preview) {
        return (
          <img
            src={props.form.headerImage.preview}
            alt="profile"
            className="h-80 rounded-lg shadow-md m-auto bg-[var(--overlay-2)]"
          />
        );
      } else {
        return (
          <img
            src={props.form.headerImage}
            alt="profile"
            className="h-80 rounded-lg shadow-md m-auto bg-[var(--overlay-2)]"
          />
        );
      }
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

  const getNextIndex = () => {
    let maxIndex = -1;
    props.links.forEach((link) => {
      if (link.index > maxIndex) {
        maxIndex = link.index;
      }
    });
    return maxIndex + 1;
  };

  const renderLinks = (type, title) => {
    // count number of links of type
    const logo = {
      youtube: logoyoutube,
      spotify: logospotify,
      soundcloud: logosoundcloud,
      skiddle: logoskiddle,
      link: link,
    };

    let count = 0;
    props.links.forEach((link) => {
      if (link.type === type) {
        count++;
      }
    });

    return (
      <div className="">
        {count > 0 && <h1 className="text-2xl">{title}</h1>}
        {props.links.map(
          (link, index) =>
            link.type === type && (
              <>
                {props.editLink === props.links[index].id && (
                  <EditModule
                    link={props.links[index]}
                    onClose={() => props.setEditLink(-1)}
                    linkpageId={props.form.linkpageId}
                    nextIndex={getNextIndex()}
                    errorCallback={props.errorCallback}
                    successCallback={props.successCallback}
                    onDeleteCallback={props.onDelete}
                    onUpdateCallback={props.onUpdate}
                    userId={props.form.userId}
                  />
                )}

                <div
                  className="w-full max-w-[490px] bg-[var(--overlay-3)] mb-5 shadow-md pl-2 py-2 text-xl flex items-center justify-start rounded-md border-2 border-[var(--overlay-3)] cursor-pointer"
                  onClick={() => props.setEditLink(link.id)}
                  key={link.id}
                  data-testid="edit-link"
                >
                  {/* {" "} link indec: {link.index} link id: {link.id} */}
                  <div className="text-gray-400">
                    <img
                      src={logo[type]}
                      alt="profile"
                      className="h-12 mr-2 rounded-md bg-[var(--overlay-2)]"
                    />
                  </div>
                  {link.content}
                </div>
              </>
            )
        )}
      </div>
    );
  };

  const [editEmailLists, setEditEmailLists] = useState(false);
  const [editBookingModule, setEditBookingModule] = useState(false);
  const [edit_subheading, setEditSubheading] = useState(false);
  const [edit_heading, setEditHeading] = useState(false);
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
      //Write you validation logic here
    }
  };

  const renderEmailLists = (title) => {
    // count number of links of type

    return (
      <div className={formStyle.links}>
        {props.emailLists.length > 0 && (
          <>
            {editEmailLists && (
              <EditModule
                link={"email"}
                onClose={() => setEditEmailLists(false)}
                linkpageId={props.form.linkpageId}
                nextIndex={getNextIndex()}
                errorCallback={props.errorCallback}
                successCallback={props.successCallback}
                onDeleteCallback={props.onDelete}
                onUpdateCallback={props.onUpdate}
                data-testid="edit-module"
                userId={props.form.userId}
              />
            )}

            <div
              className="w-full max-w-[490px] bg-[var(--overlay-3)] shadow-md pl-2 py-2 text-xl flex items-center justify-start rounded-md border-2 border-[var(--overlay-3)] cursor-pointer"
              onClick={() => setEditEmailLists(true)}
            >
              <img
                src={mailchimp}
                alt="profile"
                className="h-12 mr-2 rounded-md bg-[var(--overlay-2)]"
              />
              Email Subscription Lists
              {/* {" "} link indec: {link.index} link id: {link.id} */}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderBookingModule = (title) => {
    return (
      <div className="w-full justify-items-start flex items-start">
        {props.bookingModule.length > 0 && (
          <>
            {editBookingModule && (
              <EditModule
                link={"booking"}
                onClose={() => setEditBookingModule(false)}
                linkpageId={props.form.linkpageId}
                nextIndex={getNextIndex()}
                errorCallback={props.errorCallback}
                successCallback={props.successCallback}
                onDeleteCallback={props.onDelete}
                onUpdateCallback={props.onUpdate}
                data-testid="edit-module"
                userId={props.form.userId}
              />
            )}

            <div
              className="w-full max-w-[490px] bg-[var(--overlay-3)] shadow-md pl-2 py-2 text-xl flex items-center justify-start rounded-md border-2 border-[var(--overlay-3)] cursor-pointer"
              onClick={() => setEditBookingModule(true)}
            >
              <img
                src={uplist}
                alt="profile"
                className="h-12 mr-4 rounded-md bg-[var(--overlay-2)]"
              />
              Manage Booking Feature
            </div>
          </>
        )}
      </div>
    );
  };

  const editProfileDataBox = (heading, subheading, socialMediaIconLinks) => {
    return (
      <div class="w-full max-w-2xl h-80 bg-[var(--overlay-3)] border-2 border-[var(--overlay-3)] rounded-lg p-6 mx-auto flex flex-col justify-start overflow-hidden">
        <div className="grid-col-1 font-size-20">
          <form onSubmit={props.handleSave}>
            <div class="max-w-sm space-y-3">
              <div>
                <label class="block text-2xl font-medium mb-2 dark:text-white">
                  Name
                </label>
                <div class="relative">
                  <input
                    class="py-3 px-4 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    type="text"
                    id="heading"
                    name="heading"
                    value={props.form.heading}
                    onChange={(event) =>
                      props.handleFormChange("heading", event.target.value)
                    }
                    placeholder="Heading"
                    onBlur={() => setEditHeading(false)}
                    autoFocus
                    onKeyDown={(e) => handleKeyPress(e)}
                  ></input>
                </div>
              </div>
            </div>

            <div class="max-w-m space-y-3 mb-5">
              <div>
                <label class="block text-2xl font-medium mb-2 dark:text-white">
                  Description
                </label>
                <div class="max-w-m space-y-3">
                  <textarea
                    class="sm:pb-6 py-3 px-4 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    type="text"
                    id="subheading"
                    name="subheading"
                    value={props.form.subheading}
                    onChange={(event) =>
                      props.handleFormChange("subheading", event.target.value)
                    }
                    placeholder="subheading"
                    onBlur={() => setEditSubheading(false)}
                    autoFocus
                    onKeyDown={(e) => handleKeyPress(e)}
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
          <Toggle />
        </div>
      </div>
    );
  };

  const editProfileImageBlock = () => {
    return (
      <div>
        {showGetImageFile && (
          <GetImageFile
            linkpageId={props.form.linkpageId}
            onClose={onGetImageFileClose}
            successCallback={props.successCallback}
            errorCallback={props.errorCallback}
            onUploadCallback={props.onGetImageFileUploadCallback}
          />
        )}

        <div className="relative">
          {renderProfileImage()}
          <div
            className="edit_icon_overlay justify-center items-center absolute top-0 bg-gray-400 rounded-md p-16 opacity-0 transition-opacity duration-500 ease-in-out box-border w-full h-full object-cover overflow-hidden hover:cursor-pointer hover:opacity-50 flex"
            onClick={() => {
              setShowGetImageFile(true);
            }}
            data-testid="edit-image-button"
          >
            <img
              src="https://www.svgrepo.com/show/33565/upload.svg"
              alt="edit"
              className="w-12 h-12"
            />
          </div>
        </div>
      </div>
    );
  };

  const dividerBlock = (text) => {
    return (
      <div className={formStyle.divider}>
        <div className={formStyle.divider_line}></div>
        <div className={formStyle.divider_text}>{text}</div>
        <div className={formStyle.divider_line}></div>
      </div>
    );
  };

  const editThemeBlock = () => {
    return <Toggle />;
  };

  const [renderAddComponent, setRenderAddComponent] = useState(false);

  const handleAddContentClicked = () => {
    // if the page is not saved, then ask the user to save
    if (props.saveState === "changed") {
      props.errorCallback("Please save your changes before adding new content");
    } else {
      setRenderAddComponent(true);
    }
  };

  const [showGetImageFile, setShowGetImageFile] = useState(false);
  const onGetImageFileClose = () => setShowGetImageFile(false);

  return (
    <div className="pt-20">
      {!props.loading && (
        <div className="">
          <SaveBanner saveCallback={props.handleSave} state={props.saveState} />
          <div className="">
            <div className="max-w-[1000px] px-2 pt-8  m-auto grid items-center lg:grid-cols-[1.8fr_1fr] grid-cols-1 gap-5 row-gap-0 box-content">
              {editProfileDataBox()}
              {editProfileImageBlock()}
            </div>
            <div className="w-[1000px] px-2 pt-4 pb-4 mx-auto grid justify-items-start items-start  grid-cols-1  gap-5 box-content">
              {renderAddComponent ? (
                <AddModule
                  onClose={() => setRenderAddComponent(false)}
                  linkpageId={props.form.linkpageId}
                  userId={props.form.userId}
                  nextIndex={getNextIndex()}
                  errorCallback={props.errorCallback}
                  successCallback={props.successCallback}
                  onAddCallback={props.onAddCallback}
                />
              ) : (
                <button
                  onClick={handleAddContentClicked}
                  className="px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                >
                  Add Content
                </button>
              )}
              <h1 className="text-4xl">Your Links</h1>

              <div className="w-[1000px]">
                {renderBookingModule("Booking Feature")}
              </div>
              <div className="w-[1000px]">
                {renderEmailLists("Mailing List")}
              </div>
              <div className="w-[1000px]">
                {renderLinks("link", "Custom Links")}
              </div>
              <div className="w-[1000px]">
                {renderLinks("spotify", "Spotify Links")}
              </div>
              <div className="w-[1000px]">
                {renderLinks("soundcloud", "Soundcloud Links")}
              </div>
              <div className="w-[1000px]">
                {renderLinks("youtube", "Youtube Links")}
              </div>
              <div className="w-[1000px]">
                {renderLinks("skiddle", "Skiddle Links")}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Edit;
