import React, { useEffect } from "react";
import { useState } from "react";
import { products as prodImg } from "../../constants";
import "./ProductList.css";
const ProductList = ({ type, products, cartToggle, cartProducts }) => {
  useEffect(() => {
    console.log(cartProducts);
  }, []);
  return (
    <div className="products__section">
      <div className="products__heading">
        <div className="underline" style={{ width: "60%" }}></div>
        {type}
        <div className="underline" style={{ width: "50%" }}></div>
      </div>
      <div className={`products__product-list  type__${type}`}>
        {products.map((prod, idx) => {
          let buttonText = "Add to Cart!";
          let inTheCart = false;
          if (prod.type === type.toLowerCase()) {
            if (Array.isArray(cartProducts))
              if (cartProducts.includes(prod.pid)) {
                buttonText = "Added!";
                inTheCart = true;
              }
            return (
              <ProductCard
                buttonText={buttonText}
                inTheCart={inTheCart}
                cartToggle={cartToggle}
                product={prod}
                key={`product-${idx + 1}`}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

const ProductCard = ({ product, cartToggle, buttonText, inTheCart }) => {
  const [inCart, setInCart] = useState(inTheCart);
  const [button, setButton] = useState(buttonText);
  const onClick = () => {
    if (!inCart) setButton("Added!");
    else setButton("Add to Cart");
    cartToggle(product, inCart);
    setInCart((inCart) => !inCart);
  };
  return (
    <div className="products__product-card">
      <img className="product-item-image" src={prodImg[product.imgAlt]} />
      <h2 className="product-item-title">{product.pname}</h2>
      <p className="product-item-desc">{product.description}</p>
      <div className="other">
        <p className="product-item-price">₹ {product.price}</p>
        <button className="atc-button" onClick={onClick}>
          {button}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
