import React from "react";
import { images } from "../../constants";
import { Header, Gallery } from "../../container";
import { Break } from "../../components";
import { useNavigate, Outlet } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home">
      <Header
        title="ABOUT US"
        image={images.welcome}
        imgPos="right"
        bgColor="pink"
        fontColor="dark-blue"
      >
        <p
          className="p__opensans"
          style={{
            margin: "2 0rem",
            color: "var(--color-" + "dark-blue" + ")",
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          mollis ullamcorper diam, vitae dapibus purus posuere in. Nam venenatis
          tempus erat ut volutpat. Ut eu bibendum lacus. Aenean fermentum magna
          nec elit elementum consequat ut ut massa. Pellentesque non ex nec
          augue accumsan placerat. Duis quis pharetra augue. Mauris tempor
          congue faucibus.
        </p>
      </Header>
      <Break />
      <Header
        title="OUR PRODUCTS"
        image={images.productSection}
        imgPos="left"
        bgColor="dark-blue"
        fontColor="blue"
      >
        {" "}
        <p
          className="p__opensans"
          style={{ margin: "2 0rem", color: "var(--color-" + "blue" + ")" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          mollis ullamcorper diam, vitae dapibus purus posuere in. Nam venenatis
          tempus erat ut volutpat. Ut eu bibendum lacus. Aenean fermentum magna
          nec elit elementum consequat ut ut massa. Pellentesque non ex nec
          augue accumsan placerat. Duis quis pharetra augue. Mauris tempor
          congue faucibus.
        </p>
        <button
          className="custom__button"
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
        >
          Click here..
        </button>
      </Header>
      <Break />
      <Gallery />
      <Outlet />
    </div>
  );
};

export default Home;
