import api from "./api";
import TokenService from "./token.service";

// linkpage routes
const getLinkpage = (username) => {
  return api.get("/linkpage/" + username);
};
const getLinkpageById = (id) => {
  return api.get(`/linkpages/${id}/`);
};
// getAllLinkpages is used for admin
const getAllLinkpages = () => {
  return api.get("/linkpages/");
};

// get all ratings that a user has made
const getAllRatings = () => {
  return api.get("/ratings/");
};

// user takes in the userId of the person who is doing the rating
const createRating = (userId, bookingId, artistId, rating) => {
  return api.post("/ratings/", {
    rating: rating,
    booking: bookingId,
    user: userId,
    artist: artistId,
  });
};

const updateLinkPage = (
  userId,
  linkpageId,
  headerImage,
  header,
  subheading,
  isDarkMode,
  config
) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "multipart/form-data",
  };
  var data = new FormData();
  data.append("header", header);
  data.append("description", subheading);
  data.append("is_dark_mode", isDarkMode);

  if (headerImage?.preview) {
    data.append("pageImage", headerImage);
  }

  return api.put("/linkpages/" + userId + "/", data, config);
};

/* link routes */

// Link
const deleteLink = (id) => {
  return api.delete("/links/" + id + "/");
};

const addLink = (content, type, url, linkpage, index) => {
  const data = {
    content: content,
    type: type,
    url: url,
    linkpage: linkpage,
    index: index,
  };

  return api.post("/links/", data);
};

const updateLink = (linkId, content, url, index, linkpageId, type) => {
  return api.put("/links/" + linkId + "/", {
    content: content,
    url: url,
    index: index,
    linkpage: linkpageId,
    type: type,
  });
};

// email embed component

// connect with mailchimp
const connectMailchimp = () => {
  return api.post("/connections/mailchimp");
};

// get mailchimp lists
const getMailchimpLists = () => {
  return api.get("/connections/mailchimp/lists");
};

// update
const updateMailchimpList = (listId, isActive) => {
  return api.put("/connections/mailchimp", {
    list_id: listId,
    is_active: isActive,
  });
};

const deleteMailchimp = () => {
  return api.delete("/connections/mailchimp");
};
const subscribeToMailchimp = (email, newsletterUserId) => {
  return api.post(`/connections/mailchimp/subscribe/${newsletterUserId}`, {
    email_address: email,
  });
};

const canEditLinkpage = async (username) => {
  if (TokenService.getUser()?.username === username) {
    return true;
  } else {
    return false;
  }
};

// stripe
const connectStripe = (userId) => {
  /////////////////////////////
  return api.post(`/connections/stripe/${userId}`);
};

const getStripeConnection = (userId) => {
  return api.get(`/connections/stripe/${userId}`);
};

// stripe manage account
const manageStripeAccount = (userId) => {
  return api.get(`/connections/stripe/manage`);
};

const setStripeConnection = (userId, serviceInfo, isActive) => {
  ////////////////////////////
  return api.put(`/connections/stripe/${userId}`, {
    service_info: serviceInfo,
    is_active: isActive,
  });
};

const checkOnboarded = () => {
  return api.get("/connections/stripe/handle_onboarding");
};

// stripe onboard account
const onboardStripeAccount = () => {
  return api.get("/connections/stripe/authenticate");
};

const UserService = {
  getLinkpage,
  getLinkpageById,
  getAllLinkpages,
  updateLinkPage,
  getAllRatings,
  createRating,

  addLink,
  deleteLink,
  updateLink,

  connectMailchimp,
  getMailchimpLists,
  updateMailchimpList,
  deleteMailchimp,
  subscribeToMailchimp,

  connectStripe,
  getStripeConnection,
  setStripeConnection,
  checkOnboarded,
  onboardStripeAccount,
  manageStripeAccount,

  canEditLinkpage,
};

export default UserService;
