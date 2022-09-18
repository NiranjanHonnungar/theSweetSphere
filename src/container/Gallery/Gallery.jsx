import React from "react";
import { SubHeading } from "../../components";
import { images } from "../../constants";
import {
  BsInstagram,
  BsArrowRightShort,
  BsArrowLeftShort,
} from "react-icons/bs";
import "./Gallery.css";

const Gallery = ({
  galleryImages = [
    images.gallery01,
    images.gallery02,
    images.gallery03,
    images.gallery04,
    images.gallery05,
  ],
}) => {
  const scrollRef = React.useRef(null);
  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };
  return (
    <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <SubHeading title="Instagram" fontColor="dark-blue" />
        <h1 className="headtext__cormorant">Photo Gallery</h1>
        <p className="p__opensans" style={{ color: "#AAA", marginTop: "2rem" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          mollis ullamcorper diam, vitae dapibus purus posuere in. Nam venenatis
          tempus erat
        </p>

        <button
          type="button"
          className="custom__button"
          onClick={() =>
            (window.location.href =
              "https://www.instagram.com/the_sweet_sphere/")
          }
        >
          Go to page..
        </button>
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {galleryImages.map((image, index) => (
            <div
              className="app__gallery-images_card flex__center"
              key={`gallery_image-${index + 1}`}
            >
              <img src={image} alt="gallery" />
              <BsInstagram
                className="gallery__image-icon"
                onClick={() => {
                  window.location.href =
                    "https://www.instagram.com/the_sweet_sphere/";
                }}
              />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort
            className="gallery__arrow-icon"
            onClick={() => scroll("left")}
          />
          <BsArrowRightShort
            className="gallery__arrow-icon"
            onClick={() => scroll("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
