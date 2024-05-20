import React from "react";
import { useState, useEffect } from "react";
import style from "../../form.module.css";
import UserService from "../../../../../request-model/services/user.service";
import { FaInfoCircle } from "react-icons/fa";

function UpdateSoundcloudForm(props) {
  const initialValues = {
    url: props.link.url,
  };

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

      const saveLinkResp = await UserService.updateLink(
        props.link.id,
        formInput.linkText,
        formInput.url,
        props.link.index,
        props.linkpageId,
        "soundcloud"
      );

      if (saveLinkResp.status === 200 || saveLinkResp.status === 201) {
        props.successCallback();

        props.onClose();
        props.onUpdateCallback();
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

  const handleDelete = async (e) => {
    try {
      const deleteLinkResp = await UserService.deleteLink(props.link.id);

      if (deleteLinkResp.status === 200 || deleteLinkResp.status === 204) {
        props.onDeleteCallback();
      }
    } catch (error) {
      console.log("error: ", error);
      props.errorCallback("An eror occured when deleting the link");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl m-5 bg-white rounded-lg">
        <div className="text-center mb-6">
          <h3 className="text-3xl pb-2 font-medium">Edit Soundcloud Link</h3>

          <div className="flex flex-row items-center justify-center text-sm">
            <FaInfoCircle className="mr-2 text-gray-500" />
            <p className="text-gray-500">
              Make sure that your account&nbsp;
              <a
                href="https://help.soundcloud.com/hc/en-us/articles/115003568008-Embedding-a-track-or-playlist-#:~:text=To%20get%20an%20embed%20code,have%20to%20embed%20your%20player."
                target="_blank"
                rel="noreferrer"
                className="text-blue-500  hover:text-blue-700"
              >
                allows embeds
              </a>
            </p>
          </div>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-lg font-medium">URL</label>
            <input
              type="text"
              name="url"
              value={formInput.url}
              onChange={handleLinkUrlChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-end space-x-2 mt-4">
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

export default UpdateSoundcloudForm;
