/** @format */

import React, {useState} from "react"
import logo from "../images/icons/CSJ_Logo_Brand_color_Eng_final.webp"
import {Link, useNavigate} from "react-router-dom"
import {subscribeEmail} from "../services/FrontApp/index.service"
import ErrorList from "./Common/ErrorList"
import SuccessMsg from "./Common/SuccessMsg"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import YouTubeIcon from "@mui/icons-material/YouTube"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PinterestIcon from "@mui/icons-material/Pinterest"
import {createTheme, IconButton, ThemeProvider} from "@mui/material"
const theme = createTheme({
  palette: {
    primary: {
      main: "#672A2F",
    },
  },
})
function Footer() {
  const [errors, setErrors] = useState([])
  const [successMsg, setSuccesMsg] = useState("")
  const [data, setData] = useState({
    email: "",
  })

  const handleChange = ({target}) => {
    data[target.name] = target.value
    const temp = Object.assign({}, data)
    setData(temp)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrors([])
    setSuccesMsg("")
    try {
      const result = await subscribeEmail(data)
      setSuccesMsg(result.data.message)
    } catch (error) {
      setErrors(error.response.data.message)
    }
  }

  let navigate = useNavigate()
  const navigateToFindStore = () => {
    let path = `/find-a-store`
    navigate(path)
  }
  return (
    <>
      {/* <div className="whatsapp-button">
        <a
          target="_blank"
          href="https://api.whatsapp.com/send?phone=+917719991827&text=hlo"
        >
          <WhatsAppIcon />
        </a>
      </div> */}
      <ThemeProvider theme={theme}>
        <footer>
          <div className="footer-container">
            <div className="logo">
              <a href="/">
                <img src={logo} alt="Logo" className="image site-logo-footer" />
              </a>
            </div>
            <div className="col-12 col-md-12 col-lg-12 footer-containt">
              <div className="row">
                <div className="col-12 col-md-12 position-relative">
                  <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-6 col-6">
                      <div className="row">
                        <div className="col-lg-12">
                          <p className="mb-2">
                            <span className="d-block d-sm-inline">Email: </span>{" "}
                            care@csjewels.com
                          </p>
                          <p className="mb-4">
                            <span className="d-block d-sm-inline">Phone: </span>{" "}
                            0796-999-1827
                          </p>
                          <p className="address">
                            Chandukaka Saraf Jewels Pvt. Ltd. Office no. 17 &
                            18, Indraprastha Plus Complex, Moodliar Road, Somwar
                            Peth, Pune, Maharashtra - 411011.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-6 col-sm-6 col-6">
                      <div className="row">
                        <div className="col-lg-6 footer-menu">
                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            to="/aboutus"
                            className="btn btn-link"
                          >
                            About us
                          </Link>
                          {/* <a href="/news-&-blog" className="btn btn-link">
                          News & Blogs
                        </a> */}
                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            to="/contact-us"
                            className="btn btn-link"
                          >
                            Contact us
                          </Link>
                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            to="/contact-us"
                            className="btn btn-link"
                          >
                            Help & Support
                          </Link>
                        </div>
                        <div className="col-lg-6 footer-menu">
                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            to="/privacy-policy"
                            className="btn btn-link"
                          >
                            Privacy Policy
                          </Link>
                          <a
                            onClick={() => window.scrollTo(0, 0)}
                            href="/terms-and-conditions"
                            className="btn btn-link"
                          >
                            Terms & Conditions
                          </a>

                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            to="/CSR-Policy"
                            className="btn btn-link"
                          >
                            CSR Policy
                          </Link>
                          <Link
                            onClick={() => window.scrollTo(0, 0)}
                            to="/refund-policy"
                            className="btn btn-link"
                          >
                            Return/Refund & Cancelation Policy
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-7 ">
                      <button
                        onClick={navigateToFindStore}
                        type="button"
                        className="mt-3 btn-find-store "
                      >
                        Find A Store
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <ErrorList errors={errors} />
              <SuccessMsg message={successMsg} />
              <div className="social-media-wrapper d-block w-100 text-center text-md-start">
                <h6>Follow us on</h6>
                <div
                  className="d-flex gap-3 justify-content-center justify-content-md-start"
                >
                  <a
                    // href="https://www.facebook.com/CSjewelss/"
                    href="https://www.facebook.com/csjewel1827"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                      <FacebookIcon color="primary" fontSize="large" />
                  </a>

                  <a
                    href="https://www.instagram.com/csjewelsofficial/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon color="primary" fontSize="large" />

                  </a>
                  <a
                    href="https://www.youtube.com/@csjewels1827"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YouTubeIcon color="primary" fontSize="large" />

                  </a>
                  <a
                    href="https://www.linkedin.com/company/chandukaka-saraf-jewels/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon color="primary" fontSize="large" />
                  </a>
                  <a
                    href="https://pin.it/5AOLorOQj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PinterestIcon color="primary" fontSize="large" />

                  </a>
                </div>
              </div>
            </div>
            <hr className="footer-hr" />
            <div className="copyright text-center">
              <p className=" mb-0">
                2025 © Chandukaka Saraf Jewels Pvt. Ltd. Powered by{" "}
                <a
                  className="text-secondary text-decoration-none"
                  href="https://www.techneai.com/"
                  target="_blank"
                >
                  Techne ai
                </a>
              </p>
            </div>
          </div>
        </footer>
      </ThemeProvider>
    </>
  )
}

export default Footer
