import React from 'react';
import { 
  Cog, 
  Puzzle, 
  PieChart, 
  MessagesSquare, 
  Globe, 
  Lightbulb,
  Award // Placeholder for Logo
} from 'lucide-react';

// Data for each milestone on the timeline
// The layout is controlled here: position, alignment, colors, and content.
const milestones = [
  {
    year: '1985',
    title: 'MLA',
    description: 'WON THE ELECTION FROM LOK DAL PARTY, IN CONSTITUENCY- KHATAULI.',
    icon: Lightbulb,
    colors: {
      text: 'text-yellow-500',
      border: 'border-yellow-500',
      bg: 'bg-yellow-500',
    },
    position: { top: '80%', left: '88%' },
    align: 'bottom',
  },
  {
    year: '1989',
    title: 'MLA',
    description: 'WON THE ELECTION FROM JANTA DAL PARTY, IN CONSTITUENCY- BAGHRA.',
    icon: Globe,
    colors: {
      text: 'text-green-500',
      border: 'border-green-500',
      bg: 'bg-green-500',
    },
    position: { top: '65%', left: '73%' },
    align: 'bottom',
  },
  {
    year: '1991',
    title: 'MLA',
    description: 'WON THE ELECTION FROM JANTA DAL PARTY, IN CONSTITUENCY- BAGHRA.',
    icon: MessagesSquare,
    colors: {
      text: 'text-orange-500',
      border: 'border-orange-500',
      bg: 'bg-orange-500',
    },
    position: { top: '50%', left: '58%' },
    align: 'bottom',
  },
  {
    year: '1993',
    title: 'MLA',
    description: 'WON THE ELECTION FROM JANTA DAL PARTY, IN CONSTITUENCY- BAGHRA.',
    icon: Puzzle,
    colors: {
      text: 'text-purple-500',
      border: 'border-purple-500',
      bg: 'bg-purple-500',
    },
    position: { top: '25%', left: '42%' },
    align: 'bottom',
  },
  {
    year: '2002-2008',
    title: 'MP',
    description: 'WON THE ELECTION FROM INDIAN NATIONAL LOK DAL PARTY, IN CONSTITUENCY- RAJYA SABHA (HARYANA).',
    icon: PieChart,
    colors: {
      text: 'text-cyan-500',
      border: 'border-cyan-500',
      bg: 'bg-cyan-500',
    },
    position: { top: '45%', left: '20%' },
    align: 'top',
  },
  {
    year: '2024',
    title: 'MP',
    description: 'WON THE ELECTION FROM SAMAJWADI PARTY, IN CONSTITUENCY- MUZAFFARNAGAR.',
    icon: Cog,
    colors: {
      text: 'text-red-700',
      border: 'border-red-700',
      bg: 'bg-red-700',
    },
    position: { top: '5%', left: '10%' },
    align: 'top',
  },
];

// Reusable component for the milestone content (Icon + Text)
const MilestoneItemContent = ({ milestone }) => {
  const isTextOnLeft = parseFloat(milestone.position.left) > 40;

  return (
    <div className={`flex items-start gap-3 w-48 sm:w-56 ${isTextOnLeft ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 w-14 h-14 rounded-full bg-white flex items-center justify-center border-2 ${milestone.colors.border}`}>
        <milestone.icon className={milestone.colors.text} size={28} />
      </div>
      <div className={isTextOnLeft ? 'text-right' : 'text-left'}>
        <h3 className={`font-bold ${milestone.colors.text}`}>{milestone.title}</h3>
        <p className="text-sm text-gray-500 leading-tight">{milestone.description}</p>
      </div>
    </div>
  );
};

// Main Component
const CompanyMilestones = () => {
  return (
    <div className="bg-gray-50 font-sans py-16 sm:py-24">
      <div className="container mx-auto px-4 relative">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <div className="flex items-center justify-center w-24 h-24 bg-black rounded-full text-white">
            <Award size={40} /> 
            {/* The image shows "LOGO", Award is a placeholder */}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-wide">
              JOURNEY
            </h1>
            <p className="text-sm font-light text-gray-500 tracking-widest">INFOGRAPHIC TEMPLATE</p>
          </div>
        </div>

        {/* Side Description Box */}
        <div className="absolute top-0 right-4 max-w-xs hidden lg:block text-gray-600 text-sm">
            <h4 className="font-bold text-gray-700">SOME DESCRIPTION HERE</h4>
            <p>Sed haec quis possit intrepidus aestimare tellus. Praesentium, totam. Sed haec quis possit intrepidus aestimare tellus. Praesentium, totam.</p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full h-[700px] sm:h-[600px] mt-20">
          
          {/* The SVG Road Path */}
          <svg
            viewBox="0 0 1000 600"
            className="absolute w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M 900 500 C 800 500, 800 400, 700 400 C 600 400, 600 300, 500 300 C 400 300, 400 50, 300 250 C 200 450, 200 100, 100 100"
              fill="none"
              stroke="#d1d5db" // gray-300
              strokeWidth="15"
              strokeLinecap="round"
            />
          </svg>

          {/* Mapping over milestones to place them on the timeline */}
          <div className="relative w-full h-full">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: milestone.position.top, left: milestone.position.left }}
              >
                <div className={`flex items-center ${milestone.align === 'top' ? 'flex-col-reverse' : 'flex-col'}`}>
                  
                  {/* Text content block */}
                  <div className={milestone.align === 'top' ? 'mt-4' : 'mb-4'}>
                    <MilestoneItemContent milestone={milestone} />
                  </div>

                  {/* Year and connector line */}
                  <div className="flex flex-col items-center">
                    <p className={`font-bold text-xl ${milestone.colors.text}`}>{milestone.year}</p>
                    <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
                    <div className={`w-5 h-5 rounded-full ${milestone.colors.bg} border-4 border-gray-50 z-10`}></div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyMilestones;