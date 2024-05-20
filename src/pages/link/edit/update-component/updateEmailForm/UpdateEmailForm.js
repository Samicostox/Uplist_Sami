import React from "react";
import { useState, useEffect } from "react";
import style from "../../form.module.css";
import UserService from "../../../../../request-model/services/user.service";

function UpdateLinkForm(props) {
  const [module_form_class, setModuleFormClass] = useState(style.module_form);

  useEffect(() => {
    if (props.changed === "left") {
      setModuleFormClass(style.module_form + " " + style.left);
    } else if (props.changed === "right") {
      setModuleFormClass(style.module_form + " " + style.right);
    }
  }, [props.changed]);

  const [emailLists, setEmailLists] = useState([]);
  useEffect(() => {
    const fetchEmailLists = async () => {
      try {
        const response = await UserService.getMailchimpLists();
        setEmailLists(response.data.lists);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmailLists();
  }, []);

  const handleSave = async (e) => {
    // set chosen email list as active
    // set other email lists as inactive
    // close modal
    e.preventDefault();
    const activeListId = document.getElementById("mailingList").value;
    try {
      for (let i = 0; i < emailLists.length; i++) {
        if (emailLists[i].id === activeListId) {
          await UserService.updateMailchimpList(emailLists[i].id, true);
        } else {
          await UserService.updateMailchimpList(emailLists[i].id, false);
        }
        props.successCallback();
        props.onClose();
      }
    } catch (error) {
      props.errorCallback(
        "Something went wrong: please refresh the page and try again"
      );
    }
  };

  const handleDelete = async (e) => {
    try {
      const resp = await UserService.deleteMailchimp();
      if (resp.status === 204) {
        props.onDeleteCallback();
      }
    } catch (error) {
      console.log(error);
      props.errorCallback(
        "something went wrong: please refresh the page and try again"
      );
    }
  };

  return (
    <div
      className="z-30 flex justify-center items-center overflow-auto animate-fadeIn"
      data-testid="update-email-list-form"
    >
      <div className="relative top-[15%] w-[50%] bg-white rounded-lg z-40 p-6 overflow-hidden animate-slideIn md:w-[60%] sm:w-[80%] xs:w-[90%]">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-medium">
            Update mailchimp mailing Lists
          </h3>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-lg font-medium" htmlFor="mailingList">
              Choose active mailing list
            </label>
            <select
              id="mailingList"
              name="mailingList"
              className="w-full p-2 border border-gray-300 rounded"
            >
              {emailLists.map((list) => (
                <option key={list.id} value={list.id} className="text-black">
                  {list.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-black text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-gray-700"
              type="button"
              onClick={props.onClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-red-700"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-blue-700"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateLinkForm;
