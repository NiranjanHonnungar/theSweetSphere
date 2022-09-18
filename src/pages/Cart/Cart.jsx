import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { OrderComp } from "../../components";
import { products } from "../../constants";
import "./Cart.css";
const Cart = ({
  cid,
  getCartId,
  cartItems,
  setcartItems,
  pastOrders,
  getPastOrders,
  phoneNumber,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const deleteCartProduct = (pid) => {
    axios
      .delete(`http://localhost/thesweetsphere/cart.php/${pid}/${cid}`)
      .then((res) => {
        console.log(res);
        getCartId();
        getCartItems();
      });
  };
  const onOrder = () => {
    if (cid == 0) {
      alert("Not signed in!");
      return;
    }
    if (cartItems == []) {
      alert("Cart empty!");
      return;
    }
    navigate("address");
  };

  const getCartItems = () => {
    axios
      .get(`http://localhost/thesweetsphere/cart.php/${cid}/1`)
      .then((res) => {
        setcartItems(res.data);
      });
  };
  const getTotalPrice = () => {
    let sum = 0;
    cartItems.map((prod) => {
      sum += Number(prod.quantity) * Number(prod.price);
    });
    setTotalPrice(sum);
  };
  useEffect(() => {
    getCartItems();
    getPastOrders();
  }, []);

  useEffect(() => {
    getTotalPrice();
  });
  return (
    <div className="cart__orders">
      <div className="cart section__padding">
        <div
          className="underline"
          style={{ width: "100%", marginBottom: "2rem" }}
        ></div>
        <div className="order__heading">CART</div>

        <div className="cart-row">
          <span className="cart-item cart-header cart-column">ITEM</span>
          <span className="cart-price cart-header cart-column">PRICE</span>
          <span className="cart-quantity cart-header cart-column">
            QUANTITY
          </span>
        </div>
        <div className="cart-items">
          {cartItems.map((product, idx) => {
            return (
              <CartRow
                cid={cid}
                cartProduct={product}
                deleteCartProduct={deleteCartProduct}
                getCartItems={getCartItems}
                key={idx}
              />
            );
          })}
        </div>
        <div className="cart-total">
          <div className="cart-total-title">
            <strong>TOTAL:</strong>
            <span className="cart-total-price">₹ {totalPrice}</span>
          </div>
          <button className="purchase-button" role="button" onClick={onOrder}>
            PURCHASE
          </button>
        </div>
        <Outlet />
      </div>

      {cid != 0 && (
        <div className="orders section__padding">
          <div
            className="underline"
            style={{ width: "100%", marginBottom: "2rem" }}
          ></div>
          <div className="order__heading">PAST ORDERS</div>
          <div className="orders__list">
            {Object.keys(pastOrders).map((key) => {
              return (
                <div className="order__summary_card">
                  <OrderComp
                    orderId={key}
                    phoneNumber={phoneNumber}
                    order={pastOrders[key]}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const CartRow = ({ cartProduct, deleteCartProduct, cid, getCartItems }) => {
  const [qty, setQty] = useState(cartProduct.quantity);
  const updateQty = () => {
    const prod = {
      pid: cartProduct.pid,
      qty: Number(qty),
    };
    axios
      .put(`http://localhost/thesweetsphere/cart.php/${cid}`, prod)
      .then((res) => {
        console.log(res.data);
        getCartItems();
      });
  };
  const onDelete = () => {
    deleteCartProduct(cartProduct.pid);
  };
  return (
    <div className="cart__cart-row">
      <div className="cart-item cart-column">
        <img className="cart-item-image" src={products[cartProduct.imgAlt]} />
        <div className="cart-item-name">
          <span className="cart-item-title">{cartProduct.pname}</span>
          <p className="p__opensans cart-item-description">
            {cartProduct.description}
          </p>
        </div>
      </div>
      <span className="cart-price cart-column">₹ {cartProduct.price}</span>
      <div className="cart-quantity cart-column">
        <input
          className="cart-quantity-input"
          type="number"
          value={qty}
          onChange={(e) => {
            if (e.target.value <= 0 || isNaN(e.target.value)) setQty(1);
            else setQty(e.target.value);
          }}
          onMouseLeave={updateQty}
        />
        <button
          className="cart-quantity-button"
          role="button"
          onClick={onDelete}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};
export default Cart;
