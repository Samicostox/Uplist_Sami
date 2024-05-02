export const getWebsiteLogo = (website) => {
  // create a module for each supported website

  //extract the domain name from the url
  // remove hhtps:// if it exists

  website = website.replace("https://", "");

  var domain = website.split("/")[0];

  domain.replace("/", "");

  if (domain === "www.github.com") {
    // return path to local logo
    return "pictures/media-icons/github.svg";
  } else if (domain === "www.facebook.com") {
    // return path to local logo
    return "/pictures/media-icons/facebook.svg";
  } else if (domain === "www.twitter.com") {
    // return path to local logo
    return "/pictures/media-icons/twitter.svg";
  } else if (domain === "www.instagram.com") {
    // return path to local logo
    return "/pictures/media-icons/instagram.svg";
  } else if (domain === "www.youtube.com") {
    // return path to local logo
    return "/pictures/media-icons/youtube.svg";
  } else {
    // return path to local logo
    return undefined;
  }
};
