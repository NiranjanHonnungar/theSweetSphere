import React, { useEffect, useState } from "react";
import { Footer } from "./container";
import { Break, Modal, Navbar } from "./components";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Products, Feedback, Cart } from "./pages";
import axios from "axios";
import AddressSelect from "./components/AddressSelect/AddressSelect";
const App = () => {
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgRating, setAvgRating] = useState();
  const [addresses, setAddresses] = useState([]);
  const [pastOrders, setPastOrders] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  const getPastOrders = () => {
    axios
      .get(`http://localhost/thesweetsphere/orders.php/${userId}`)
      .then((res) => {
        setPastOrders(res.data);
        console.log(res.data);
      });
  };
  const getAddress = () => {
    if (userId == 0) return;
    axios
      .get(`http://localhost/thesweetsphere/address.php/${userId}`)
      .then((res) => {
        setAddresses(res.data);
      });
  };
  const getCartId = () => {
    axios
      .get(`http://localhost/thesweetsphere/cart.php/${userId}/0`)
      .then((res) => {
        let cartIds = [];
        res.data.forEach((element) => {
          cartIds.push(element["pid"]);
        });
        setCartProducts(cartIds);
        console.log(cartProducts);
      });
  };

  const getFeedback = () => {
    axios.get("http://localhost/thesweetsphere/feedback.php").then((res) => {
      setFeedbacks(res.data);
      let sum = 0;
      let count = 0;
      feedbacks.map((f) => {
        sum += Number(f.rating);
        console.log(f.rating);
        count++;
      });
      setAvgRating(sum / count);
    });
  };

  const getProducts = () => {
    axios.get("http://localhost/thesweetsphere/products.php").then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    console.log("PLEASE CHECK ", userId);
    getCartId();
    getAddress();
    getPastOrders();
  }, [userId]);
  useEffect(() => {
    getProducts();
    getFeedback();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Navbar cid={userId} name={userName} setCid={setUserId} />
        <Break bgColor="dark-blue" gradientColor="pink" height="4vh" />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="login"
              element={
                <Modal
                  type="login"
                  setCid={setUserId}
                  setName={setUserName}
                  setPhoneNumber={setPhoneNumber}
                />
              }
            />
            <Route path="register" element={<Modal type="register" />} />
            <Route
              path="register/address"
              element={<Modal type="register__address" />}
            />
          </Route>
          <Route
            path="products"
            element={
              <Products
                cid={userId}
                products={products}
                cartProducts={cartProducts}
                getCartId={getCartId}
              />
            }
          />
          <Route
            path="cart"
            element={
              <Cart
                cid={userId}
                getCartId={getCartId}
                cartItems={cartItems}
                setcartItems={setCartItems}
                pastOrders={pastOrders}
                getPastOrders={getPastOrders}
                phoneNumber={phoneNumber}
              />
            }
          >
            <Route
              path="address"
              element={
                <AddressSelect
                  getCartId={getCartId}
                  cartProducts={cartProducts}
                  addresses={addresses}
                  cartItems={cartItems}
                  cid={userId}
                  getPastOrders={getPastOrders}
                />
              }
            />
          </Route>
          <Route
            path="feedback"
            element={
              <Feedback
                cid={userId}
                feedbacks={feedbacks}
                avgRating={avgRating}
                getFeedback={getFeedback}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <Header
      title="ABOUT US"
      image={images.welcome}
      imgPos="right"
      bgColor="pink"
      fontColor="dark-blue"
    >
      <p
        className="p__opensans"
        style={{ margin: "2 0rem", color: "var(--color-" + "dark-blue" + ")" }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis
        ullamcorper diam, vitae dapibus purus posuere in. Nam venenatis tempus
        erat ut volutpat. Ut eu bibendum lacus. Aenean fermentum magna nec elit
        elementum consequat ut ut massa. Pellentesque non ex nec augue accumsan
        placerat. Duis quis pharetra augue. Mauris tempor congue faucibus.
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis
        ullamcorper diam, vitae dapibus purus posuere in. Nam venenatis tempus
        erat ut volutpat. Ut eu bibendum lacus. Aenean fermentum magna nec elit
        elementum consequat ut ut massa. Pellentesque non ex nec augue accumsan
        placerat. Duis quis pharetra augue. Mauris tempor congue faucibus.
      </p>
      <button className="custom__button">Click here..</button>
    </Header>
    <Break />
    <Gallery /> */}
      <Break bgColor="dark-blue" gradientColor="pink" height="4vh" />
      <Footer />
    </div>
  );
};

export default App;
