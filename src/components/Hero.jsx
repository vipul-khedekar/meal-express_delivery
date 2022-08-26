import React from "react";

import HeroBackground from "../images/hero-background.png";
import { heroItems } from "../utils/heroItemsData";

function Hero() {
  return (
    <div>
      <div className="hidden md:flex justify-between gap-5 h-[90vh] w-full px-20 mt-14">
        <div className="flex-1 flex flex-col justify-center items-start gap-5">
          <p className="font-bold text-6xl tracking-wide leading-loose">
            Quick <span className="text-red-700">food</span> delivery <br />
            in <span className="text-red-700">12</span> minutes,
            <br />
            right <span className="text-red-700">here</span>!
          </p>

          <p className="mt-[-20px] italic font-extralight">
            *Conditions apply.
          </p>
          <p className="mt-[-20px] italic font-extralight">
            *Order at your own risk.
          </p>

          <button className="bg-red-600 rounded-full py-2 px-5 font-bold text-white text-2xl">
            Order Now
          </button>
        </div>

        <div className="flex-1 flex justify-center mt-14 ml-24">
          <img
            className="h-[80vh]"
            src={HeroBackground}
            alt="hero-background"
          />

          <div className="flex flex-col gap-5 absolute top-24 right-96">
            {heroItems &&
              heroItems.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex justify-center items-center mr-[-10rem]"
                  >
                    <img className="w-32" src={item.picture} alt={item.name} />
                    <div className="flex flex-col w-[340px] mt-10">
                      <p className="font-bold text-xl">{item.name}</p>
                      <p>₹{item.price}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="flex md:hidden">Mobile</div>
    </div>
  );
}

export default Hero;
