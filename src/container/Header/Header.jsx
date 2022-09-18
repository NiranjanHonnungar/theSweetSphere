import { tab } from "@testing-library/user-event/dist/tab";
import React from "react";
import { MdTabUnselected } from "react-icons/md";
import { SubHeading } from "../../components";
import { data, images } from "../../constants";
import "./Header.css";

const Header = ({ children, title, image, imgPos, bgColor, fontColor }) => (
  <div
    className="app__header app__wrapper section__padding"
    style={{
      backgroundColor: "var(--color-" + bgColor + ")",
    }}
    id="aboutUs"
  >
    {imgPos == "right" && (
      <div className="app__wrapper_info">
        <SubHeading title={title} fontColor={fontColor} />
        {children}
      </div>
    )}
    <div
      className={`app__wrapper_img ${
        imgPos == "right" ? "flex__end" : "flex__start"
      }`}
    >
      <img src={image} style={{ marginBottom: "2rem" }} />
    </div>
    {imgPos == "left" && (
      <div className="app__wrapper_info">
        <SubHeading title={title} fontColor={fontColor} />
        {children}
      </div>
    )}
  </div>
);

export default Header;
