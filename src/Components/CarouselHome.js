import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBanner } from "../services/FrontApp/index.service";
import bannerPlaceholder from "../images/img-placeholder.jpg";

function CarouselHome() {
  const [banners, setBanners] = useState({ desktop: [], mobile: [] });
  const [loadingBanner, setLoadingBanner] = useState(true);

  useEffect(() => {
    (async () => {
      setLoadingBanner(true);
      try {
        const result = await getBanner();
        const desktop = result.data.data.filter(
          (banner) => banner.image_for === "DESKTOP"
        );
        const mobile = result.data.data.filter(
          (banner) => banner.image_for === "MOBILE"
        );

        const preloadImage = (url) => {
          const link = document.createElement("link");
          link.rel = "preload";
          link.as = "image";
          link.href = url;
          document.head.appendChild(link);
        };

        desktop.forEach((banner) => preloadImage(banner.image_path));
        mobile.forEach((banner) => preloadImage(banner.image_path));

        setBanners({ desktop, mobile });
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingBanner(false);
      }
    })();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
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
            {banners.mobile.map((item, key) => (
              <div key={key} className="carouselPaper">
                <img
                  className="carousel-img"
                  src={item.image_path}
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
            {banners.desktop.map((item, key) => (
              <div key={key} className="carouselPaper">
                <img
                  className="carousel-img"
                  src={item.image_path}
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
