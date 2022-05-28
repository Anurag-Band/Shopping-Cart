import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./reducer";

const Cart = createContext();

faker.seed(100);

const CartContextProvider = ({ children }) => {
  // Getting Products Data from FAKER.JS API

  const products = [...Array(21)].map((_, i) => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    inStock: faker.helpers.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
  }));

  // console.table(products);

  // Creating a useReducer to manager products in Home and Cart Page
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  // Creating a useReducer to apply Filter in the Home Page
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  // console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default CartContextProvider;

//  to use Cart Context Globally
export const CartState = () => {
  return useContext(Cart);
};
