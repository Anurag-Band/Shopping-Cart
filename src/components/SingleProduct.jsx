import React from "react";
import { CartState } from "../context/CartContextProvider";
import Rating from "./Rating";

const SingleProduct = ({ product }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  return (
    <div className="max-w-[19rem] md:max-w-xs bg-white rounded-lg border border-gray-200 shadow-md m-3 md:m-7">
      <img className="rounded-t-lg" src={product?.image} alt={product?.name} />

      <div className="p-5">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {product?.name}
        </h5>
        <h5 className="text-2xl font-semibold tracking-tight text-gray-900">
          $ {product.price.split(".")[0]}
        </h5>
        <span className="font-semibold text-gray-900">
          {product.fastDelivery ? (
            <div>Fast Delivery</div>
          ) : (
            <div>4 Days Delivery</div>
          )}
        </span>
        <span className="flex text-black mb-2">
          <Rating rating={product.ratings} />
          {/* {console.log(product.ratings)} */}
        </span>

        {cart.some((p) => p.id === product.id) ? (
          <button
            onClick={() => {
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: product,
              });
            }}
            className="w-56 px-2 py-2 text-white bg-red-600 text-xl hover:bg-red-500 rounded-md focus:ring focus:ring-red-700 mb-2"
          >
            Remove From Cart
          </button>
        ) : (
          <button
            disabled={!product.inStock}
            onClick={() => {
              dispatch({
                type: "ADD_TO_CART",
                payload: product,
              });
            }}
            className="w-56 px-2 py-2 disabled:bg-slate-400 text-white bg-blue-600 text-xl hover:bg-blue-500 rounded-md focus:ring focus:ring-blue-700"
          >
            {!product.inStock ? "Out of Stock" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
