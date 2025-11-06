import React, { useState } from "react";
import { Link } from "react-router-dom";

const desc =
  " It provides the necessary information for customers to make an informed purchasing decision. ";

const ProductDisplay = ({ item }) => {
  //console.log(item);
  const { name, id, price, seller, ratingsCount, quantity, img } = item;
  const [preQuantity, setPreQuantity] = useState(quantity);
  const [coupon, setCoupon] = useState("");
  const [size, setSize] = useState("Select Size");
  const [color, setColor] = useState("Select Color");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };
  const handleDecrease = () => {
    if (preQuantity > 0) setPreQuantity(preQuantity - 1);
  };
  const handleIncrement = () => {
    setPreQuantity(preQuantity + 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      id: id,
      img: img,
      price: price,
      name: name,
      quantity:preQuantity,
      size: size,
      color: color,
      coupon: coupon
    };
    //console.log(product);
    const existingCart = JSON.parse(localStorage.getItem("cart"))||[];
    const existingProductIndex = existingCart.findIndex((item)=>item.id===id)
    console.log('existingProductIndex:', existingProductIndex);

    if(existingProductIndex!==-1)
    {
      existingCart[existingProductIndex].quantity+=preQuantity;
      //existingCart[existingProductIndex].size+=size;
    }
    else{
      existingCart.push(product);
    }
    // UPDATE LOCAL STORAGE
    localStorage.setItem("cart",JSON.stringify(existingCart));
    //RESET FORM FIELDS
    setPreQuantity(1);
    setSize("Select Size");
    setColor("Select Color");
    setCoupon("");
  };
  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
        </p>
        <h4>${price}</h4>
        <h5>{seller}</h5>
        <p>{desc}</p>
      </div>
      {/* CART COMPONENTS */}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="select product-size">
            <select value={size} onChange={handleSizeChange}>
              <option>Select Size</option>
              <option>Small</option>
              <option>Large</option>
              <option>Medium</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
          </div>

          <div className="select product-color">
            <select value={color} onChange={handleColorChange}>
              <option>Select Color</option>
              <option>Green</option>
              <option>Blue</option>
              <option>Orange</option>
              <option>White</option>
              <option>Red</option>
            </select>
            {/* <i className="icofont-rounded-down"></i> */}
          </div>

          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              id="qtybutton"
              value={preQuantity}
              onChange={(e) => setPreQuantity(parseInt(e.target.value, 10))}
            />
            <div className="inc qtybutton" onClick={handleIncrement}>
              +
            </div>
          </div>

          {/* COUPON FIELD */}
          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Enter Discount Code"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>

          {/* BUTTON SECTION */}
          <button type="submit" className="lab-btn">
            <span>Add To Cart</span>
          </button>
          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check Out</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default ProductDisplay;
