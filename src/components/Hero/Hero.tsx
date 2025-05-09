import React from "react";
import { BackgroundLines } from "../ui/background-lines";
import Image from "next/image";
import Example from "@/../public/examples.jpg";
const Hero = () => {
  return (
    <div className="h-screen md:h-auto">
      <BackgroundLines className="bg-transparent flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-12 lg:px-20 py-10 dark ">
        {/* Left Section - Text Content */}
        <div className="text-center md:text-left max-w-xl">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight">
            Wear Faith, <br /> Spread Light.
          </h2>
          <p className="mt-4 text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed">
            Every tee, every bag—crafted with purpose. <br />
            <b>Graced Couture</b> is more than fashion; it&apos;s a movement to{" "}
            <b>spread positivity and Jesus</b> through every design.
          </p>
          <p className="mt-6 text-sm md:text-base text-neutral-500 dark:text-neutral-400">
            Wear your faith boldly. Shine His light wherever you go. 🌟
          </p>
          <button className="p-[3px] relative mt-3">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              View our collection
            </div>
          </button>
        </div>

        {/* Right Section - Image Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <div className="w-full max-w-md h-72 md:h-96 bg-gray-200 dark:bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
            {/* Replace this div with an actual <img> tag or Next.js Image component */}
            <Image
              src={Example}
              alt="Graced Couture Collection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
};

export default Hero;
