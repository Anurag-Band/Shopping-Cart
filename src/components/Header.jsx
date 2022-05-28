import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ShoppingCartIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { CartState } from "../context/CartContextProvider";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();
  return (
    <header className="w-full h-20 bg-slate-700 flex justify-center items-center z-30">
      <nav className="max-w-[1400px] mx-auto w-full h-full flex justify-between items-center px-8">
        <div className="text-xl md:text-2xl lg:text-3xl text-white font-bold">
          <Link to="/">Shopping Cart</Link>
        </div>
        <label className="relative hidden md:block w-[50%]">
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </label>
        <Popover className="relative z-30">
          {({ open }) => (
            <>
              <Popover.Button
                className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center space-x-3 rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <ShoppingCartIcon className="w-7 font-bold" />
                <span>{cart.length ? cart.length : "0"}</span>
                <ChevronDownIcon
                  className={`${open ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                {cart.length > 0 ? (
                  <Popover.Panel className="absolute right-0 z-10 mt-3 w-[27rem] overflow-x-hidden  transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative flex-col space-y-3 bg-white p-7 lg:grid-cols-2">
                        {cart.map((product) => (
                          <div
                            className="flex items-center justify-between"
                            key={product.id}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-24 object-contain rounded-md"
                            />
                            <div className="flex flex-col items-start">
                              <span className="text-md font-[500] w-44">
                                {product.name}
                              </span>
                              <span className="text-lg font-semibold">
                                $ {product.price}
                              </span>
                            </div>
                            <TrashIcon
                              className="w-7 text-red-600 cursor-pointer z-10"
                              onClick={() => {
                                dispatch({
                                  type: "REMOVE_FROM_CART",
                                  payload: product,
                                });
                              }}
                            />
                          </div>
                        ))}
                        <Link to="/cart">
                          <button className="px-9 py-2 w-full mt-5 text-white bg-blue-600 text-xl hover:bg-blue-500 rounded-md focus:ring focus:ring-blue-700">
                            Go To CART{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                  </Popover.Panel>
                ) : (
                  <Popover.Panel className="absolute right-0 z-10 mt-3 w-[32rem] overflow-x-hidden  transform px-4 sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative flex-col space-y-3 bg-white p-7 lg:grid-cols-2">
                        <span className="flex space-y-5 flex-col text-gray-900 px-4 py-2 text-md font-semibold">
                          <span className="text-xl">Your Cart is Empty!!!</span>
                          <span>
                            🧺Click on{" "}
                            <Link to="/">
                              <button className="px-4 py-2 bg-blue-600 text-white font-normal rounded-lg cursor-pointer">
                                Add to Cart
                              </button>{" "}
                            </Link>
                            Button to Shop More🧺
                          </span>
                        </span>
                      </div>
                    </div>
                  </Popover.Panel>
                )}
              </Transition>
            </>
          )}
        </Popover>
      </nav>
    </header>
  );
};

export default Header;
