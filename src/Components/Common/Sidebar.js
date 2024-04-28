import React, { useEffect, useState } from "react";
import orderIcon from '../../images/icons/sidebar/orders-icon.svg';
import personalDetailsIcon from '../../images/icons/sidebar/personal-details-icon.svg';
import addressBookIcon from '../../images/icons/sidebar/address-book-icon.svg';
import heartIcon from '../../images/icons/sidebar/heart.svg';
import helpIcon from '../../images/icons/sidebar/help-icon.svg';
import logoutIcon from '../../images/icons/sidebar/logout-icon.svg';
import web from "../../images/Group265.png";
import { SwipeableDrawer } from "@mui/material";
import { Link } from "react-router-dom";
import { myProfile } from "../../services/profile";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { logout } from "../../services/auth.service";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState({
    first_name: '-',
    last_name: '-',
    mobile: ''
  })
  const openDrawer = () => {
    setIsOpen(true)
  }
  const closeDrawer = () => {
    setIsOpen(false)
  }

  const getData = async () => {
    const result = await myProfile();
    setData(result.data.data[0])
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="sidebar">
        <div className="d-none d-md-block">
          <ul className="menu-wrapper">
            <li className="w-100 d-flex profile-wrapper">
              <img className="profile-img" src={web} />
              <div className="profile-info">
                <b className="name">Hi {data.first_name} {data.last_name}</b>
                <small>{data.mobile}</small>
              </div>
            </li>
            <div className="sidebar-menu">
              <li className="w-100">
                <Link to="/dashboard/myorder" className="menu-link">
                  <img
                    src={orderIcon}
                    alt="Logo"
                    className="image"
                  />
                  MY ORDERS
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/personal-details" className="menu-link">
                  <img
                    src={personalDetailsIcon}
                    alt="Logo"
                    className="image"
                  />
                  PERSONAL DETAILS
                </Link>
              </li>
              <li className="w-100">
                <Link to="/dashboard/address-book" className="menu-link">
                  <img
                    src={addressBookIcon}
                    alt="Logo"
                    className="image"
                  />
                  ADDRESS BOOK
                </Link>
              </li>
              <li className="w-100">
                <Link to="/wishlist" className="menu-link w-100 link-with-open-new">
                  <img
                    src={heartIcon}
                    alt="Logo"
                    className="image"
                  />
                  WISHLIST
                  <OpenInNewIcon className="new-tab-icon" />
                </Link>
              </li>
              <li className="w-100">
                <Link to="/contact-us" className="menu-link w-100 link-with-open-new">
                  <img
                    src={helpIcon}
                    alt="Logo"
                    className="image"
                  />
                  SUPPORT
                  <OpenInNewIcon className="new-tab-icon" />
                </Link>
              </li>
            </div>
            <li className="w-100 sign-out">
              <a onClick={logout} className="menu-link">
                <img
                  src={logoutIcon}
                  alt="Logo"
                  className="image"
                />
                SIGN OUT
              </a>
            </li>
          </ul>
        </div>
        <div className=" d-md-none d-lg-none">
          <SwipeableDrawer className="mobile-drawer" open={isOpen} onOpen={openDrawer} onClose={closeDrawer} swipeAreaWidth={100}>
            <ul className="menu-wrapper">
              <li className="w-100 d-flex profile-wrapper">
                <div className="profile-section w-100 d-flex">
                  <img className="profile-img" src={web} />
                  <div className="profile-info">
                    <b className="name">Hi {data.first_name} {data.last_name}</b>
                    <small>{data.mobile}</small>
                  </div>
                </div>
              </li>
              <div className="sidebar-menu">
                <li className="w-100">
                  <Link to="/dashboard/myorder" className="menu-link" onClick={closeDrawer}>
                    <img
                      src={orderIcon}
                      alt="Logo"
                      className="image"
                    />
                    MY ORDERS
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/dashboard/personal-details" className="menu-link" onClick={closeDrawer}>
                    <img
                      src={personalDetailsIcon}
                      alt="Logo"
                      className="image"
                    />
                    PERSONAL DETAILS
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/dashboard/address-book" className="menu-link" onClick={closeDrawer}>
                    <img
                      src={addressBookIcon}
                      alt="Logo"
                      className="image"
                    />
                    ADDRESS BOOK
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/wishlist" className="menu-link" onClick={closeDrawer}>
                    <img
                      src={heartIcon}
                      alt="Logo"
                      className="image"
                    />
                    WISHLIST
                  </Link>
                </li>
                <li className="w-100">
                  <Link to="/contact-us" className="menu-link" onClick={closeDrawer}>
                    <img
                      src={helpIcon}
                      alt="Logo"
                      className="image"
                    />
                    SUPPORT
                  </Link>
                </li>
              </div>
              <li className="w-100 sign-out">
                <a onClick={logout} className="menu-link">
                  <img
                    src={logoutIcon}
                    alt="Logo"
                    className="image"
                  />
                  SIGN OUT
                </a>
              </li>
            </ul>
          </SwipeableDrawer>
        </div>
      </div>
    </>
  )
}
