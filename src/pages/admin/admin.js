import React from 'react';
import style from './admin.module.css';
import BiolinkFeedItem from '../../components/biolinkFeedItem/biolinkFeedItem';
import BookingsFeedItem from '../bookings/bookingsFeed/bookingsFeedItem/bookingsFeedItem';

const Admin = (props) => {
    
    
   

    

    const divider = (title) => {
        return (
            <div className={style.divider}>
                <div className={style.divider_title}>
                    {title}
                </div>
                <div className={style.divider_line}></div>
            </div>
        )
    }





    const removeUserBlock = () => {
        return (
            <div  className={style.remove_user} >
                <form onSubmit={props.handleRemoveUserSearch} >
                <div className={style.search_wrapper}>
                    
                        <div className={style.search_bar}>
                            <input className={style.search_input} placeholder="Search for user" value={props.banUserSearchTerm} onChange={props.handleBanUserInputChanged}/>
                        </div>
                        <button className={style.search_button} type="submit">
                            Remove User
                        </button>
              
                </div>
                </form>
                {props.banUserSearchResult && (
                    <div className={style.search_results} data-testid="ban-user-search-result">
                        <div className={style.feed_item_wrapper}>
                            <div className={style.aproval_feed_item}>
                                <BiolinkFeedItem linkpage={props.banUserSearchResult}/>
                            </div>
                            <div className={style.buttons_container}>
                                <button className={style.aproval_button + " " + style.make} onClick={() => {props.handleRejectUser(props.banUserSearchResult.user.id); props.setBanUserSearchResults(undefined)}}>
                                        Unaprove
                                </button>
                                <button className={style.aproval_button + " " + style.remove} onClick={props.handleBanUser}>
                                    Remove
                                </button>
                                
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    const accountAprovalFeed = () => {
        if (props.unaprovedLinkpages.length <= 0){
            return (
                <div className={style.no_linkpages}>
                    No unaproved Biolinks
                </div>
            )
        }

        return (
            <div className={style.aproval_feed}>
                {props.unaprovedLinkpages.map((linkpage, index) => {
                    return (
                        <div key= {index} className={style.feed_item_wrapper} data-testid="unaproval-feed-item">
                            <div className={style.aproval_feed_item}>
                                <BiolinkFeedItem linkpage={linkpage}/>
                            </div>
                            <div className={style.buttons_container}>
                                <button className={style.aproval_button + " "+ style.approve} onClick={() => props.handleApproveUser(linkpage.user.id)}>
                                    Approve
                                </button>
                                <button className={style.aproval_button + " "+ style.deny } onClick = {() => props.handleRejectUser(linkpage.user.id)}>
                                    Deny
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }


    const createRefundBlock = () => {
        return (
            <div  className={style.create_refund}>
                <form onSubmit={props.handleCreateRefundSearch} >
                <div className={style.search_wrapper}>

                        <div className={style.search_bar}>
                            <input className={style.search_input} placeholder="Search for booking id" value={props.createRefundSearchTerm} onChange={props.handleCreateRefundInputChanged}/>
                        </div>
                        <button className={style.search_button} type="submit">
                            Create Refund
                        </button>

                </div>
                </form>
                {props.createRefundSearchResult && (
                    <div className={style.search_results} data-testid="create-refund-search-result">
                        <div className={style.feed_item_wrapper}>
                            <div className={style.aproval_feed_item}>
                                <div className = {style.booking_info_item}>
                                    <div className={style.booking_info_item_title}>
                                        Booking ID: {props.createRefundSearchResult.booking_id}
                                    </div>
                                    <div className={style.booking_info_item_content}>
                                        <div className={style.booking_info_item_content_stripe_transaction_id}>
                                            Stripe Transaction ID: {props.createRefundSearchResult?.payment_intent_id}
                                        </div>
                                        <div className={style.booking_info_item_content_title}>
                                            User: {props.createRefundSearchResult.user}
                                        </div>

                                        <div className={style.booking_info_item_content_title}>
                                            Start Time: {props.createRefundSearchResult.startTime}
                                            </div>
                                        <div className={style.booking_info_item_content_title}>
                                            End Time: {props.createRefundSearchResult.endTime}
                                            </div>
                                        <div className={style.booking_info_item_content_title}>
                                            Price: £{props.createRefundSearchResult.price? String(props.createRefundSearchResult.price) : "N/A" }
                                            </div>
                                        <div className={style.booking_info_item_content_title}>
                                            Notes: {props.createRefundSearchResult.notes ? props.createRefundSearchResult.notes : "N/A"}
                                            </div>
                                        <div className={style.booking_info_item_content_title}>
                                            Is Counter Offer: {props.createRefundSearchResult.is_counter_offer? "Yes" : "No"}
                                            </div>
                                        <div className={style.booking_info_item_content_title}>
                                            Is Paid: {props.createRefundSearchResult.is_paid? "Yes" : "No"}
                                            </div>
                                        <div className={style.booking_info_item_content_title}>
                                            Status: {props.createRefundSearchResult.status}
                                        </div>
                                        
                                    </div>
                                </div>

                            </div>
                            <div className={style.buttons_container}>
                                <button className={style.aproval_button + " " + style.make} onClick={props.handleCreateRefund}>
                                    update after refund
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }


    

    

    



    const makeAdminBlock = () => {
        return (
            <div  className={style.makeAdmin}>
                <form onSubmit={props.handleMakeAdminSearch} >
                <div className={style.search_wrapper}>
                    
                        <div className={style.search_bar}>
                            <input className={style.search_input} placeholder="Search for user" value={props.makeAdminSearchTerm} onChange={props.handleMakeAdminInputChanged}/>
                        </div>
                        <button className={style.search_button} type="submit">
                            Make Admin
                        </button>
              
                </div>
                </form>
                {props.makeAdminSearchResult && (
                    <div className={style.search_results} data-testid="make-admin-search-result">
                        <div className={style.feed_item_wrapper}>
                            <div className={style.aproval_feed_item}>
                                <BiolinkFeedItem linkpage={props.makeAdminSearchResult}/>
                            </div>
                            <div className={style.buttons_container}>
                                <button className={style.aproval_button + " " + style.make} onClick={props.handleMakeAdmin}>
                                    Make Admin
                                </button>
                                <button className={style.aproval_button + " " + style.remove} onClick={props.handleDemoteAdmin}>
                                    Demote Admin
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={style.admin} data-testId="admin-view">
            <div className={style.admin_content}>
                {divider("Current Users")}
                {removeUserBlock()}
                {divider("Account Aprroval")}
                {accountAprovalFeed()}
                {divider("Make Admin")}
                {makeAdminBlock()}
                {divider("Refund")}
                {createRefundBlock()}
            </div>
        </div>
    )


}

export default Admin;
