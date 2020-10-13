import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProductToCart } from "./ProductItem.action";

function ProductItem(props) {
  const onAddToCart = () => {
    props.onSelectProduct(props)
  }
  return (
    <>
      <div className="col-xl-4 col-lg-6 col-md-6">
        <div className="product-wrapper mb-50">
          <div className="product-img mb-25">
            <a href="#">
              <img src={props.imgUrl} alt="" />
            </a>
            <div className="product-action text-center">
              <a title="Add to cart">
                <i
                  className="fas fa-shopping-cart"
                  onClick={onAddToCart}
                />
              </a>
              <Link to={`/product-detail/${props.id}`} title="Quick View">
                <i className="fas fa-search" />
              </Link>
            </div>
          </div>
          <div className="product-content pr-0">
            <div className="pro-cat mb-10">
              <a href="#">{props.type}</a>
            </div>
            <h4>
              <br />
              <a href="#">{props.name}</a>
            </h4>
            <span className="shopInfor_shopName" href="#">
              {props.shopName}
            </span>
            <div className="product-meta">
              <div className="pro-price">
                <span>{props.price}</span>
                <span className="old-price">{props.disCountPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapDispatchToProps = {
  addProductInCart: addProductToCart,
};
export default connect(null, mapDispatchToProps)(ProductItem);
