import React from "react";
import { motion } from "framer-motion";
import TokenService from "../../request-model/services/token.service";
import AuthService from "../../request-model/services/auth.service";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
  return (
    <section className="h-screen bg-neutral-950">
      <Navbar />
    </section>
  );
};

const Navbar = () => {
  let navigate = useNavigate();
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
  const handleSignout = () => {
    // logout and redirect to auth

    AuthService.logout();
    window.location.href = "/auth/login";
  };

  useEffect(() => {
    setToken(TokenService.getUser());

    return function cleanup() {
      setOpenMenu(false);
    };
  }, [navigate]);
  return (
    <nav className="z-50 fixed left-[50%] top-8 flex h-16 w-2/4 -translate-x-[50%] items-center gap-6 rounded-lg border-[1px] border-neutral-700 bg-neutral-900 p-2 text-sm text-neutral-500">
      <Logo />
      <div className="ml-auto flex items-center gap-6">
        <NavLink href={"/artists"}>Find Artists</NavLink>
        {token && <NavLink href={"/bookings"}>Bookings</NavLink>}
        {token && <NavLink href={"/account"}>Account</NavLink>}
        {token && <button onClick={handleSignout}>Sign Out</button>}
        {!token && <RegisterButton />}
        {token ? <YourBiolinkButton /> : <SignInButton />}
      </div>
    </nav>
  );
};
export default Navbar;
const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <a href="/">
      <img
        class="object-cover h-6 w-6 invert"
        src="/logo/logo_no_bg.png"
        alt="logo"
      />
    </a>
  );
};

const NavLink = ({ children, href }) => {
  return (
    <a href={href} rel="nofollow" className="block overflow-hidden">
      <motion.div
        whileHover={{ y: -20 }}
        transition={{ ease: "backInOut", duration: 0.5 }}
        className="h-[20px]"
      >
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center text-neutral-50">
          {children}
        </span>
      </motion.div>
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
          relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border-[1px] 
          border-neutral-700 px-4 py-1.5 font-medium
         text-blue-500 transition-all duration-300
          
          before:absolute before:inset-0
          before:-z-10 before:translate-y-[200%]
          before:scale-[2.5]
          before:rounded-[100%] before:bg-neutral-50
          before:transition-transform before:duration-1000
          before:content-[""]
  
          hover:scale-105 hover:border-neutral-50 hover:text-neutral-900
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
          relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border-[1px] 
          border-blue-500 px-4 py-1.5 font-medium
         text-neutral-300 transition-all duration-300
          
          before:absolute before:inset-0
          before:-z-10 before:translate-y-[200%]
          before:scale-[2.5]
          before:rounded-[100%] before:bg-neutral-50
          before:transition-transform before:duration-1000
          before:content-[""]
  
          hover:scale-105 hover:border-neutral-50 hover:text-neutral-900
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
      className="px-4 py-1.5  rounded-md bg-blue-500 text-white transition duration-200 hover:bg-neutral-900 hover:text-white border-2 border-transparent hover:border-blue-500"
    >
      Register
    </button>
  );
};
