import React, { useState } from "react";
import logo from "../images/icons/logo.svg";
import rightArrowIcon from "../images/icons/right-arrow.svg";
import facebookIcon from "../images/icons/social-media/facebook.svg";
import instagramIcon from "../images/icons/social-media/instagram.svg";
import twitterIcon from "../images/icons/social-media/twitter.svg";
import { Link, useNavigate } from "react-router-dom";
import { subscribeEmail } from "../services/FrontApp/index.service";
import ErrorList from "./Common/ErrorList";
import SuccessMsg from "./Common/SuccessMsg";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

function Footer() {
  const [errors, setErrors] = useState([]);
  const [successMsg, setSuccesMsg] = useState("");
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = ({ target }) => {
    data[target.name] = target.value;
    const temp = Object.assign({}, data);
    setData(temp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    setSuccesMsg("");
    try {
      const result = await subscribeEmail(data);
      setSuccesMsg(result.data.message);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };

  let navigate = useNavigate();
  const navigateToFindStore = () => {
    let path = `/find-a-store`;
    navigate(path);
  };
  return (
    <>
      <div className="whatsapp-button">
        <a
          target="_blank"
          href="https://api.whatsapp.com/send?phone=+917719991827&text=hlo"
        >
          <WhatsAppIcon /> <span> WhatsApp Us! </span>
        </a>
      </div>
      <footer>
        <div className="footer-container">
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Logo" className="image site-logo-footer" />
            </a>
          </div>
          <div className="col-12 col-md-12 col-lg-12 footer-containt">
            <div className="row">
              <div className="col-12 col-md-12 col-lg-8 position-relative">
                <div className="row">
                  <div className="col-xl-4 col-lg-5 col-md-6 col-sm-6 col-6">
                    <div className="row">
                      <div className="col-lg-12">
                        <p className="mb-2">
                          <span>Email: </span> care@csjewels.com
                        </p>
                        <p className="mb-4">
                          <span>Phone: </span> 07969991827
                        </p>
                        <p className="address">
                          S.No.558, Ground Floor, Indraprastha Plus, Near Apollo
                          Theatre, Rasta Peth, Pune - 411011
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-7 col-md-6 col-sm-6 col-6">
                    <div className="row">
                      <div className="col-lg-6">
                        <Link to="/aboutus" className="btn btn-link">
                          About us
                        </Link>
                        {/* <a href="/news-&-blog" className="btn btn-link">
                          News & Blogs
                        </a> */}
                        <Link to="/contact-us" className="btn btn-link">
                          Contact us
                        </Link>
                        <Link to="/contact-us" className="btn btn-link">
                          Help & Support
                        </Link>
                      </div>
                      <div className="col-lg-6">
                        <Link to="/privacy-policy" className="btn btn-link">
                          Privacy Policy
                        </Link>
                        <a
                          href="/terms-and-conditions"
                          className="btn btn-link"
                        >
                          Terms & Condition
                        </a>
                        {/* <a href="/" className="btn btn-link">
                        Shipping Policy
                      </a> */}
                        <Link to="/CSR-Policy" className="btn btn-link">
                          CSR Policy
                        </Link>
                        <Link to="/refund-policy" className="btn btn-link">
                          Return/Refund & Cancelation Policy
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-7 ">
                    <button
                      onClick={navigateToFindStore}
                      type="button"
                      className="mt-3"
                    >
                      Find A Store
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-12 col-md-8 col-lg-4"> */}
            <ErrorList errors={errors} />
            <SuccessMsg message={successMsg} />

            <div className="social-media-wrapper">
              <h6>Follow us on</h6>
              <a
                href="https://www.facebook.com/CSjewelss/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={facebookIcon}
                  alt="facebookIcon"
                  className="social-media-icon"
                />
              </a>

              <a
                href="https://www.instagram.com/csjewelsofficial/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagramIcon}
                  alt="instagramIcon"
                  className="social-media-icon"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/chandukaka-saraf-jewels/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={twitterIcon}
                  alt="twitterIcon"
                  className="social-media-icon"
                />
              </a>
            </div>
            {/* </div> */}
          </div>
          <div className="copyright">
            <p>2023 © Chandukaka Saraf & Sons Pvt. Ltd . Powered by Listany</p>
          </div>
        </div>
        <hr className="footer-hr" />
      </footer>
    </>
  );
}

export default Footer;
