import React from "react";
import { MdLibraryAdd, MdCategory, MdImage } from "react-icons/md";

import { categories } from "../utils/categoryData";
import Loader from "./LoadingCircle";

function AdminControls() {
  return (
    <div className="w-full px-8 mt-24">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdLibraryAdd />
          <input
            className="p-1 border border-solid"
            type="text"
            value=""
            placeholder="Give a name for the item"
            required
          />
        </div>

        <div className="h-14 w-96 flex justify-center items-center gap-3 p-2 border rounded-md border-solid border-red-500">
          <MdCategory />
          <select>
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
          <p>Upload an image</p>
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
