import React from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";

export default function FruitsContainer() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fruits = foodItems.filter((item) => {
    return item.category === `fruits`;
  });

  return (
    <div className="h-auto w-full flex items-center p-3 my-3 md:mt-10 overflow-x-auto overflow-y-hidden">
      <div className="hidden md:flex gap-5">
        {fruits.map((fruit) => {
          return (
            <div className="bg-blue-300 h-[12rem] w-[20rem] flex flex-col justify-center items-center gap-2 p-3 rounded-xl hover:shadow-lg">
              <div className="flex items-center gap-2">
                <img
                  className="h-60 w-40 mt-6"
                  src={fruit.imageURL}
                  alt={fruit.name}
                />

                <div className="flex flex-col justify-center items-end gap-2">
                  <div className="bg-red-500 h-8 w-8 flex justify-center items-center rounded-full shadow-md">
                    <MdAddShoppingCart className="text-white text-lg" />
                  </div>

                  <p className="text-md">
                    <span className="text-red-500">₹</span> {fruit.price}
                  </p>

                  <p className="font-semibold text-lg">{fruit.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex md:hidden">Mobile</div>
    </div>
  );
}
