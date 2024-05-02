import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom"
import TokenService from "../../request-model/services/token.service"
import UserService from "../../request-model/services/user.service"
import AdminService from "../../request-model/services//admin/admin.service"

import Admin from "./admin"
import BookingService from "../../request-model/services/booking/booking.service"





const AdminController = (props) => {
    const [loading, setLoading] = React.useState(false)
    const [unaprovedLinkpages, setUnaprovedLinkpages] = React.useState([])
    let navigate = useNavigate()

    const fetchData = useCallback( async () => {
        const token = TokenService.getUser()
        if (!token?.is_staff) {
            props.errorCallback("You are not authorized to view this page")
            navigate("/")
        } 
        setLoading(true)
        try{
            const resp = await UserService.getAllLinkpages()
            if (resp.status === 200){
                setUnaprovedLinkpages(resp.data.filter(linkpage => !linkpage?.user.is_approved))
            }
        }catch(err){
            console.log(err)
            if (err.response.status === 401){
                props.errorCallback("You are not authorized to view this page")
            }
        }

        setLoading(false)
    }, [navigate, props])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])    

    const [banUserSearchTerm, setBanUserSearchTerm] = React.useState("")
    const [banUserSearchResult, setBanUserSearchResults] = React.useState(undefined)
    const handleRemoveUserSearch = async (e) => {
        e.preventDefault()

        if (banUserSearchTerm === ""){
            props.errorCallback("Please enter a username")
            setBanUserSearchResults(undefined)
            return

        }

        try{ 
            const resp = await UserService.getLinkpage(banUserSearchTerm)
            if (resp.status === 200){
                setBanUserSearchResults(resp.data)
            }
        }catch(err){
            if (err.response.status === 404){
                props.errorCallback(err.response.data)
            }
        }
    }

    const handleBanUserInputChanged = (e) => {
        setBanUserSearchTerm(e.target.value)
    }

    const handleBanUser = async (e) => {
        try{
            const resp = await AdminService.banUser(banUserSearchResult.user.id)
            if (resp.status === 200){
                props.successCallback("User removed")
                fetchData()
                setBanUserSearchResults(undefined)
                
            }
        }catch(err){
            if (err.response.status === 403){
                props.errorCallback(err?.response?.data?.detail)
            }
        }
    }

    const handleApproveUser = async (userId) => {

        try{
            const resp = await AdminService.approveUser(userId)
            if (resp.status === 200){
                props.successCallback("User approved")
                fetchData()
            }
        }catch(err){
            if (err.response.status === 403){
                props.errorCallback(err?.response?.data?.detail)
            }
        }
    }

    const handleRejectUser = async (userId) => {
        try{
            const resp = await AdminService.rejectUser(userId)
            if (resp.status === 200){
                props.successCallback("User rejected")
                fetchData()
            }
        }catch(err){
            if (err.response.status === 403){
                props.errorCallback(err?.response?.data?.detail)
            }
            else if (err.response.status === 404){
                props.errorCallback(err?.response?.data?.detail)
            }
            else{
                props.errorCallback("Something went wrong")
            }

        }
    }

    const [makeAdminSearchTerm, setMakeAdminSearchTerm] = React.useState("")
    const [makeAdminSearchResult, setMakeAdminSearchResult] = React.useState(undefined)
    const handleMakeAdminSearch = async (e) => {
        e.preventDefault()
    
        if (makeAdminSearchTerm === ""){
            props.errorCallback("Please enter a username")
            setMakeAdminSearchResult(undefined)
            return

        }

        try{ 
            const resp = await UserService.getLinkpage(makeAdminSearchTerm)
            if (resp.status === 200){
                setMakeAdminSearchResult(resp.data)
            }
        }catch(err){
            if (err.response.status === 404){
                props.errorCallback(err?.response?.data)
            }
        }
    
    }
    const handleMakeAdminInputChanged = (e) => {
        setMakeAdminSearchTerm(e.target.value)
    }

    const handleMakeAdmin = async (e) => {

        try {
            const resp = await AdminService.makeAdmin(makeAdminSearchResult.user.id)
            if (resp.status === 200){
                props.successCallback("User made admin")
                fetchData()
                setMakeAdminSearchResult(undefined)
            }
        } catch(err){
            if (err.response.status === 403){
                props.errorCallback(err?.response?.data?.detail)
            } else if (err.response.status === 404){
                props.errorCallback(err?.response?.data?.detail)
            } else {
                props.errorCallback("Something went wrong")
            }
        }
    }

    const handleDemoteAdmin = async (e) => {
        try {
            const resp = await AdminService.demoteAdmin(makeAdminSearchResult.user.id)
            if (resp.status === 200){
                props.successCallback("User demoted")
                fetchData()
                setMakeAdminSearchResult(undefined)
            }
        } catch(err){
            if (err.response.status === 403){
                props.errorCallback(err?.response?.data?.detail)
            } else if (err.response.status === 404){
                props.errorCallback(err?.response?.data?.detail)
            } else {
                props.errorCallback("Something went wrong")
            }
        }
    }

    const [createRefundSearchResult, setCreateRefundSearchResult] = React.useState(undefined)
    const [createRefundSearchTerm, setCreateRefundSearchTerm] = React.useState("")


    const handleCreateRefundSearch = async (e) => {
        e.preventDefault()
        try {
            const resp = await BookingService.getBooking(createRefundSearchTerm);
            if (resp.status === 200){
                console.log("booking: ",resp.data.active_enquiry.price)
                setCreateRefundSearchResult({
                    booking_id: resp.data.id, 
                    enquiry_id: resp.data.active_enquiry.id,
                    status : resp.data.status,
                    is_paid: resp.data.is_paid,
                    user: resp.data.user,
                    startTime : resp.data.active_enquiry?.start_datetime,
                    endTime : resp.data.active_enquiry?.end_datetime,
                    price : resp.data.active_enquiry.price,
                    notes : resp.data.active_enquiry?.notes,
                    is_counter_offer : resp.data.active_enquiry?.is_counter_offer,
                    payment_intent_id : resp.data.payment_intent_id,

                }) 
            }
        } catch(err){
            if (err.response.status === 404){
                props.errorCallback(err?.response?.data)
            }else {
                props.errorCallback("Something went wrong")
            }
        }
    }


    const handleCreateRefundInputChanged = (e) => {
        setCreateRefundSearchTerm(e.target.value)
    }


    const handleCreateRefund = async (e) => {
        // TODO this doesnt work - make sure implementation in fixed
        try {
            const resp = await AdminService.refundAdminComfirm(createRefundSearchResult.booking_id)
            if (resp.status === 200){
                props.successCallback("Booking closed")
                fetchData();
                setCreateRefundSearchResult(undefined)
            }
        } catch(err){
            if (err.response.status === 403){
                props.errorCallback(err?.response?.data?.detail)
            } else if (err.response.status === 404){
                props.errorCallback(err?.response?.data?.detail)
            } else {
                props.errorCallback("Something went wrong")
            }
        }
    }



    return (
        <Admin 
            loading={loading}
            unaprovedLinkpages={unaprovedLinkpages}
            handleApproveUser={handleApproveUser}
            handleRejectUser={handleRejectUser}

            handleRemoveUserSearch={handleRemoveUserSearch}
            banUserSearchTerm={banUserSearchTerm}
            banUserSearchResult={banUserSearchResult}
            setBanUserSearchResults={setBanUserSearchResults}
            handleBanUserInputChanged={handleBanUserInputChanged}
            handleBanUser={handleBanUser}

            handleMakeAdminSearch={handleMakeAdminSearch}
            makeAdminSearchTerm={makeAdminSearchTerm}
            makeAdminSearchResult={makeAdminSearchResult}
            setMakeAdminSearchResult={setMakeAdminSearchResult}
            handleMakeAdminInputChanged={handleMakeAdminInputChanged}
            handleMakeAdmin={handleMakeAdmin}
            handleDemoteAdmin={handleDemoteAdmin}

            handleCreateRefundSearch={handleCreateRefundSearch}
            createRefundSearchTerm={createRefundSearchTerm}
            createRefundSearchResult={createRefundSearchResult}
            setCreateRefundSearchResult={setCreateRefundSearchResult}
            handleCreateRefundInputChanged={handleCreateRefundInputChanged}
            handleCreateRefund={handleCreateRefund}
            


            />
    )
}



export default AdminController
