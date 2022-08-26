import React, { useState } from "react";
import {
  MdLibraryAdd,
  MdCategory,
  MdImage,
  MdOutlinePriceChange,
} from "react-icons/md";

import { categories } from "../utils/categoryData";
import Loader from "./LoadingCircle";

function AdminControls() {
  const [itemName, setItemName] = useState(``);
  const [itemPrice, setItemPrice] = useState(``);
  const [itemcategory, setItemCategory] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [isFieldEmpty, setIsFieldEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full px-8 mt-24">
      <div className="flex flex-col justify-center items-center gap-4">
        {isFieldEmpty ? (
          <p className="h-16">Please fill all the fields.</p>
        ) : (
          <p className="h-16">Add item details</p>
        )}

        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdLibraryAdd />
          <input
            className="p-1 border border-solid"
            onChange={(e) => setItemName(e.target.value)}
            type="text"
            value={itemName}
            placeholder="Give a name for the item"
            required
          />
        </div>

        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdOutlinePriceChange />
          <input
            className="p-1 border border-solid"
            onChange={(e) => setItemPrice(e.target.value)}
            type="number"
            value={itemPrice}
            placeholder="What will be price of this item?"
            required
          />
        </div>

        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdCategory />
          <select onCanPlay={(e) => setItemCategory(e.target.value)}>
            <option value="other">Select a category</option>
            {categories &&
              categories.map((category) => {
                return (
                  <option key={category.id} value={category.urlParamName}>
                    {category.name}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="h-56 w-96 flex flex-col justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdImage />
          <p>Image upload</p>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col justify-center items-center gap-3"></div>
          )}
        </div>

        <button
          className=" bg-red-500 p-2 px-4 rounded-full text-white"
          type="submit"
        >
          Submit
        </button>
      </div>

      <div className="flex md:hidden">Mobile</div>
    </div>
  );
}

export default AdminControls;
