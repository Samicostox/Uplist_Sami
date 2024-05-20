import React, { useCallback, useRef } from "react";

import style from "./editModule.module.css";

import UpdateLinkForm from "./updateLinkForm/UpdateLinkForm";
import UpdateSpotifyForm from "./updateSpotifyForm/UpdateSpotifyForm";
import UpdateSoundcloudForm from "./updateSoundcloudForm/UpdateSoundcloudForm";
import UpdateYoutubeForm from "./updateYoutubeForm/UpdateYoutubeForm";
import UpdateEmailForm from "./updateEmailForm/UpdateEmailForm";
import UpdateBookingForm from "./updateBookingForm/UpdateBookingForm";

import { useOutSideClickAlert } from "../../../../components/hooks/outsideClickHook";
import UpdateSkiddleForm from "./updateSkiddleForm/UpdateSkiddleForm";

function EditModule(props) {
  const wrapperRef = useRef(null);
  useOutSideClickAlert(wrapperRef, props.onClose);

  const onSuccess = () => {
    props.successCallback("Link updated successfully");
  };
  const onDelete = useCallback(() => {
    props.successCallback("Link deleted successfully");
    props.onDeleteCallback();
  }, [props]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-30 flex justify-center items-center overflow-auto animate-fadeIn"
      data-testid="edit-module"
    >
      <div
        ref={wrapperRef}
        className="add absolute top-[20%] right-[5%] left-[5%] lg:right-[23%] lg:left-[23%] bg-white rounded-[10px] z-40 animate-slideIn p-[20px] pb-[30px] overflow-hidden"
      >
        <div className={style.edit_form}>
          {props.link.type === "link" && (
            <UpdateLinkForm
              successCallback={onSuccess}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              onUpdateCallback={props.onUpdateCallback}
              onDeleteCallback={onDelete}
              linkpageId={props.linkpageId}
              link={props.link}
            />
          )}
          {props.link.type === "spotify" && (
            <UpdateSpotifyForm
              successCallback={onSuccess}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              onUpdateCallback={props.onUpdateCallback}
              onDeleteCallback={onDelete}
              linkpageId={props.linkpageId}
              link={props.link}
            />
          )}
          {props.link.type === "soundcloud" && (
            <UpdateSoundcloudForm
              successCallback={onSuccess}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              onUpdateCallback={props.onUpdateCallback}
              onDeleteCallback={onDelete}
              linkpageId={props.linkpageId}
              link={props.link}
            />
          )}
          {props.link.type === "youtube" && (
            <UpdateYoutubeForm
              successCallback={onSuccess}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              onUpdateCallback={props.onUpdateCallback}
              onDeleteCallback={onDelete}
              linkpageId={props.linkpageId}
              link={props.link}
            />
          )}
          {props.link.type === "skiddle" && (
            <UpdateSkiddleForm
              successCallback={onSuccess}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              onUpdateCallback={props.onUpdateCallback}
              onDeleteCallback={onDelete}
              linkpageId={props.linkpageId}
              link={props.link}
            />
          )}
          {props.link === "email" && (
            <UpdateEmailForm
              successCallback={onSuccess}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              onUpdateCallback={props.onUpdateCallback}
              onDeleteCallback={onDelete}
              linkpageId={props.linkpageId}
            />
          )}
          {props.link === "booking" && (
            <UpdateBookingForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              onUpdateCallback={props.onUpdateCallback}
              onDeleteCallback={onDelete}
              userId={props.userId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default EditModule;
