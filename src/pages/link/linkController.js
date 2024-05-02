import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserService from "../../request-model/services/user.service";
import { getWebsiteLogo } from "./websiteLogos";
import Profile from "./link";

const stateValues = {
  linkpageId: 1,
  userId: undefined,
  username: "",
  header: "",
  subheading: "",
  headerImage: undefined,
  email: "",
};

function ProfileController(props) {
  const [editable, setEditable] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  let params = useParams();

  const [state, setState] = useState(stateValues);

  let navigate = useNavigate();

  const [links, setLinks] = useState([]);
  const [socialMediaIconLinks, setSocialMediaIconLinks] = useState([]);
  const [spotifyLinks, setSpotifyLinks] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [soundcloudLinks, setSoundcloudLinks] = useState([]);
  const [skiddleLinks, setSkiddleLinks] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [bookingModule, setBookingModule] = useState([]);

  useEffect(() => {
    const fetchEmailLists = async () => {
      try {
        const respEmailLists = await UserService.getMailchimpLists();
        if (respEmailLists.status === 200) {
          setEmailList(respEmailLists.data.lists);
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          setEmailList([]);
        } else {
          console.log("error: ", error);
        }
      }
    };
    const fetchBookingModule = async (userId) => {
      try {
        const respBookingModule = await UserService.getStripeConnection(userId);
        if (respBookingModule.data.is_active) {
          setBookingModule([respBookingModule.data]);
        } else {
          setBookingModule([]);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          props.errorCallback("Can't access resource - Unauthorised");
          navigate("/");
        }
        if (error?.response?.status === 404) {
          setBookingModule([]);
        }
      }
    };

    const fetchLinkpage = async () => {
      // send request to fetch links from backend given the username
      try {
        const respLinks = await UserService.getLinkpage(params.username);
        if (respLinks.status === 200) {
          // check if the page is visible or not
          if (respLinks.data.user.is_visible === false) {
            navigate("/");
          }
          const isDarkMode = respLinks.data?.is_dark_mode;
          if (isDarkMode === true) {
            document.documentElement.setAttribute("data-theme", "dark");
          } else {
            document.documentElement.setAttribute("data-theme", "light");
          }

          // set state variables
          setState((stateValues) => ({
            ...stateValues,
            linkpageId: respLinks.data.id,
            userId: respLinks.data.user.id,
            header: respLinks.data.header,
            subheading: respLinks.data.description,
            username: params?.username,
            headerImage: respLinks.data.profilePicture,
            isArtist: respLinks.data.user.is_artist,
            isApproved: respLinks.data.user.is_approved,
            is_active: respLinks.data.user.is_active,
            artistType: respLinks.data.user.artist_type,
            email: respLinks.data.user.email,
          }));

          // set links
          let socialMediaLinks = [];
          let links = [];
          let soundcloudLinks = [];
          let spotifyLinks = [];
          let youtubeLinks = [];
          let skiddleLinks = [];

          for (let i = 0; i < respLinks.data.links.length; i++) {
            let uncatagorisedLink = respLinks.data.links[i];

            // divide the links to their types
            if (uncatagorisedLink.type === "link") {
              if (getWebsiteLogo(uncatagorisedLink.url) !== undefined) {
                socialMediaLinks.push(uncatagorisedLink);
              } else {
                links.push(uncatagorisedLink);
              }
            } else if (uncatagorisedLink.type === "soundcloud") {
              soundcloudLinks.push(uncatagorisedLink);
            } else if (uncatagorisedLink.type === "spotify") {
              spotifyLinks.push(uncatagorisedLink);
            } else if (uncatagorisedLink.type === "youtube") {
              youtubeLinks.push(uncatagorisedLink);
            } else if (uncatagorisedLink.type === "skiddle") {
              skiddleLinks.push(uncatagorisedLink);
            }
          }

          setLinks(links);
          setSocialMediaIconLinks(socialMediaLinks);
          setSpotifyLinks(spotifyLinks);
          setYoutubeLinks(youtubeLinks);
          setSoundcloudLinks(soundcloudLinks);
          setSkiddleLinks(skiddleLinks);

          await fetchBookingModule(respLinks.data.user.id);

          setEditable(await UserService.canEditLinkpage(params.username));
        }
      } catch (error) {
        console.log("error: ", error);

        if (error?.response?.status === 401) {
          props.errorCallback("Can't access resource - Unauthorised");
          navigate("/");
        } else {
          props.errorCallback("User's page does not exist");
          navigate("/");
        }
      }
      // if the username is not found, redirect to 404 page

      // if the username is found, set the links to the state
    };

    const fetchData = async () => {
      setPageLoading(true);

      try {
        await fetchLinkpage();
      } catch (error) {
        console.log("error: ", error);
      }
      try {
        await fetchEmailLists();
      } catch (error) {
        console.log("error: ", error);
      }

      setPageLoading(false);
    };
    fetchData();
  }, [params.username, navigate, props]);

  return (
    <Profile
      state={state}
      socialMediaIconLinks={socialMediaIconLinks}
      links={links}
      spotifyLinks={spotifyLinks}
      youtubeLinks={youtubeLinks}
      soundcloudLinks={soundcloudLinks}
      skiddleLinks={skiddleLinks}
      emailList={emailList}
      bookingModule={bookingModule}
      editable={editable}
      pageLoading={pageLoading}
      successCallback={props.successCallback}
      errorCallback={props.errorCallback}
    />
  );
}

export default ProfileController;
