import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/CartContextProvider";
import Rating from "./Rating";

const Filters = () => {
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = CartState();

  // make state for rating

  return (
    <div className="hidden sm:flex flex-col min-w-[18rem] bg-slate-700 p-5 space-y-3 m-3">
      <div className="flex items-center">
        <input
          type="radio"
          name="order"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "lowToHigh",
            })
          }
          checked={sort === "lowToHigh" ? true : false}
        />
        <label htmlFor="order" className="ml-2 block text-white text-lg">
          Ascending
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          name="order"
          onChange={() =>
            productDispatch({
              type: "SORT_BY_PRICE",
              payload: "highToLow",
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
        <label htmlFor="order" className="ml-2 block text-white text-lg">
          Descending
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="outofstock"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_STOCK",
            })
          }
          checked={byStock}
        />
        <label htmlFor="outofstock" className="ml-2 block text-white text-lg">
          Include Out of Stock
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="fastdelivery"
          onChange={() =>
            productDispatch({
              type: "FILTER_BY_DELIVERY",
            })
          }
          checked={byFastDelivery}
        />
        <label htmlFor="fastdelivery" className="ml-2 block text-white text-lg">
          Fast Delivery Only
        </label>
      </div>
      <button
        className="w-full py-2 bg-blue-500 text-white rounded-md"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters...
      </button>
    </div>
  );
};

export default Filters;
