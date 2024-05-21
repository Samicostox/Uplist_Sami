import React from "react";
import { useState, useEffect } from "react";
import style from "../../form.module.css";
import UserService from "../../../../../request-model/services/user.service";

const initialValues = {
  url: "",
};

function AddSkiddleForm(props) {
  const [formInput, setFormInput] = useState(initialValues);
  const [module_form_class, setModuleFormClass] = useState(style.module_form);

  useEffect(() => {
    if (props.changed === "left") {
      setModuleFormClass(style.module_form + " " + style.left);
    } else if (props.changed === "right") {
      setModuleFormClass(style.module_form + " " + style.right);
    }
  }, [props.changed]);

  const handleLinkUrlChange = (e) => {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      ...formInput.firstName,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    try {
      // validate form input url
      //check if url starts with http:// or https://
      // if not, add https:// to the start of the url
      if (
        !formInput.url.startsWith("http://") &&
        !formInput.url.startsWith("https://")
      ) {
        formInput.url = "https://" + formInput.url;
      }

      const saveLinkResp = await UserService.addLink(
        "skiddle",
        "skiddle",
        formInput.url,
        props.linkpageId,
        props.nextIndex
      );

      if (saveLinkResp.status === 200 || saveLinkResp.status === 201) {
        props.successCallback("Link added successfully");

        props.onClose();
        props.onAddCallback();
      }
    } catch (error) {
      console.log("error: ", error);
      if (error?.response?.status === 401) {
        props.errorCallback("Can't access resource - Unauthorised");
      } else {
        props.errorCallback(
          "Something went wrong, please refresh and try again"
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="module_form  py-4 w-full max-w-md mx-auto bg-white rounded ">
        <div className="module_header text-center">
          <h3 className="text-2xl font-medium">
            Add a link to your skiddle events!
          </h3>
        </div>

        <form>
          <div className="module_form_input my-4">
            <label className="block text-lg font-medium">URL</label>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              name="url"
              value={formInput.url}
              onChange={handleLinkUrlChange}
            />
          </div>

          <div className="module_form_buttons flex justify-end mt-4">
            <button
              className="module_form_button bg-black text-white py-2 px-4 rounded transition ease-in-out duration-200 hover:bg-gray-700"
              type="button"
              onClick={props.onClose}
            >
              Cancel
            </button>
            <button
              className="module_form_button bg-blue-500 text-white py-2 px-4 rounded ml-2 transition ease-in-out duration-200 hover:bg-blue-700"
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

export default AddSkiddleForm;
