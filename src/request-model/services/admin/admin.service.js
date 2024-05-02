import api from '../api';



// admin routes
const banUser = (userId) => {
    return api.post(`users/ban/${userId}`,{
        user_id: userId,
    })
}

const makeAdmin = (userId) => {
    return api.post(`users/promote/${userId}`,{
        user_id: userId,
    })
}
const demoteAdmin = (userId) => {
    return api.post(`users/demote/${userId}`,{
        user_id: userId,
    })
}

// new artist approval
const approveUser = (userId) => {
    return api.post(`users/approve/${userId}`,{
        user_id: userId,
    })
}

const rejectUser = (userId) => {
    return api.post(`users/reject/${userId}`,{
        user_id: userId,
    })
}

const refundAdminComfirm = (booking_id) => {
    return api.post(`bookings/${booking_id}/refund/`,{
        booking_id: booking_id,
    })
}



const AdminService = {
    banUser,
    approveUser,
    rejectUser,
    makeAdmin,
    demoteAdmin,
    refundAdminComfirm,
    
    
}

export default AdminService;