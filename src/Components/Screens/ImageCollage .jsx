import React from "react";
import dummyImage from "../../images/dummyImge.jpg.jpg";
import ketutImage from "../../images/pexels-ketut-subiyanto.jpg.jpg";
import Imagenew from "../../images/pexels-ketut-subiyanto-4307734.jpg";

const ImageCollage = () => {
  const images = [
    {
      src: Imagenew,
      alt: "Love Uncut",
    },
    {
      src: dummyImage,
      alt: "Utsava 3½ Muhurtancha",
    },
    {
      src: ketutImage,
      alt: "#NewYou",
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <div className="bg-secondary" style={{ height: "320px" }}></div>
        <div className="">
          <div
            className=" container position-relative"
            style={{ top: "-250px" }}
          >
            <h1 className="our-campaigns mt-4">Our Campaigns</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the
            </p>

            <div className="row mt-5">
              <div className="col-md-8 col-12">
                <img
                  src={images[0].src}
                  alt={images[0].alt}
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-6 col-md-12">
                    <img
                      src={images[1].src}
                      alt={images[1].alt}
                      className="img-fluid rounded mb-2"
                    />
                  </div>
                  <div className="col-6 col-md-12">
                    <img
                      src={images[2].src}
                      alt={images[2].alt}
                      className="img-fluid rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageCollage;
