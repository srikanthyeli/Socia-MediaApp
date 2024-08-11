import React from "react";
import { useNavigate } from "react-router-dom";
import { RiUserSettingsFill } from "react-icons/ri";
import { GiPostStamp } from "react-icons/gi";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "./index.css";

const Navigation = () => {
  const navigateTo = useNavigate();
  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigateTo("/login");
  };
  return (
   <nav className="nav-header">
    <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dexswe6e0/image/upload/v1723349025/Screenshot_2024-08-11_093128-removebg-preview_s2ogeq.png"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dexswe6e0/image/upload/v1723349025/Screenshot_2024-08-11_093128-removebg-preview_s2ogeq.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/post" className="nav-link">
                Post
            
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/users" className="nav-link">
              <RiUserSettingsFill/>
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/post" className="nav-link">
              <GiPostStamp/>
              
            </Link>
          </li>
        </ul>
      </div>

   </nav>
  );
};

export default Navigation;
