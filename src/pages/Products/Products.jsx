import React from "react";
import "./Products.css";
import { ProductList } from "../../container";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
const Products = ({ cid, products, cartProducts, getCartId }) => {
  const navigate = useNavigate();
  const addRemoveCart = (product, inCart) => {
    if (cid == 0) {
      alert("Not Logged in!");
      navigate("/login");
    }
    if (!inCart) {
      axios
        .post(`http://localhost/thesweetsphere/cart.php/${cid}`, product)
        .then((res) => {
          console.log(res);
          getCartId();
        });
    } else {
      axios
        .delete(
          `http://localhost/thesweetsphere/cart.php/${product.pid}/${cid}`
        )
        .then((res) => {
          console.log(res);
          getCartId();
        });
    }
  };

  return (
    <div className="products">
      <ProductList
        type={"CAKES"}
        products={products}
        cartProducts={cartProducts}
        cid={cid}
        cartToggle={addRemoveCart}
      />
      <ProductList
        type={"BROWNIES"}
        products={products}
        cartProducts={cartProducts}
        cid={cid}
        cartToggle={addRemoveCart}
      />
      <ProductList
        type={"TARTS"}
        products={products}
        cartProducts={cartProducts}
        cid={cid}
        cartToggle={addRemoveCart}
      />
      <ProductList
        type={"CUPCAKES"}
        products={products}
        cartProducts={cartProducts}
        cid={cid}
        cartToggle={addRemoveCart}
      />
      <Outlet />
    </div>
  );
};

export default Products;
