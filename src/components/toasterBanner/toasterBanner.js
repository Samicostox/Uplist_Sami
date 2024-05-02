import toast, { Toaster } from "react-hot-toast";
import { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import React from "react";

// set navbar height to 5.5rem
const NavBarHeight = 100;
const ToasterBanner = forwardRef((props, ref) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition]);

  // toast used for error and success messages, called from outside using ref
  const notifyError = (message) => {
    toast.error(message);
  };
  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyLoad = (message) => {
    toast.loading(message);
  };

  // Expose the notify error and notify success function to the parent component
  useImperativeHandle(ref, () => ({
    notifyError,
    notifySuccess,
    notifyLoad,
  }));

  return (
    <Toaster
      toastOptions={{}}
      containerStyle={{
        top: `${
          scrollPosition < NavBarHeight ? NavBarHeight - scrollPosition : 0
        }px`,
      }}
    />
  );
});

export default ToasterBanner;
