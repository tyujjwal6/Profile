import React from 'react';
import { FiArrowDown } from 'react-icons/fi';

// IMPORTANT: Make sure this image path is correct for your project.
import userImage from '../assets/mp4.png';

const HarendraMalikProfile = () => {
  return (
    // This creates a vertical gradient with a hard stop at 50%,
    // effectively splitting the background into two solid colors.
    <main className="flex min-h-screen bg-gradient-to-b from-red-600 from-50% to-green-600 to-50% text-white font-sans">
      {/* Left Vertical Bar - Adjusted border for contrast */}
      <div className="hidden md:flex flex-col justify-between items-center py-10 px-4 border-r border-white/25">
        <p className="[writing-mode:vertical-rl] rotate-180 tracking-widest text-xs uppercase text-white/80">
          सांसद, मुजफ्फरनगर
        </p>
        <p className="[writing-mode:vertical-rl] rotate-180 tracking-widest text-xs uppercase text-white/80">
          2024
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Text Section */}
        <div className="w-full md:w-5/12 flex flex-col justify-between p-8 sm:p-12 md:p-16">
          {/* Top Stats - Text is on the red background */}
          <div className="flex gap-10 sm:gap-12">
            <div>
              <p className="text-5xl sm:text-6xl font-bold">4x</p>
              <p className="text-2xl text-white/80 mt-2 uppercase tracking-wider font-medium">विधायक निर्वाचित</p>
            </div>
            <div>
              <p className="text-5xl sm:text-6xl font-bold">2x</p>
              <p className="text-2xl text-white/80 mt-2 uppercase tracking-wider font-medium">सांसद निर्वाचित</p>
            </div>
          </div>

          {/* Middle "Hello" Section - Text crosses the color boundary */}
          <div className="my-auto py-10">
            {/* Added a drop-shadow to ensure text is readable over both colors */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-tight drop-shadow-2xl">
                 हरेंद्र मलिक 
            </h1>
            <p className="tracking-widest ml-60 text-xl uppercase text-white/80 drop-shadow-md">
              सांसद, मुजफ्फरनगर
            </p>
            <p className="text-2xl mt-4 ml-1 font-light drop-shadow-md">
              <span>—</span> एक प्रमुख किसान नेता और जनसेवक
            </p>
          </div>

          {/* Bottom "Scroll Down" Section - Text is on the green background */}
          <div>
            <a 
              href="#next-section" 
              className="group flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors duration-300"
            >
              <span>और जानें</span>
              <FiArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-7/12 h-96 md:h-auto overflow-hidden">
          <img
            src={userImage}
            alt="Portrait of MP Harendra Malik"
            className="w-full h-full object-cover object-top transition-transform duration-500 "
          />
        </div>
      </div>
    </main>
  );
};

export default HarendraMalikProfile;