import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBanner } from "../services/FrontApp/index.service";
import bannerPlaceholder from "../images/img-placeholder.jpg";

function CarouselHome() {
  const [desktopBanner, setDesktopBanner] = useState([]);
  const [mobileBanner, setMobileBanner] = useState([]);
  const [loadingBanner, setLoadingBanner] = useState(true);

  const getData = async () => {
    setLoadingBanner(true);
    try {
      const result = await getBanner();
      const desktop = result.data.data.filter((banner) => {
        return banner.image_for == "DESKTOP";
      });
      const mobile = result.data.data.filter((banner) => {
        return banner.image_for == "MOBILE";
      });
      setDesktopBanner(desktop);
      setMobileBanner(mobile);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBanner(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slider-container" style={{ minHeight: "632px" }}>
      {loadingBanner ? (
        <div className="w-100">
          <img
            src={bannerPlaceholder}
            alt="placeholder img"
            className="w-100 h-100"
          />
        </div>
      ) : (
        <div className="service-slider">
          <Slider {...settings} className="d-md-none">
            {mobileBanner.map((item, key) => (
              <div key={key} className="carouselPaper">
                <img
                  className="carousel-img"
                  src={`${item.image_path}`}
                  alt="banner carousel img"
                />
                <div className="service-slide-text-wrapper">
                  {/* <h2 className="service-slide-text">{item.name}</h2>
                  <p className="service-slide-description">{item.description}</p> */}
                  {/* <button type="button" className="carousel-explore-now-btn">
                  EXPORE NOW
                  {' '}
                  <img src={rightArrowIcon} alt="rightArrowIcon" />
                </button> */}
                </div>
              </div>
            ))}
          </Slider>
          <Slider {...settings} className="d-none d-md-block">
            {desktopBanner.map((item, key) => (
              <div key={key} className="carouselPaper">
                <img
                  className="carousel-img"
                  src={`${item.image_path}`}
                  alt="banner carousel img"
                />
                <div className="service-slide-text-wrapper">
                  {/* <h2 className="service-slide-text">{item.name}</h2>
                  <p className="service-slide-description">{item.description}</p> */}
                  {/* <button type="button" className="carousel-explore-now-btn">
                  EXPORE NOW
                  {' '}
                  <img src={rightArrowIcon} alt="rightArrowIcon" />
                </button> */}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}

export default CarouselHome;
