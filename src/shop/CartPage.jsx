import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";
import CheckOutPage from "./CheckOutPage";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    //FETCH CART ITEM FORM LOCAL STORAGE
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

  //CALCULATE PRICES
  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };
  //   HANDLE QUANTITY INCREASE
  const handleIncrease = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);
    //  UPDATE LOCAL STOREGE WIHT NEW CART ITEMS
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]); // make new array for React to detect change
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };
  //HANDLE ITEM REMOVE
  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartitem) => {
      return cartitem.id != item.id;
    });
    // UPDATE NEW CART
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };
  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  //CART SUBTOTAL
  const cartSubtotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  //ORDER TOTAL
  const orderTotal = cartSubtotal;

  return (
    <div>
      <PageHeader title={"Shop Cart"} curpage={"Cart Page"} />
      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {/* CART TOP */}
            <div className="cart-top">
              <table>
                <thead>
                  <tr>
                    <th className="cat-product">Product</th>
                    <th className="cat-price">Price</th>
                    <th className="cat-quantity">Quantity</th>
                    <th className="cat-toprice">Total</th>
                    <th className="cat-edit">Edit</th>
                  </tr>
                </thead>
                {/* TABLE BODY */}
                {cartItems.map((item, i) => (
                  <tr key={i}>
                    <td className="product-item cat-product">
                      <div className="p-thumb">
                        <Link to="/shop">
                          <img src={item.img} alt="" />
                        </Link>
                      </div>
                      <div className="p-content">
                        <Link to="/shop">{item.name}</Link>
                      </div>
                    </td>
                    <td className="cat-price">${item.price}</td>
                    <td className="cat-quantity">
                      <div className="cart-plus-minus">
                        <div
                          className="dec qtybutton"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </div>
                        <input
                          type="text"
                          className="cart-plus-minus-box"
                          name="qtybutton"
                          value={item.quantity}
                        />
                        <div
                          className="inc qtybutton"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td className="cat-toprice">
                      ${calculateTotalPrice(item)}
                    </td>
                    <td className="cat-edit">
                      <a href="#" onClick={() => handleRemoveItem(item)}>
                        <img src={delImgUrl} alt="" />
                      </a>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            {/* CART TOP ENDS */}
            {/* CART BOTTOM */}
            <div className="cart-bottom">
              {/* CHECKOUT BOX */}
              <div className="cart-checkout-box">
                <form className="coupon">
                  <input
                    className="cart-page-input-box"
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Enter Coupon.."
                  />
                  <input type="submit" value="Apply Coupon" />
                </form>

                <form className="cart-checkout">
                  <input type="submit" value="Update Cart" />
                  <div><CheckOutPage/></div>
                </form>
              </div>
              {/* CHECKOUT BOX ENDS */}
              {/* SHOPPING BOX */}
              <div className="shipping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Calculate Shipping</h3>
                      <div className="outline-select">
                        <select>
                          <option value="uk">UNITED KINGDOM(UK)</option>
                          <option value="usa">UNITED STATES(USA)</option>
                          <option value="ind">INDIA</option>
                        </select>
                      </div>

                      <div className="outline-select shipping-select">
                        <select>
                          <option value="uk">LONDON</option>
                          <option value="usa">NEW YORK</option>
                          <option value="ind">NEW DELHI</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="postalCode/ZIP*"
                      />
                      <button type="submit">Update Address</button>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="cart-overview">
                      <h3>Cart Total</h3>
                      <ul className="lab-ul">
                        <li>
                          <span className="pull-left">Cart Subtotal</span>
                          <p className="pull-right">${cartSubtotal}</p>
                        </li>
                         <li>
                          <span className="pull-left">Shipping and Handling</span>
                          <p className="pull-right">Free</p>
                        </li>
                         <li>
                          <span className="pull-left">Order Total</span>
                          <p className="pull-right">${orderTotal.toFixed(2)}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
