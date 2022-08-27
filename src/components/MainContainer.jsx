import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Hero from "./Hero.jsx";
import FruitsContainer from "./FruitsContainer.jsx";
import { useStateValue } from "../context/StateProvider.js";

function MainContainer() {
  return (
    <div>
      <Hero />

      <section className="px-10 mt-10">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-2xl">
            <span className="underline decoration-4 decoration-red-600 underline-offset-4">
              Our Best
            </span>{" "}
            of Fresh Fruits
          </p>

          <div className="hidden md:flex gap-3 items-center">
            <div className="bg-red-500 h-8 w-8 flex justify-center items-center rounded-md">
              <MdKeyboardArrowLeft className="text-white text-2xl" />
            </div>

            <div className="bg-red-500 h-8 w-8 flex justify-center items-center rounded-md">
              <MdKeyboardArrowRight className="text-white text-2xl" />
            </div>
          </div>
        </div>

        <FruitsContainer />
      </section>
    </div>
  );
}

export default MainContainer;
