import style from "./navbar.module.css";
import React from "react";
import { NavLink } from "./navbarElements";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useOutSideClickAlert } from "../hooks/outsideClickHook";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

import TokenService from "../../request-model/services/token.service";
import AuthService from "../../request-model/services/auth.service";

const Navbar = () => {
  let navigate = useNavigate();
  const [token, setToken] = React.useState(TokenService.getUser());

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
    hideDropdown();
    AuthService.logout();
    console.log("toto2");
    window.location.href = "/auth/login";
    console.log("tatat2");
  };

  useEffect(() => {
    setToken(TokenService.getUser());

    return function cleanup() {
      setOpenMenu(false);
    };
  }, [navigate]);

  const renderLogoShort = () => {
    return (
      <div className={style.logo_short}>
        <img
          src="/logo/logo_icon.png"
          alt="logo"
          className={style.logo_short}
        />
      </div>
    );
    // return (
    //     <div className={style.link_title}>
    //         UPlist
    //     </div>
    // )
  };

  // const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const signedOutNavStyle = {
    gridTemplateColumns: "1fr 1fr 1fr",
    height: "5.5rem",
  };

  const signedInNavStyle = {
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    height: "5.5rem",
  };

  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const hideDropdown = () => setAccountMenuOpen(false);

  const handleAccountClick = (e) => {
    e.preventDefault();
    setAccountMenuOpen(!accountMenuOpen);
  };

  let accountDropdownClass = !accountMenuOpen
    ? style.dropdown_content + " " + style.hide
    : style.dropdown_content + " " + style.show;

  const accountDropdownRef = useRef(null);
  useOutSideClickAlert(accountDropdownRef, hideDropdown);

  const navbarFull = () => {
    return (
      <div className={style.navbarFull}>
        <div
          className={style.navbar_container}
          style={token ? signedInNavStyle : signedOutNavStyle}
        >
          <div className={style.navbar_item + " " + style.left}>
            <a href="/artists" className={style.link_title}>
              Find Artists
            </a>
          </div>

          {token && (
            <div className={style.navbar_item + " " + style.center}>
              <a href="/bookings" className={style.link_title}>
                Bookings
              </a>
            </div>
          )}

          <div className={style.navbar_item + " " + style.center}>
            <a href="/">{renderLogoShort()}</a>
          </div>

          {token && (
            <div className={style.navbar_item + " " + style.center}>
              <NavLink to={getBiolinkNavigation()} onClick={handleBiolinkClick}>
                <div className={style.link_title}>Your Biolink</div>
              </NavLink>
            </div>
          )}

          {token && (
            <div className={style.navbar_item + " " + style.center}>
              <div className={style.dropdown}>
                <div className={style.navbar_item + " " + style.center}>
                  <NavLink to="/account" onClick={handleAccountClick}>
                    <div className={style.link_title}>Account</div>
                  </NavLink>
                </div>

                {accountMenuOpen && (
                  <div
                    className={accountDropdownClass}
                    ref={accountDropdownRef}
                  >
                    <div className={style.dropdown_item}>
                      <Link
                        to="/account"
                        className={style.dropdown_item}
                        onClick={hideDropdown}
                      >
                        My Account
                      </Link>
                    </div>

                    {token.is_staff && (
                      <div className={style.dropdown_item}>
                        <Link
                          to="/admin"
                          className={style.dropdown_item}
                          onClick={hideDropdown}
                        >
                          Admin
                        </Link>
                      </div>
                    )}

                    <div
                      className={style.dropdown_signout}
                      onClick={handleSignout}
                    >
                      Sign Out
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!token && (
            <div className={style.navbar_item + " " + style.right}>
              <div className={style.login_button} onClick={handleLogin}>
                <div className={style.login_button_text}>LOG IN</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
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

  const [openMenu, setOpenMenu] = useState(false);

  const navbarShort = () => {
    let menuClass = "";
    if (openMenu) {
      menuClass = style.menu_container + " " + style.active;
    } else {
      menuClass = style.menu_container;
    }

    const shortNavbar = () => {
      return (
        <div
          className={style.navbar_container}
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <div className={style.navbar_item + " " + style.left}>
            <a href="/">{renderLogoShort()}</a>
          </div>

          {/* fa bars */}
          <div className={style.navbar_item + " " + style.right}>
            <div className={style.link_title}>
              {!openMenu && (
                <FaBars
                  className={style.bars}
                  size={25}
                  onClick={handleBarsClick}
                />
              )}
              {openMenu && (
                <FaTimes
                  className={style.bars}
                  size={25}
                  onClick={handleBarsClick}
                />
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className={style.menu}>
        {shortNavbar()}

        <div className={menuClass}>
          {shortNavbar()}
          <div className={style.menu_item}>
            <a href="/artists" className={style.link_title}>
              Find Artists
            </a>
          </div>

          {token && (
            <div className={style.menu_item}>
              <a href="/bookings" className={style.link_title}>
                Bookings
              </a>
            </div>
          )}

          {token && (
            <div className={style.menu_item}>
              <NavLink to={getBiolinkNavigation()} onClick={handleBiolinkClick}>
                <div className={style.link_title}>Your Biolink</div>
              </NavLink>
            </div>
          )}

          {token && (
            <>
              <div className={style.menu_item}>
                <a href="/account" className={style.link_title}>
                  Account
                </a>
              </div>

              {token.is_staff && (
                <div className={style.menu_item}>
                  <a href="/admin" className={style.link_title}>
                    Admin
                  </a>
                </div>
              )}

              <div className={style.menu_item}>
                <div className={style.link_title} onClick={handleSignout}>
                  <div className={style.signOutMini}>Sign Out</div>
                </div>
              </div>
            </>
          )}

          {!token && (
            <div className={style.menu_item}>
              <div
                className={style.login_button + " " + style.short}
                onClick={handleLogin}
              >
                <div className={style.login_button_text}>LOG IN</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleBarsClick = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={style.navbar}>
      {navbarFull()}
      {navbarShort()}
    </div>
  );
};

export default Navbar;
