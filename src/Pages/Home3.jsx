import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaUserShield, FaLeaf } from 'react-icons/fa';

// --- मुख्य हीरो पेज कंपोनेंट (उन्नत लाइट-थीम डिज़ाइन) ---
// नोट: बेहतर हिंदी रेंडरिंग के लिए, अपनी tailwind.config.js में एक कस्टम फ़ॉन्ट परिवार जोड़ें।
// उदाहरण:
// theme: {
//   extend: {
//     fontFamily: {
//       hindi: ['Noto Sans Devanagari', 'sans-serif'],
//       'hindi-bold': ['Noto Sans Devanagari', 'sans-serif'], // मोटे अक्षरों के लिए
//       'hindi-serif': ['Tiro Devanagari Hindi', 'serif'], // सेरिफ़ अक्षरों के लिए
//     },
//   },
// },
export default function MalikHeroPageHindi() {
    const mainRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

            tl.from('.gsap-bg-text', { opacity: 0, y: -50, duration: 1.5 })
              .from('.gsap-main-img', { opacity: 0, scale: 0.8, y: 50 }, "-=1.2")
              .from('.gsap-tag', { 
                  opacity: 0, 
                  y: 20, 
                  stagger: 0.2, 
                  duration: 0.8 
              }, "-=0.6")
              .from('.gsap-name', { 
                  opacity: 0, 
                  y: 50 
              }, "-=0.8")
              .from('.gsap-role', { 
                  opacity: 0, 
                  y: 30 
              }, "<0.2")
              .from('.gsap-desc', { 
                  opacity: 0, 
                  y: 20, 
                  duration: 1 
              }, "<0.3");

        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <main 
            ref={mainRef} 
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 to-neutral-100 font-hindi p-4"
        >
            
            {/* पृष्ठभूमि टेक्स्ट: बहुत सूक्ष्म */}
            <div className="gsap-bg-text absolute top-[10%] inset-x-0 text-center z-0">
                <h2 className="font-hindi-serif italic text-7xl md:text-9xl text-slate-900/90 select-none">
                    संसद <span className='p-6'>"     " </span> सदस्य
                </h2>
            </div>

            {/* मुख्य कंटेंट क्षेत्र - फ्लेक्सबॉक्स का उपयोग करके संरचित */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">

                {/* केंद्रीय छवि - साफ़ फ़्रेम और छाया के साथ */}
                <div className="gsap-main-img relative mb-6 md:mb-8">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-1.5 bg-white shadow-xl shadow-slate-300/60">
                         <img
                            src="https://scontent.fdel27-7.fna.fbcdn.net/v/t39.30808-6/497509360_1146501700615064_725804932270958773_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=u_6PTzQq_bgQ7kNvwG8wOsm&_nc_oc=AdmPsoFRKbX9CrnC87d8O_C6uoBqTKvtJB8EBwVLPU3eo_aab8NT4dx3APFlVLnRoAE&_nc_zt=23&_nc_ht=scontent.fdel27-7.fna&_nc_gid=IC0uIhkLjmiFW1vX7BJtBQ&oh=00_AfTN_MqZAuWIMW1bZ0zffYrFDNZpv72BanzW_qLFu-b3_Q&oe=68814413"
                            alt="हरेंद्र सिंह मलिक"
                            className="w-full h-full object-cover object-top rounded-full"
                        />
                    </div>
                </div>

                {/* टैग्स / विशेषताएँ */}
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                    <div className="gsap-tag bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-2 border border-slate-200/80 shadow-sm">
                        <FaLeaf className="text-green-500" />
                        किसान नेता
                    </div>
                    <div className="gsap-tag bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-2 border border-slate-200/80 shadow-sm">
                        <FaUserShield className="text-sky-500" />
                        सामाजिक सद्भाव
                    </div>
                </div>

                {/* नाम (एक पंक्ति में) */}
                <h1 className="gsap-name font-hindi-bold text-slate-800 text-5xl md:text-7xl lg:text-8xl tracking-tight leading-tight">
                    हरेंद्र मलिक
                </h1>

                {/* पद और स्थान - आकर्षक नारंगी रंग में */}
                <p className="gsap-role font-hindi-serif text-2xl md:text-3xl text-orange-600 mt-2">
                    लोकसभा सांसद, मुज़फ्फरनगर
                </p>

                {/* संक्षिप्त विवरण */}
                <p className="gsap-desc max-w-xl mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
                    कृषि मुद्दों, सामाजिक सद्भाव और समावेशी विकास की एक बुलंद आवाज़।
                </p>

            </div>
        </main>
    );
}