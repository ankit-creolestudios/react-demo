import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/lab";
import product from "../../assets/images/products/mb_img_58.jpg";
const ProductCard = () => {
  const options = {
    value: 5,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <img src={product} alt={"..."} />
      <p>Product title</p>
      <div>
        {/* <Rating {...options} />{" "} */}
        <span className="productCardSpan"> 20 Reviews</span>
      </div>
      <span>₹ 1100</span>
    </>
  );
};

export default ProductCard;
