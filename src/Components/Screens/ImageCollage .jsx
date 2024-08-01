import React from "react";

const ImageCollage = () => {
  const images = [
    {
      src: "/static/media/dimoand_neckless.e182e18743d4af7bcf89.jpg",
      alt: "Love Uncut",
    },
    {
      src: "/static/media/earrings_2.5fbc2690c0f781bbe16d.jpg",
      alt: "Utsava 3½ Muhurtancha",
    },
    {
      src: "/static/media/earrings_2.5fbc2690c0f781bbe16d.jpg",
      alt: "#NewYou",
    },
  ];

  return (
    <div className="collage-container">
      <div className="collage-item large">
        <img src={images[0].src} alt={images[0].alt} />
        <div className="caption">{images[0].alt}</div>
      </div>
      <div className="collage-item small">
        <img src={images[1].src} alt={images[1].alt} />
        <div className="caption">{images[1].alt}</div>
      </div>
      <div className="collage-item small">
        <img src={images[2].src} alt={images[2].alt} />
        <div className="caption">{images[2].alt}</div>
      </div>
    </div>
  );
};

export default ImageCollage;
