/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/icons/CSJ_Logo_Brand_color_Eng_final.webp';

import heartLogo from '../images/icons/heart.svg';
import userLogo from '../images/icons/user.svg';
import searchLogo from '../images/icons/search.svg';
import shoppingBagLogo from '../images/icons/shopping-bag.svg';
import menuOpen from '../images/icons/open-menu.svg';
import closeMenu from '../images/icons/close.svg';
import {
  getLiveRateForCSP,
  getMetals,
  getMetalItems,
  getCollectionData,
  getCollectionDetails
} from '../services/FrontApp/index.service';
import AuthModal from './Screens/AuthModal';
import { isLoggedIn } from '../services/auth.service';
// import LoginIcon from "@mui/icons-material/Login"
import { NavigationDropdown } from './Common/NavigationDropdown';
import { SearchDropdown } from './Common/SearchDropdown';
import { ShoppingBag } from './Screens/ShoppingBag';
import {
  Box,
  Button,
  Container,
  IconButton,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import StoresIcon from '../images/icons/StoresIcon-1.png';
import StoresIconBrown from '../images/icons/StoresIcon.png';
import BasicMenu from './Common/Menu';
import { DropdownWrapper } from './style';
import ContainerWrapper from './Common/ContainerWrapper';
import RateCard from './Common/RateCard';

function Header({ openDrawer, handleOpenDrawer }) {
  const isMobile = useMediaQuery('(max-width:768px)');
  const $ = window.jQuery;
  const [rates, setRates] = useState({
    Platinum: 0,
    Silver1: 0,
    Silver2: 0,
    gold: []
  });

  const [open, setOpen] = useState(false);
  // const [openDrawer, setOpenDrawer] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchDropdown, setSearchDropdown] = useState(false);
  const [collections, setCollections] = useState([]);
  const [isCollectionLoading, setIsCollectionLoading] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (showDropdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showDropdown]);

  const [metalTypesData, setMetalTypesData] = useState([]);

  const getMetalData = async () => {
    try {
      const metals = await getMetals();
      const temp = [];
      for (let index = 0; index < metals.data.data.length; index++) {
        const data = metals.data.data[index];
        let itemData = [];
        try {
          var bodyFormData = new FormData();
          bodyFormData.append('metal_type_master_id[0]', data.id);
          const items = await getMetalItems(bodyFormData);
          itemData = items.data.data;
        } catch (error) {}
        temp.push({
          id: data.id,
          metal: data.metal_type,
          metal_items: itemData
        });
      }
      setMetalTypesData(temp);
    } catch (error) {}
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
  const getCollectionData = async () => {
    try {
      setIsCollectionLoading(true);
      const { data: collectionDetails } = await getCollectionDetails();
      setCollections(
        collectionDetails?.data?.map((item) => {
          return {
            id: item.id,
            collectionName: item.collection_name,
            ...(item?.id
              ? { url: `/collection?collectionId=${item.id}&page=1` }
              : null)
          };
        })
      );
    } catch (error) {
      setCollections([]);
    } finally {
      setIsCollectionLoading(false);
    }
  };

  useEffect(() => {
    getData();
    getCollectionData();
    getMetalData();
  }, []);

  useEffect(() => {
    $('.header-content .open-nav-btn').click(function (e) {
      $('.mobile-menu-overlay').css('width', '100%');
    });
    //close menu
    $('.header-content .close-nav-btn').click(function (e) {
      $('.mobile-menu-overlay').css('width', '0');
    });

    $('.header-content .menu-links').click(function (e) {
      $('.mobile-menu-overlay').css('width', '0');
    });
  });

  window.onclick = (event) => {
    if (
      !$(event.target).closest('#search-dropdown-wrapper').length &&
      event.target.id != 'search-logo'
    ) {
      setSearchDropdown(false);
    }
  };

  const schemes = [
    {
      id: 1,
      collectionName: 'Golden Era Scheme',
      url: '/golden-era-scheme'
    },
    {
      id: 2,
      collectionName: 'Golden Dream Scheme',
      url: '/golden-dream-scheme'
    }
  ];

  return (
    <ContainerWrapper
      sx={{
        paddingTop: '0.5rem'
      }}
    >
      <header className="page-header">
        <div className="header-content">
          <div className="col-12 col-md-12 col-lg-12 order-2 order-md-2">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-12">
                <div className="brand-wrapper">
                  <div className="d-md-none d-lg-none mobile-header-bar d-flex justify-content-between align-items-center">
                    <img
                      src={menuOpen}
                      alt="menu-open"
                      className="menu-open open-nav-btn"
                      loading="lazy"
                    />
                    <div className="logo">
                      <Link to="/">
                        <img
                          src={logo}
                          alt="Logo"
                          className="site-logo image text-center"
                          loading="lazy"
                        />
                      </Link>
                    </div>

                    <div className="header-icon-list">
                      <ul style={{ gap: '0.3rem' }}>
                        <li className="p-0">
                          <Link to="/find-a-store">
                            <Tooltip arrow title="Stores" placement="left">
                              {/* <IconButton

                                size="large"
                                className="rounded"
                              > */}
                              {isMobile && (
                                <img
                                  src={StoresIcon}
                                  alt="storesIcon"
                                  onMouseEnter={(e) => {
                                    e.currentTarget.src = StoresIconBrown;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.src = StoresIcon;
                                  }}
                                  loading="lazy"
                                />
                              )}
                              {/* </IconButton> */}
                            </Tooltip>
                          </Link>
                        </li>
                        <li className="p-0">
                          <Tooltip arrow title="Rates" placement="left">
                            <RateCard />
                          </Tooltip>
                        </li>
                        {/* <Link onClick={handleOpenDrawer}>
                            <img
                              src={shoppingBagLogo}
                              alt="Logo"
                              className="image"
                            />
                          </Link> */}
                        {/* <ShoppingBag
                              open={openDrawer}
                              handleOpenDrawer={handleOpenDrawer}
                            /> */}

                        {/* <li>
                          <Link to="/wishlist">
                            <img
                              alt="Logo"
                              src={heartLogo}
                              className="image heart"
                            />
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>

                  <div className="col-12 col-lg-12  d-none d-md-block">
                    <div className="logo-container relative d-flex justify-content-center align-items-center">
                      <div className="logo d-flex justify-content-center">
                        <Link to="/">
                          <img
                            src={logo}
                            onClick={() => window.scrollTo(0, 0)}
                            alt="Logo"
                            className="site-logo image"
                            loading="lazy"
                          />
                        </Link>
                      </div>

                      <div className="col-12 position-absolute">
                        <div className="quick-links-wrapper">
                          <ul className="w-100">
                            <div className="quick-link-items">
                              <li>
                                <RateCard />
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
                      loading="lazy"
                    />
                  </div>
                  <nav className="navbar">
                    {metalTypesData?.length > 0 && (
                      <ul className="w-100">
                        <div className="header-searchbar-wrapper w-100">
                          {/* <div className="col-10 search-wrapper">
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
                        </div> */}
                          <div className="col-2">
                            {/* <Link
                            to="#"
                            className="shopping-logo"
                            onClick={handleOpenDrawer}
                          >
                            <img
                              src={shoppingBagLogo}
                              alt="Logo"
                              className="image"
                            />
                          </Link> */}
                            {/* <ShoppingBag
                              open={openDrawer}
                              handleDrawer={handleOpenDrawer}
                            /> */}
                          </div>
                        </div>
                        {/* <h3 className="drawer-header>POPULAR SEARCHES</h3> */}
                        <div className="d-lg-none">
                          {/* <li className="w-100">
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
                        </li> */}
                          <li className="w-100">
                            <Link className="menu-links" to="/">
                              Home
                            </Link>
                          </li>

                          <div onClick={() => setShowDropdown(!showDropdown)}>
                            {showDropdown && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  width: '99.8dvw',
                                  backgroundColor: '#fff',
                                  borderTop: '0.5px solid #d6d6d6',
                                  zIndex: 9999,
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  px: 6,
                                  py: 4,
                                  transform: showDropdown
                                    ? 'translateY(35px)'
                                    : 'translateY(-10px)'
                                }}
                              >
                                <NavigationDropdown
                                  metalData={metalTypesData}
                                  setShowDropdown={setShowDropdown}
                                />
                              </Box>
                            )}
                            <li>Jewellery</li>
                          </div>
                          {collections?.length > 0 && (
                            <li className="remove-underline">
                              <Box>
                                <BasicMenu
                                  isLoading={isCollectionLoading}
                                  menuTitle="Collection"
                                  children={collections}
                                />
                              </Box>
                            </li>
                          )}
                          <li className="remove-underline">
                            <Box>
                              <BasicMenu
                                menuTitle="Schemes"
                                children={schemes}
                              />
                            </Box>
                          </li>
                          <li className="w-100">
                            <Link className="menu-links" to="/aboutus">
                              About us
                            </Link>
                          </li>
                          <li className="w-100">
                            <Link className="menu-links" to="/enash">
                              E-Mandate
                            </Link>
                          </li>
                        </div>
                      </ul>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-12 order-1 order-md-1 d-none d-md-block ps-0">
            <div className="col-12 col-md-12 col-lg-12">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                  <nav className="navbar">
                    {metalTypesData?.length > 0 && (
                      <ul className="w-100">
                        <div
                          className="menu-link-items "
                          style={{ marginTop: '1.2rem' }}
                        >
                          <li>
                            <Link to="/">Home</Link>
                          </li>
                          <div
                            onMouseEnter={() => setShowDropdown(true)}
                            onMouseLeave={() => setShowDropdown(false)}
                            style={{
                              marginTop: '-0.2rem'
                            }}
                          >
                            <DropdownWrapper showDropdown={showDropdown}>
                              {showDropdown && (
                                <NavigationDropdown
                                  metalData={metalTypesData}
                                  setShowDropdown={setShowDropdown}
                                />
                              )}
                            </DropdownWrapper>

                            <li>Jewellery</li>
                          </div>
                          {collections?.length > 0 && (
                            <li className="remove-underline">
                              <Box>
                                <BasicMenu
                                  isLoading={isCollectionLoading}
                                  menuTitle="Collection"
                                  children={collections}
                                />
                              </Box>
                            </li>
                          )}
                          <li className="remove-underline">
                            <Box>
                              <BasicMenu
                                menuTitle="Schemes"
                                children={schemes}
                              />
                            </Box>
                          </li>
                          <li>
                            <Link to="/aboutus">About us</Link>
                          </li>
                          <li>
                            <Link to="/enash">E-Mandate</Link>
                          </li>
                          {/* <li>
                          <Link to="/bullions">Bullion</Link>
                        </li>
                        <li>
                            <Link to="e-gold">E-gold</Link>
                          </li>
                        <li>
                            <Link to="gifting">Gifting</Link>
                        </li> */}
                        </div>
                      </ul>
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {searchDropdown && (
        <div
          id="search-dropdown-wrapper"
          className="dropdown-wrapper position-sticky"
          style={{ position: 'sticky', top: '120px', zIndex: '2' }}
        >
          <SearchDropdown setSearchDropdown={setSearchDropdown} />
        </div>
      )}
    </ContainerWrapper>
  );
}

export default Header;
