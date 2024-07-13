import * as React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import ImageSliderCardHome from "./ImageSliderCardHome";
import useWindowWidthAndHeight from "../utilities/CustomHooks";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import _ from "lodash";

function ImageSliderHome({
  height,
  width,
  data,
  padding,
  CardImageType,
  className,
  imagesArray,
  isSlideArrowEnabled = true,
}) {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  const windoDimensions = useWindowWidthAndHeight();
  console.log(activePageIndex, "page");

  return (
    <>
      {windoDimensions[0] >= 768 && (
        <div
          className={
            padding === 0
              ? "image-slider-navigation-icon image-slider-navigation-icon-no-width"
              : "image-slider-navigation-icon"
          }
        >
          {isSlideArrowEnabled && (
            <>
              <button
                className={`arrow-icon-generic round-border ${
                  activePageIndex === 0 ? "disabled" : ""
                }`}
                type="button"
                onClick={prev}
                disabled={activePageIndex === 0}
              >
                <WestIcon />
              </button>
              <button
                className={`arrow-icon-generic round-border ${
                  activePageIndex === pages.length - 1 ? "disabled" : ""
                }`}
                type="button"
                onClick={next}
                disabled={activePageIndex === pages.length - 1}
              >
                <EastIcon />
              </button>
            </>
          )}
        </div>
      )}
      <ul className={`image-slider-component ${className}`} ref={scrollRef}>
        {CardImageType === "Favourites" && windoDimensions[0] <= 768
          ? _.chunk(data, 4).map((item, key) => (
              <div className="item-section" key={key}>
                {item.map((inneritem, index) => (
                  <ImageSliderCardHome
                    CardImageType={CardImageType}
                    key={index}
                    CardImage={inneritem.img}
                    name={inneritem.name}
                  />
                ))}
              </div>
            ))
          : data.map((item, index) => (
              <ImageSliderCardHome
                CardImageType={CardImageType}
                height={height}
                width={width}
                key={index}
                CardImage={item.img}
                padding={padding}
                name={item.name}
              />
            ))}
      </ul>
      {CardImageType === "Favourites" && windoDimensions[0] < 768 && (
        <ol
          style={{
            display: "flex",
            justifyContent: "center",
            paddingLeft: "0",
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          {pages.map((_, i) => (
            <button
              key={i}
              className="image-scroll-navigation"
              style={i === activePageIndex ? { opacity: 0.5 } : {}}
              onClick={() => goTo(i)}
            ></button>
          ))}
        </ol>
      )}
    </>
  );
}
export default ImageSliderHome;
