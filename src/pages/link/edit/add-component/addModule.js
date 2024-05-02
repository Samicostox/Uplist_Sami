import React, { useEffect, useRef } from "react";
import style from "./addModule.module.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import AddLinkForm from "./addLinkForm/AddLinkForm";
import { createTheme } from "@mui/material/styles";
import { useOutSideClickAlert } from "../../../../components/hooks/outsideClickHook";

import { ThemeProvider } from "@mui/material/styles";
import AddSpotifyForm from "./addSpotifyForm/AddSpotifyForm";
import AddSoundcloudForm from "./addSoundcloudForm/AddSoundcloudForm";
import AddEmailForm from "./addEmailForm/AddEmailForm";
import AddYoutubeForm from "./addYoutubeForm/AddYoutubeForm";
import AddSkiddleForm from "./addSkiddleForm/AddSkiddleForm";
import AddBookingForm from "./addBookingForm/AddBookingForm";

function AddModule(props) {
  const [tabValue, setTabValue] = React.useState(0);
  const [changed, setChanged] = React.useState("none");

  const handleTabChange = (e, newValue) => {
    if (newValue > tabValue) {
      setChanged("left");
    } else if (newValue < tabValue) {
      setChanged("right");
    }

    setTabValue(newValue);
  };

  const wrapperRef = useRef(null);
  useOutSideClickAlert(wrapperRef, props.onClose);

  useEffect(() => {}, []);

  const tabsTheme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          root: {},
          scrollButtons: {
            "@media (max-width: 599.95px)": {
              display: "inline-flex",
            },
            color: "black",
          },
        },
      },
    },
  });

  return (
    <div className={style.add_container} data-testid="add-module">
      <div ref={wrapperRef} className={style.add}>
        <div className={style.add_tabs}>
          <ThemeProvider theme={tabsTheme}>
            <Tabs
              className={style.tabs}
              value={tabValue}
              onChange={handleTabChange}
              aria-label=""
              centered={true}
              variant="scrollable"
              scrollButtons={true}
            >
              <Tab value={0} label="Link" />
              <Tab value={1} label="Spotify" />
              <Tab value={2} label="Soundcloud" />
              <Tab value={3} label="Email" />
              <Tab value={4} label="Youtube" />
              <Tab value={5} label="Skiddle" />
              <Tab value={6} label="Booking" />
            </Tabs>
          </ThemeProvider>
        </div>
        <div className={style.add_form}>
          {tabValue === 0 && (
            <AddLinkForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              linkpageId={props.linkpageId}
              nextIndex={props.nextIndex}
              onAddCallback={props.onAddCallback}
              changed={changed}
            />
          )}
          {tabValue === 1 && (
            <AddSpotifyForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              linkpageId={props.linkpageId}
              nextIndex={props.nextIndex}
              onAddCallback={props.onAddCallback}
              changed={changed}
            />
          )}
          {tabValue === 2 && (
            <AddSoundcloudForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              linkpageId={props.linkpageId}
              nextIndex={props.nextIndex}
              onAddCallback={props.onAddCallback}
              changed={changed}
            />
          )}
          {tabValue === 3 && (
            <AddEmailForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              linkpageId={props.linkpageId}
              nextIndex={props.nextIndex}
              onAddCallback={props.onAddCallback}
              changed={changed}
            />
          )}
          {tabValue === 4 && (
            <AddYoutubeForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              linkpageId={props.linkpageId}
              nextIndex={props.nextIndex}
              onAddCallback={props.onAddCallback}
              changed={changed}
            />
          )}
          {tabValue === 5 && (
            <AddSkiddleForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              linkpageId={props.linkpageId}
              nextIndex={props.nextIndex}
              onAddCallback={props.onAddCallback}
              changed={changed}
            />
          )}
          {tabValue === 6 && (
            <AddBookingForm
              successCallback={props.successCallback}
              errorCallback={props.errorCallback}
              onClose={props.onClose}
              userId={props.userId}
              nextIndex={props.nextIndex}
              onAddCallback={props.onAddCallback}
              changed={changed}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default AddModule;
