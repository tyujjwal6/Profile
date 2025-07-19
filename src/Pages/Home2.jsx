import React, { useLayoutEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

// GSAP imports
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ▼▼▼ 1. IMPORT THE MOTIONPATH PLUGIN ▼▼▼
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register the plugins
// ▼▼▼ 2. REGISTER THE NEW PLUGIN ▼▼▼
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);


// ▼▼▼ 3. UPDATE THE DATA STRUCTURE ▼▼▼
// We remove the 'position' object and replace it with a 'progress' value (0 = start of path, 1 = end of path).
const milestonesChronologicalData = [
    { year: "1985", role: "विधायक", constituency: "खतौली", party: "लोक दल", result: "जीते", imageUrl: "https://www.jatland.com/w/thumb.php?f=Harendra_Singh_Malik.jpg&width=150", altText: "लोक दल पार्टी का प्रतीक", color: "border-green-500", progress: 0.03, scale: 1.2 },
    { year: "1989", role: "विधायक", constituency: "बघरा", party: "जनता दल", result: "जीते", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8b/Harendra_Singh_Malik_MP.jpg", altText: "जनता दल पार्टी का प्रतीक", color: "border-blue-500", progress: 0.20, scale: 1.1 },
    { year: "1991", role: "विधायक", constituency: "बघरा", party: "जनता दल", result: "जीते", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ460jePMjGUDY6hPsRvyDh3N8I7d1ol4zz7l7GOaz_1jfo-UCs2vCD5Q12CPDJJ8vTqSs&usqp=CAU", altText: "जनता दल पार्टी का प्रतीक", color: "border-blue-500", progress: 0.35, scale: 1.0 },
    { year: "1993", role: "विधायक", constituency: "बघरा", party: "जनता दल", result: "जीते", imageUrl: "https://feeds.abplive.com/onecms/images/uploaded-images/2025/05/08/150a59f55a8905144ff4df097ef07b8b1746696280749367_original.jpg?impolicy=abp_cdn&imwidth=320", altText: "जनता दल पार्टी का प्रतीक", color: "border-blue-500", progress: 0.50, scale: 0.95 },
    { year: "1996", role: "विधायक", constituency: "बघरा", party: "BKKGP", result: "हारे", imageUrl: "https://pbs.twimg.com/ext_tw_video_thumb/1945056132965244928/pu/img/JMTj5T4ltA_9PDoR.jpg", altText: "चुनाव में हार का प्रतीक", color: "border-rose-500", progress: 0.65, scale: 0.9 },
    { year: "2002-2008", role: "सांसद (राज्य सभा)", constituency: "हरियाणा", party: "INLD", result: "जीते", imageUrl: "https://staticimg.amarujala.com/assets/images/2023/01/29/muzaffarnagar-news_1674993973.jpeg", altText: "भारतीय संसद भवन", color: "border-orange-500", progress: 0.82, scale: 0.85 },
    { year: "2024", role: "सांसद", constituency: "मुज़फ़्फ़रनगर (लोक सभा)", party: "समाजवादी पार्टी", result: "जीते", imageUrl: "https://i.ytimg.com/vi/TDNl_ZBNoBk/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AH0CYAC0AWKAgwIABABGH8gUigTMA8=&rs=AOn4CLCHqX6DXF8W71dJbA-fJo8d1yRiig", altText: "समाजवादी पार्टी का प्रतीक", color: "border-red-600", progress: 0.98, scale: 0.8 },
];


// --- MilestoneItem Component (Simplified) ---
// It no longer needs to handle positioning logic.
const MilestoneItem = ({ item }) => {
    // Note: 'position' prop is removed.
    const { year, role, constituency, party, result, imageUrl, altText, color, scale } = item;
    
    // We can determine text alignment based on progress later if needed, but for now this is fine.
    const textAlignment = 'bottom'; 
    const flexOrder = 'flex-col';

    return (
        <div
            className="milestone-item absolute"
            // The position is now set by GSAP, so we only need to handle the transform.
            style={{ transform: 'translate(-50%, -50%)', zIndex: 20 }}
            // We pass the progress value via a data attribute for GSAP to read
            data-progress={item.progress}
        >
            <div className={cn("flex items-center group", flexOrder)}>
                 {/* This layout is simplified. You can adjust it back if you prefer the top/bottom text logic */}
                <div className={cn("w-56 px-2 text-center mt-3")}>
                    <h3 className="font-bold text-xl text-slate-800">{role}</h3>
                    <p className="text-md text-slate-600">{constituency} <br/> ({party})</p>
                    <span className={cn("font-semibold text-md", result === 'जीते' ? 'text-green-600' : 'text-red-600')}>परिणाम: {result}</span>
                </div>
                <div className="w-px h-10 bg-slate-400 transition-all duration-300 group-hover:bg-slate-600"></div>
                <div className={cn("w-24 h-24 bg-white rounded-full flex items-center justify-center p-1 shadow-xl border-4 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-2xl", color)} style={{ transform: `scale(${scale})`}}>
                    <img src={imageUrl} alt={altText} className="w-full h-full object-cover rounded-full" />
                </div>
                <p className={cn("font-extrabold text-2xl text-slate-700 drop-shadow-sm transition-colors duration-300", color.replace('border-', 'text-'))}>{year}</p>
            </div>
        </div>
    );
};

// --- Main Page Component (WITH AUTOMATIC POSITIONING) ---
const HarendraMalikChronologicalTimeline = () => {
    const mainRef = useRef(null);
    const pathRef = useRef(null);
    
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const path = pathRef.current;
            const milestones = gsap.utils.toArray('.milestone-item');
            const svgContainer = path.closest('svg');
            const viewBox = svgContainer.viewBox.baseVal;

            // ▼▼▼ 4. MAIN LOGIC: CALCULATE AND SET POSITIONS ▼▼▼
            // This is the core of the fix. We do this BEFORE any animations.
            const rawPath = MotionPathPlugin.getRawPath(path);

            milestones.forEach(item => {
                const progress = parseFloat(item.dataset.progress);
                const point = MotionPathPlugin.getPositionOnPath(rawPath, progress);

                // Convert SVG coordinates (from viewBox) to percentages for CSS positioning
                const leftPercent = (point.x / viewBox.width) * 100;
                const topPercent = (point.y / viewBox.height) * 100;

                // Use GSAP to INSTANTLY set the correct position. No more guesswork!
                gsap.set(item, {
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                });
            });
            // ▲▲▲ END OF POSITIONING LOGIC ▲▲▲


            // --- ALL YOUR EXISTING ANIMATIONS CAN NOW RUN ---

            // Path draw animation
            const pathLength = path.getTotalLength();
            gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
            gsap.to(path, {
                strokeDashoffset: 0,
                scrollTrigger: { trigger: mainRef.current, start: "top top", end: "bottom bottom", scrub: 1.5 }
            });

            // Header and Milestone animations
            gsap.from(".header-anim", { opacity: 0, y: -50, duration: 1, ease: "power3.out", stagger: 0.2, delay: 0.5 });
            milestones.forEach(item => {
                gsap.from(item, {
                    opacity: 0,
                    scale: 0.5,
                    duration: 1,
                    ease: "back.out(1.7)",
                    scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none reverse" }
                });
            });
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <style>
                {`
                @keyframes moveGradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-gradient-bg-green {
                    background: linear-gradient(135deg, #f0fff4, #ffffff, #fafafa);
                    background-size: 200% 200%;
                    animation: moveGradient 15s ease-in-out infinite;
                }
                `}
            </style>
            
            <div ref={mainRef} className="animated-gradient-bg-green min-h-screen font-sans p-4 md:p-8 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                    <header className="text-center mb-20 pt-8">
                        <h1 className="header-anim text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                            हरेंद्र मलिक की राजनीतिक यात्रा: शुरुआत से अब तक
                        </h1>
                        <p className="header-anim mt-3 text-lg text-slate-500 max-w-3xl mx-auto">
                            उनके राजनीतिक करियर के शुरुआती दिनों से लेकर आज तक के महत्वपूर्ण पड़ावों का एक कालानुक्रमिक अवलोकन।
                        </p>
                    </header>

                    <div className="relative w-full h-[2000px]">
                        <svg width="100%" height="100%" viewBox="0 0 1000 2000" preserveAspectRatio="xMidYMid meet" className="absolute top-0 left-0">
                            <defs>
                                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#22c55e', stopOpacity: 1 }} /> 
                                    <stop offset="100%" style={{ stopColor: '#15803d', stopOpacity: 1 }} />
                                </linearGradient>
                                <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#22c55e" floodOpacity="0.7"/>
                                </filter>
                            </defs>
                            <path ref={pathRef} d="M 250 100 C 500 300, 300 450, 700 600 C 1100 750, 800 900, 400 1100 C 0 1300, 200 1500, 700 1700 C 1200 1900, 400 1950, 350 1950" stroke="url(#path-gradient)" strokeWidth="12" fill="none" strokeLinecap="round" style={{ filter: "url(#greenGlow)" }} />
                        </svg>
                        
                        {milestonesChronologicalData.map((item) => (
                            <MilestoneItem key={item.year} item={item} />
                        ))}
                    </div>

                    <div style={{ height: "50vh" }} aria-hidden="true" />
                </div>
            </div>
        </>
    );
};

export default HarendraMalikChronologicalTimeline;