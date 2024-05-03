import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { SearchIcon } from "../../exports";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const ulRef = useRef();

  const sessionUser = useSelector((state) => state.session.user);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [dispatch, showMenu, dropdownVisible]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const closeMenu = () => setShowMenu(false);

  return (
    <div className="navbar">
      <div className="navbar__wrapper sm:flex-col">
        <div className="navbar__left">
          <h1 className="navbar__left--logo">Dev</h1>
          <h1 className="navbar__left--logo2">Component</h1>
        </div>

        <div className="navbar__center">
          <input
            type="text"
            className="navbar__center--input"
            placeholder="Search Components Here ..."
          />

          <SearchIcon
            className="navbar__center--search"
            style={{ fontSize: "2.5rem", fontWeight: "700" }}
          />
        </div>

        <div
          className="navbar__right relative flex"
          onMouseEnter={() => setDropdownVisible(true)}
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <span className="navbar__right--username font-bold">
            {sessionUser ? sessionUser.username : "Welcome"}
          </span>
          <Avatar
            className="navbar__right--userIcon"
            // onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <div
              className="absolute gap-4 top-full right-10 flex flex-col bg-slate-200 rounded-md shadow-lg py-2 w-48"
              ref={ulRef}
            >
              {sessionUser ? (
                <>
                  <span className="cursor-pointer text-2xl px-4 py-2 hover:bg-teal-600 hover:text-yellow-500">
                    Profile
                  </span>
                  <span
                    className="cursor-pointer text-2xl px-4 py-2 hover:bg-teal-600 hover:text-yellow-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </>
              ) : (
                <>
                  {/* <div
                    className="cursor-pointer text-2xl px-4 py-2 hover:bg-teal-600 hover:text-yellow-500"
                    onClick={(e) => {
                      closeMenu(e);
                      setDropdownVisible(false);
                    }}
                  > */}
                  <OpenModalButton
                    buttonText="Login"
                    onItemClick={(e) => {
                      closeMenu(e);
                      setDropdownVisible(false);
                    }}
                    modalComponent={<LoginFormModal />}
                    // icon={}
                    className="cursor-pointer text-2xl px-4 py-2 hover:bg-teal-600 hover:text-yellow-500"
                  />
                  {/* </div> */}
                  {/* <div
                    className="cursor-pointer text-2xl px-4 py-2 hover:bg-teal-600 hover:text-yellow-500"
                    onClick={() => {
                      closeMenu();
                      setDropdownVisible(false);
                    }}
                  > */}
                  <OpenModalButton
                    buttonText="Sign Up"
                    onItemClick={() => {
                      closeMenu();
                      setDropdownVisible(false);
                    }}
                    modalComponent={<SignupFormModal />}
                    // icon={}
                  />
                  {/* </div> */}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
