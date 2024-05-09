import style from "./editBanner.module.css";
import { NavLink } from "react-router-dom";

const EditBanner = (props) => {
  if (!props.canEdit) {
    return <></>;
  }

  return (
    <div className="fixed bottom-8 right-8 z-10 bg-white flex justify-center items-center rounded-md shadow-md gap-8 p-2 ">
      <NavLink to={"edit"}>
        <button className="px-4 py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
          Edit your BioLink
        </button>
      </NavLink>
    </div>
  );
};

export default EditBanner;
