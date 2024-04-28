import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/icons/logo.svg";
import heartLogo from "../images/icons/heart.svg";
import userLogo from "../images/icons/user.svg";
import searchLogo from "../images/icons/search.svg";
import shoppingBagLogo from "../images/icons/shopping-bag.svg";
import menuOpen from "../images/icons/open-menu.svg";
import closeMenu from "../images/icons/close.svg";
import { getLiveRateForCSP, getMetals, getMetalItems } from "../services/FrontApp/index.service";
import AuthModal from "./Screens/AuthModal";
import { isLoggedIn } from "../services/auth.service";
import LoginIcon from "@mui/icons-material/Login";
import { NavigationDropdown } from "./Common/NavigationDropdown";
import { SearchDropdown } from "./Common/SearchDropdown";

function Header({ openDrawer, handleOpenDrawer }) {
  const $ = window.jQuery;
  const [rates, setRates] = useState({
    Platinum: 0,
    Silver1: 0,
    Silver2: 0,
    gold: [],
  });

  const [open, setOpen] = useState(false);
  // const [openDrawer, setOpenDrawer] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const [metalTypesData, setMetalTypesData] = useState([]);

  const getMetalData = async () => {
    try {
      const metals = await getMetals();
      const temp = []
      for (let index = 0; index < metals.data.data.length; index++) {
        const data = metals.data.data[index];
        let itemData = [];
        try {
          var bodyFormData = new FormData();
          bodyFormData.append('metal_type_master_id[0]', data.id);
          const items = await getMetalItems(bodyFormData);
          itemData = items.data.data;
        } catch (error) { }
        temp.push({
          id: data.id,
          metal: data.metal_type,
          metal_items: itemData
        })
      }
      setMetalTypesData(temp)
    } catch (error) { }
  };

  const getData = async () => {
    try {
      const result = await getLiveRateForCSP();
      const { Platinum, Silver1, Silver2, ...gold } = result.data.data;
      setRates({ Platinum, Silver1, Silver2, gold });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getMetalData();
  }, []);

  useEffect(() => {
    $(".header-content .open-nav-btn").click(function (e) {
      $(".mobile-menu-overlay").css("width", "100%");
    });
    //close menu
    $(".header-content .close-nav-btn").click(function (e) {
      $(".mobile-menu-overlay").css("width", "0");
    });
  });

  window.onclick = (event) => {
    if (!$(event.target).closest('#navigation-dropdown-wrapper').length && event.target.id != "jewellery-link") {
      setShowDropdown(false);
    }
    if (!$(event.target).closest('#search-dropdown-wrapper').length && event.target.id != "search-logo") {
      setSearchDropdown(false);
    }
  };

  return (
    <>
      <header className="page-header">
        <hr className="header-hr d-none d-md-block " />
        <div className="header-content">
          <div className="col-12 col-md-12 col-lg-12 order-2 order-md-2">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="brand-wrapper">
                  <div className="d-md-none d-lg-none mobile-header-bar">
                    <img
                      src={menuOpen}
                      alt="menu-open"
                      className="menu-open open-nav-btn"
                    />
                    <div className="logo">
                      <Link to="/">
                        <img src={logo} alt="Logo" className="image" />
                      </Link>
                    </div>
                    <div className="header-icon-list">
                      <ul>
                        <li>
                          <Link onClick={handleOpenDrawer}>
                            <img
                              src={shoppingBagLogo}
                              alt="Logo"
                              className="image"
                            />
                          </Link>
                          {/* <ShoppingBag
                              open={openDrawer}
                              handleOpenDrawer={handleOpenDrawer}
                            /> */}
                        </li>
                        <li>
                          <Link to="/wishlist">
                            <img
                              alt="Logo"
                              src={heartLogo}
                              className="image heart"
                            />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-lg-12  d-none d-md-block">
                    <div className="row position-relative">
                      <div className="logo">
                        <Link to="/">
                          <img src={logo} alt="Logo" className="image" />
                        </Link>
                      </div>
                      <div className="col-8 p-0 position-absolute end-0 h-100">
                        <div className="quick-links-wrapper">
                          <ul className="w-100">
                            <div className="quick-link-items">
                              <li>
                                <small>
                                  GOLD - ₹
                                  {rates.gold["24.00"]
                                    ? rates.gold["24.00"]
                                    : 0}
                                </small>
                              </li>
                              <li>
                                <small>SILVER - ₹{rates.Silver1}</small>
                              </li>
                              <li>
                                <Link to="/find-a-store">FIND A STORE</Link>
                              </li>
                              <li>
                                <Link to="/contact-us">SUPPORT</Link>
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
                      <div className="header-searchbar-wrapper w-100">
                        <div className="col-10 search-wrapper">
                          <input
                            type="text"
                            className="search-input col-9 col-md-9"
                            placeholder="Search for a product"
                          />
                          <img
                            src={searchLogo}
                            alt="Logo"
                            className="search-logo"
                          />
                        </div>
                        <div className="col-2">
                          <Link
                            to="#"
                            className="shopping-logo"
                            onClick={handleOpenDrawer}
                          >
                            <img
                              src={shoppingBagLogo}
                              alt="Logo"
                              className="image"
                            />
                          </Link>
                          {/* <ShoppingBag
                              open={openDrawer}
                              handleDrawer={handleOpenDrawer}
                            /> */}
                        </div>
                      </div>
                      <h3 className="drawer-header">POPULAR SEARCHES</h3>
                      <div className="d-lg-none">
                        <li className="w-100">
                          <Link to="/" className="menu-link">
                            Fancy Earrings
                          </Link>
                        </li>
                        <li className="w-100">
                          <Link to="/" className="menu-link">
                            Gift under 10k
                          </Link>
                        </li>
                        <li className="w-100">
                          <Link to="/" className="menu-link">
                            Every day Necklaces
                          </Link>
                        </li>
                        <li className="w-100">
                          <Link to="/" className="menu-link">
                            Diamonds Mangalsutra
                          </Link>
                        </li>
                        <li className="w-100">
                          <Link to="/" className="menu-link">
                            Office wear earrings
                          </Link>
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
                <div className="col-12 col-sm-10 col-md-10 col-lg-10">
                  <nav className="navbar">
                    <ul className="w-100">
                      <div className="menu-link-items">
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li>
                          <div
                            id="jewellery-link"
                            onClick={() => {
                              setShowDropdown(true);
                            }}
                          >
                            Jewellerys
                          </div>
                        </li>
                        <li>
                          <Link to="/aboutus">About us</Link>
                        </li>
                        <li>
                          <Link to="/bullions">Bullion</Link>
                        </li>
                        {/* <li>
                            <Link to="e-gold">E-gold</Link>
                          </li> */}
                        {/* <li>
                            <Link to="gifting">Gifting</Link>
                        </li> */}
                      </div>
                    </ul>
                  </nav>
                </div>
                <div className="col-12 col-sm-2 col-md-2 col-lg-2 p-0">
                  <div className="header-icon-list">
                    <ul className="w-100">
                      <li>
                        <Link onClick={() => setSearchDropdown(true)}>
                          <img
                            src={searchLogo}
                            alt="Logo"
                            className="image"
                            id="search-logo"
                          />
                        </Link>
                      </li>
                      <li>
                        <Link onClick={handleOpenDrawer}>
                          <img
                            src={shoppingBagLogo}
                            alt="Logo"
                            className="image"
                          />
                        </Link>
                        {/* <ShoppingBag open={openDrawer} handleDrawer = {handleOpenDrawer} /> */}
                      </li>
                      <li>
                        <Link to="/wishlist">
                          <img
                            src={heartLogo}
                            alt="Logo"
                            className="image heart"
                          />
                        </Link>
                      </li>

                      {isLoggedIn() ? (
                        <li>
                          <Link to="/dashboard/myorder">
                            <img
                              src={userLogo}
                              alt="Logo"
                              className="image"
                            />
                          </Link>
                        </li>
                      ) : (
                        <li className="/login-icon">
                          <Link
                            onClick={handleOpenDialog}
                            className="image"
                            style={{ color: "#A3A3A3" }}
                          >
                            <LoginIcon />
                          </Link>
                          <AuthModal
                            open={open}
                            handleClose={handleCloseDialog}
                          />
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {showDropdown && (
        <div
          id="navigation-dropdown-wrapper"
          className="dropdown-wrapper"
        >
          <NavigationDropdown metalData={metalTypesData} setShowDropdown={setShowDropdown} />
        </div>
      )}
      {searchDropdown && (
        <div
          id="search-dropdown-wrapper"
          className="dropdown-wrapper position-sticky"
          style={{position: 'sticky', top: '120px', zIndex:'2'}}
        >
          <SearchDropdown setSearchDropdown={setSearchDropdown} />
        </div>
      )}
    </>
  );
}

export default Header;
