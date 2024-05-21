import React from "react";
import { motion } from "framer-motion";
import TokenService from "../../request-model/services/token.service";
import AuthService from "../../request-model/services/auth.service";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.png";

const Navbar = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const hideDropdown = () => setAccountMenuOpen(false);
  const [token, setToken] = React.useState(TokenService.getUser());
  const [openMenu, setOpenMenu] = useState(false);
  const handleLogin = () => {
    // logout and redirect to auth
    AuthService.logout();
    console.log("toto");
    window.location.href = "/auth/login";
    console.log("tata2");
    //navigate("/auth/login");
  };

  const getBiolinkNavigation = () => {
    const newToken = TokenService.getUser();
    if (!newToken) {
      setToken(undefined);
      return "/auth/login";
    }

    const username = newToken.username;

    return "/biolink/" + username;
  };

  const handleBiolinkClick = (e) => {
    e.preventDefault();
    window.location.href = getBiolinkNavigation();
  };
  const handleSignout = () => {
    // logout and redirect to auth

    AuthService.logout();
    window.location.href = "/auth/login";
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/auth/sign-up";
  };

  useEffect(() => {
    setToken(TokenService.getUser());

    return function cleanup() {
      setOpenMenu(false);
    };
  }, [navigate]);

  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "block py-2 px-3 mx-3 text-white bg-blue-500 rounded dark:bg-blue-600"
      : "block py-2 px-3 mx-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  };
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />
        <div className="md:flex hidden md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          {token && <button onClick={handleSignout}>Sign Out</button>}
          {!token && <RegisterButton />}
          {token ? <YourBiolinkButton /> : <SignInButton />}
        </div>
        <div className="hidden md:flex md:order-1 space-x-4">
          <NavLink href="/artists" className={getLinkClasses("/artists")}>
            Find Artists
          </NavLink>
          {token && (
            <NavLink href="/bookings" className={getLinkClasses("/bookings")}>
              Bookings
            </NavLink>
          )}
          {token && (
            <NavLink href="/account" className={getLinkClasses("/account")}>
              Account
            </NavLink>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            data-collapse-toggle="navbar-hamburger"
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded="false"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden ${openMenu ? "block" : "hidden"} w-full`}
        id="navbar-hamburger"
      >
        <ul className="flex flex-col font-medium mt-4 mb-4 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
          <li>
            <a href="/artists" className={getLinkClasses("/artists")}>
              Find Artists
            </a>
          </li>
          {token && (
            <li>
              <a href="/bookings" className={getLinkClasses("/bookings")}>
                Bookings
              </a>
            </li>
          )}
          {token && (
            <li>
              <a href="/account" className={getLinkClasses("/account")}>
                Account
              </a>
            </li>
          )}
          {token && (
            <li>
              <button
                onClick={handleSignout}
                className="block py-2 px-3 mx-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Sign Out
              </button>
            </li>
          )}
          {!token && (
            <li>
              <a
                onClick={handleClick}
                className="block py-2 px-3 mx-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Register
              </a>
            </li>
          )}
          {!token && (
            <li>
              <a
                onClick={handleBiolinkClick}
                className="block py-2 px-3 mx-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Sign In
              </a>
            </li>
          )}
          {token && (
            <li>
              <a
                onClick={handleBiolinkClick}
                className={getLinkClasses(getBiolinkNavigation())}
              >
                Your Biolink
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;

const NavLink = ({ children, href }) => {
  return (
    <a href={href} rel="nofollow" className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center text-blue-500">
          {children}
        </span>
      </motion.div>
    </a>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <a href="/">
      <img class="object-cover h-12 w-15" src={logo} alt="logo" />
    </a>
  );
};

const YourBiolinkButton = () => {
  const [token, setToken] = React.useState(TokenService.getUser());

  const getBiolinkNavigation = () => {
    const newToken = TokenService.getUser();
    if (!newToken) {
      setToken(undefined);
      return "/auth/login";
    }

    const username = newToken.username;

    return "/biolink/" + username;
  };

  const handleBiolinkClick = (e) => {
    e.preventDefault();
    window.location.href = getBiolinkNavigation();
  };
  return (
    <button
      onClick={handleBiolinkClick}
      className={`
            relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md border-[1px] 
            border-blue-500 px-4 py-1.5 font-medium
           text-blue-500 transition-all duration-300
            
            before:absolute before:inset-0
            before:-z-10 before:translate-y-[200%]
            before:scale-[2.5]
            before:rounded-[100%] before:bg-blue-500
            before:transition-transform before:duration-1000
            before:content-[""]
    
            hover:scale-105 hover:border-white hover:text-white
            hover:before:translate-y-[0%]
            active:scale-100`}
    >
      Your Biolink
    </button>
  );
};

const SignInButton = () => {
  const [token, setToken] = React.useState(TokenService.getUser());

  const getBiolinkNavigation = () => {
    const newToken = TokenService.getUser();
    if (!newToken) {
      setToken(undefined);
      return "/auth/login";
    }

    const username = newToken.username;

    return "/biolink/" + username;
  };

  const handleBiolinkClick = (e) => {
    e.preventDefault();
    window.location.href = getBiolinkNavigation();
  };
  return (
    <button
      onClick={handleBiolinkClick}
      className={`
      relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md border-[1px] 
      border-neutral-700 px-4 py-1.5 font-medium
     text-black transition-all duration-300
      
      before:absolute before:inset-0
      before:-z-10 before:translate-y-[200%]
      before:scale-[2.5]
      before:rounded-[100%] before:bg-blue-500
      before:transition-transform before:duration-1000
      before:content-[""]

      hover:scale-105 hover:border-white hover:text-white
      hover:before:translate-y-[0%]
      active:scale-100`}
    >
      Sign In
    </button>
  );
};

const RegisterButton = () => {
  const [token, setToken] = React.useState(TokenService.getUser());

  const getBiolinkNavigation = () => {
    const newToken = TokenService.getUser();
    if (!newToken) {
      setToken(undefined);
      return "/auth/login";
    }

    const username = newToken.username;

    return "/biolink/" + username;
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/auth/sign-up";
  };
  return (
    <button
      onClick={handleClick}
      className="px-4 py-1.5 rounded-md bg-blue-500 text-white transition duration-200 hover:bg-white hover:text-blue-500 border-2 border-transparent hover:border-blue-500"
    >
      Register
    </button>
  );
};
