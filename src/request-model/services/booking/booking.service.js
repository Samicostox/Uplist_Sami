import api from "../api";

// booking
const createBooking = (artistId) => {
  return api.post("/bookings/", {
    artist: artistId,
  });
};

const getBooking = (bookingId) => {
  return api.get(`/bookings/${bookingId}/`);
};

// get all bookings // this gets both outgoing, incoming enquiries, future bookings and booking history
// needs to be sorted seperately on client
const getAllBookings = () => {
  return api.get("/bookings/");
};

const getEnquiryForBooking = (enquiryId, bookingId) => {
  return api.get(`/bookings/${bookingId}/enquiry/${enquiryId}/`);
};

// enquiry
const createEnquiry = (
  master_booking,
  id,
  start_datetime,
  end_datetime,
  price,
  notes
) => {
  return api.post(`/bookings/${id}/create_enquiry/`, {
    master_booking: master_booking,
    price: price,
    start_datetime: start_datetime,
    end_datetime: end_datetime,
    notes: notes,
    is_counter_offer: false,
  });
};

//counter enquiry
const counterEnquiry = (
  master_booking,
  id,
  start_datetime,
  end_datetime,
  price,
  notes
) => {
  return api.post(`/bookings/${id}/create_enquiry/`, {
    master_booking: master_booking,
    price: price,
    start_datetime: start_datetime,
    end_datetime: end_datetime,
    notes: notes,
    is_counter_offer: true,
  });
};

// aprove booking
const approveBooking = (bookingId) => {
  return api.post(`/bookings/${bookingId}/approve/`);
};

// reject booking
const rejectBooking = (bookingId) => {
  return api.post(`/bookings/${bookingId}/reject/`);
};

// pay for a booking
const payBooking = (bookingId) => {
  return api.post(`/bookings/${bookingId}/pay/`);
};

const BookingService = {
  createBooking,
  createEnquiry,
  counterEnquiry,
  getAllBookings,
  getBooking,
  getEnquiryForBooking,
  approveBooking,
  rejectBooking,
  payBooking,
};

export default BookingService;
