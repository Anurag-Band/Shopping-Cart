import React from "react";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import { StarIcon as StarIconOutlined } from "@heroicons/react/outline";

const Rating = ({ rating, onClick }) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <span key={index} onClick={() => onClick(index)}>
          {rating > index ? (
            <StarIconSolid className="w-6 text-yellow-400" />
          ) : (
            <StarIconOutlined className="w-5 text-yellow-400" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
