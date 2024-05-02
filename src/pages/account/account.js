import React from "react";
import style from "./account.module.css";
import { Switch } from "@mui/material";
import { useState } from "react";
import SaveBanner from "../../components/saveBanner/saveBanner";
import ChangePassword from "./changePassword/changePassword";
import { NavLink } from "react-router-dom";

const Account = (props) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const onChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleUsernameChange = (event) => {
    // update form input key value
    props.updateFormInput("username", event.target.value);
  };

  const handleEmailChange = (event) => {
    // update form input key value
    props.updateFormInput("email", event.target.value);
  };

  const handleVisibilityChange = (event) => {
    // update form input key value
    props.updateFormInput("biolinkVisible", event.target.checked);
  };

  const handleAccountTypeChange = (event) => {
    // update form input key value
    props.updateFormInput("accountType", event.target.value);
  };

  const handleTagChange = (event) => {
    // update form input key value
    props.updateFormInput("tag", event.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    props.onSaveAccount();
  };

  const renderStatus = () => {
    if (props.form.status === "approved") {
      return (
        <span
          className={style.status + " " + style.approved}
          data-testid="status"
        >
          {" "}
          Approved{" "}
        </span>
      );
    } else if (!props.form.isReviewed && props.form.status === "pending") {
      return (
        <span
          className={style.status + " " + style.pending}
          data-testid="status"
        >
          {" "}
          Pending...
        </span>
      );
    } else if (props.form.isReviewed && props.form.status === "pending") {
      return (
        <span
          className={style.status + " " + style.rejected}
          data-testid="status"
        >
          {" "}
          Rejected{" "}
        </span>
      );
    }
    return <></>;
  };

  return (
    <div className={style.account}>
      {showChangePassword && (
        <ChangePassword
          errorCallback={props.errorCallback}
          successCallback={props.successCallback}
          closeCallback={onChangePassword}
        />
      )}

      <SaveBanner saveCallback={props.onSaveAccount} state={props.saveState} />

      {!props.isLoading && (
        <div className={style.account_container}>
          <div className={style.account_header}>My Account</div>

          <div className={style.account_body}>
            <form className={style.account_form} onSubmit={handleFormSubmit}>
              <div className={style.form_header}> My details </div>
              <div className={style.section_container}>
                <div className={style.form_row}>
                  <label className={style.details_label}>Username</label>
                  <input
                    className={style.details_input}
                    type="text"
                    name="name"
                    value={props.form.username}
                    onChange={handleUsernameChange}
                  />
                </div>

                <div className={style.form_row}>
                  <label className={style.details_label}>Email</label>
                  <input
                    className={style.details_input}
                    type="text"
                    name="email"
                    value={props.form.email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>

              <div className={style.form_header}> Account information </div>
              <div className={style.section_container}>
                <div className={style.form_row}>
                  <div className={style.select_row}>
                    <div className={style.multi_labels}>
                      <label className={style.multi_label}>
                        Biolink visible
                      </label>
                      <label className={style.multi_info}>
                        enable whether people can visit your biolink or not{" "}
                      </label>
                    </div>
                    <Switch
                      className={style.switch}
                      checked={props.form.biolinkVisible}
                      onChange={handleVisibilityChange}
                    />
                  </div>
                </div>

                <div className={style.form_row}>
                  <div className={style.select_row}>
                    <label className={style.multi_label}>Account Type</label>
                    <select
                      className={style.select}
                      value={props.form.accountType}
                      onChange={handleAccountTypeChange}
                    >
                      <option value="personal" selected>
                        Customer
                      </option>
                      <option value="business">Artist</option>
                    </select>
                  </div>
                </div>

                {props.form.accountType === "business" && (
                  <>
                    <div className={style.form_row}>
                      <div className={style.select_row}>
                        <label className={style.multi_label}> Tag</label>
                        <select
                          className={style.select}
                          value={props.form.tag}
                          onChange={handleTagChange}
                        >
                          <option
                            value=""
                            disabled
                            selected
                            hidden
                            className={style.placeholder_option}
                          >
                            Please Select...
                          </option>
                          <option value="dj" className={style.option}>
                            DJ
                          </option>
                          <option value="music artist" className={style.option}>
                            Music Artist
                          </option>
                          <option value="other" className={style.option}>
                            Other
                          </option>
                          {/* <option value="MC" className={style.option}>MC</option>
                                                <option value="Performer" className={style.option}>Performer</option>
                                                <option value="Band" className={style.option}>Band</option> */}
                        </select>
                      </div>
                    </div>
                    <div className={style.form_row}>
                      <div className={style.select_row}>
                        <div className={style.multi_labels}>
                          <label className={style.multi_label}>Status</label>
                          <label className={style.multi_info}>
                            page status must be approved before you become
                            bookable
                          </label>
                        </div>
                        <div className={style.aproval}>{renderStatus()}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className={style.form_header}> Security settings </div>
              <div className={style.section_container}>
                <div className={style.form_row}>
                  <div className={style.select_row}>
                    <label className={style.multi_label}>
                      Change your password
                    </label>

                    <button
                      className={style.change_password_button}
                      onClick={onChangePassword}
                      type="button"
                    >
                      Change
                    </button>
                  </div>
                </div>

                <div className={style.form_row}>
                  <div className={style.select_row}>
                    <label className={style.multi_label}>
                      Delete your account
                    </label>

                    <button
                      className={style.delete_account_button}
                      onClick={props.onDeleteAccount}
                      type="button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className={style.terms_container}>
                <div classname={style.privacy_policy_link}>
                  <NavLink
                    to="/privacy-policy"
                    target="_blank"
                    className={style.privacy_policy_link}
                  >
                    We will process your data in accordance with our privacy
                    policy
                  </NavLink>
                </div>
                <div className={style.terms_of_service_link}>
                  <NavLink
                    to="/terms-of-service"
                    target="_blank"
                    className={style.terms_of_service_link}
                  >
                    Terms of Service
                  </NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
