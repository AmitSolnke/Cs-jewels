import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/icons/logo.svg";
import heartLogo from "../images/icons/heart.svg";
import userLogo from "../images/icons/user.svg";
import searchLogo from "../images/icons/search.svg";
import shoppingBagLogo from "../images/icons/shopping-bag.svg";
import menuOpen from "../images/icons/open-menu.svg";
import closeMenu from "../images/icons/close.svg";

function Header() {
  const $ = window.jQuery;

  useEffect(() => {
    $(".header-content .open-nav-btn").click(function (e) {
      $(".mobile-menu-overlay").css("width", "100%");
    });
    //close menu
    $(".header-content .close-nav-btn").click(function (e) {
      $(".mobile-menu-overlay").css("width", "0");
    });
  });
  return (
    <>
      <div>
        <header className="page-header">
        <hr className="header-hr d-none d-md-block " />
          <div className="header-content">
            <div className="col-12 col-md-12 col-lg-12 order-2 order-md-2">
              <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                  <div className="brand-wrapper">
                    <div className="open-nav-btn d-md-none d-lg-none mobile-header-bar">
                      <img
                        src={menuOpen}
                        alt="menu-open"
                        className="menu-open"
                      />
                      <div className="logo">
                        <a href="/">
                          <img src={logo} alt="Logo" className="image" />
                        </a>
                      </div>
                      <div className="header-icon-list">
                        <ul>
                          <li>
                            <a href="/">
                              <img
                                src={shoppingBagLogo}
                                alt="Logo"
                                className="image"
                              />
                            </a>
                          </li>
                          <li>
                            <a href="/">
                              <img
                                src={heartLogo}
                                alt="Logo"
                                className="image"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-lg-12  d-none d-md-block">
                      <div className="row position-relative">
                        <div className="logo">
                          <a href="/">
                            <img src={logo} alt="Logo" className="image" />
                          </a>
                        </div>
                        <div className="col-8 p-0 position-absolute end-0 h-100">
                          <div className="quick-links-wrapper">
                            <ul className="w-100">
                              <div className="quick-link-items">
                                <li>
                                  <text>GOLD - ₹5,767</text>
                                </li>
                                <li>
                                  <text>SILVER - ₹5,767</text>
                                </li>
                                <li>
                                  <a href="/">FIND A STORE</a>
                                </li>
                                <li>
                                  <a href="/">SUPPORT</a>
                                </li>
                              </div>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-2 col-lg-7 p-0">
                  <div className="mobile-menu-overlay">
                    <div className="close-nav-btn d-lg-none">
                      <img
                        src={closeMenu}
                        alt="close-menu-img"
                        className="menu-close"
                      />
                    </div>
                    <nav className="navbar">
                      <ul className="w-100">
                        <div className="d-lg-none">
                          <li>
                            <a href="/" className="menu-link">
                              Home
                            </a>
                          </li>
                        </div>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-12 order-1 order-md-1 d-none d-md-block ps-0">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="row">
                  <div className="col-12 col-sm-9 col-md-9 col-lg-9">
                    <nav className="navbar">
                      <ul className="w-100">
                        <div className="menu-link-items">
                          <li>
                            <Link to="jwellery">Jwellery</Link>
                          </li>
                          <li>
                            <Link to="about-us">About us</Link>
                          </li>
                          <li>
                            <Link to="bullion">Bullion</Link>
                          </li>
                          <li>
                            <Link to="e-gold">E-gold</Link>
                          </li>
                          <li>
                            <Link to="gifting">Gifting</Link>
                          </li>
                        </div>
                      </ul>
                    </nav>
                  </div>
                  <div className="col-12 col-sm-3 col-md-3 col-lg-3 p-0">
                    <div className="header-icon-list">
                      <ul className="w-100">
                        <li>
                          <a href="/">
                            <img
                              src={searchLogo}
                              alt="Logo"
                              className="image"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <img
                              src={shoppingBagLogo}
                              alt="Logo"
                              className="image"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <img src={heartLogo} alt="Logo" className="image" />
                          </a>
                        </li>
                        <li>
                          <a href="/">
                            <img src={userLogo} alt="Logo" className="image" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;
