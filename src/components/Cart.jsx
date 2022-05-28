import { TrashIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartState } from "../context/CartContextProvider";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((accu, curr) => accu + +curr.price * curr.qty, 0));
  }, [cart]);
  return (
    <div className="flex justify-between">
      <div className="flex justify-center w-full bg-slate-50 min-h-[89.9vh]">
        {cart.length > 0 ? (
          <div className="flex flex-col w-full h-full container">
            {cart.map((product) => (
              <div
                className="flex my-2 space-x-3 justify-between mx-auto px-9 py-3 items-center bg-white rounded-lg border shadow-md hover:bg-gray-100"
                key={product.id}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 object-contain rounded-md"
                />
                <div className="flex flex-col w-[23rem] items-start space-y-2">
                  <span className="text-2xl font-[500]">{product.name}</span>
                  <span className="text-2xl font-semibold">
                    $ {product.price}
                  </span>
                </div>
                <div className="flex flex-1 items-center">
                  <Rating rating={product.ratings} />
                </div>
                <Form.Control
                  as="select"
                  className="px-9 py-2 rounded-md border border-black cursor-pointer"
                  value={product.qty}
                  onChange={(e) =>
                    dispatch({
                      type: "CHANGE_CART_QTY",
                      payload: {
                        id: product.id,
                        qty: e.target.value,
                      },
                    })
                  }
                >
                  {[...Array(product.inStock).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </Form.Control>
                <TrashIcon
                  className="w-9 text-red-600 cursor-pointer z-10"
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    });
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-full h-full">
            <div className="flex my-2 w-[60%] justify-between mx-auto px-9 py-3 items-center bg-white rounded-lg border shadow-md hover:bg-gray-100">
              <span className="flex space-y-5 flex-col text-gray-900 px-4 py-2 text-md font-semibold">
                <span className="text-xl">Your Cart is Empty!!!</span>
                <span>
                  🧺Click on{" "}
                  <Link to="/">
                    <button className="px-4 py-2 bg-blue-600 text-white font-normal rounded-lg cursor-pointer">
                      Continue Shopping
                    </button>{" "}
                  </Link>
                  to Explore More Products...🧺
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="flex-col min-h-full bg-slate-700 min-w-[25rem] m-4 p-5 text-white">
        <div className="flex flex-col p-3 space-y-9">
          <h1 className="text-2xl font-semibold">
            Subtotal ( {cart.length} ) items
          </h1>
          <span className="text-3xl font-medium">Total: $ {total} only</span>
          <button className="px-9 py-2 text-white bg-blue-600 text-xl hover:bg-blue-500 rounded-md focus:ring focus:ring-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
