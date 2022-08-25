import React from "react";

function Hero() {
  return (
    <div>
      <div className="hidden md:flex justify-center gap-5 h-[90vh] w-full px-20 mt-14">
        <div className="flex-1 flex flex-col justify-center items-start gap-5">
          <p className="font-bold text-6xl tracking-wide leading-loose">
            Get <span className="text-red-700">delicious</span> food <br />
            in <span className="text-red-700">30</span> minutes,
            <br />
            right <span className="text-red-700">here</span>!
          </p>
          <p className="mt-[-20px] italic font-extralight">
            *Conditions apply.
          </p>
          <button className="bg-red-600 rounded-full py-2 px-5 font-bold text-white text-2xl">
            Order Now
          </button>
        </div>

        <div className="flex-1"></div>
      </div>

      <div className="flex md:hidden">Mobile</div>
    </div>
  );
}

export default Hero;
