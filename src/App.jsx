import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, ChevronDown, ArrowRight, ClipboardList, Calendar, Users, Gift,
  Landmark, Globe, Timer, HeartPulse, Scale, TrendingUp, Stethoscope, Users2
} from 'lucide-react';
import { gsap } from 'gsap';

// --- Modal Component ---
// A reusable modal component to be used by various buttons
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-xl w-full relative"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
        <div className="text-gray-600">{children}</div>
      </div>
    </div>
  );
};


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, title: '', content: '' });
  
  const appRef = useRef(null);

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      // Animate hero text
      gsap.from(".hero-text-anim", {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      });

      // Animate hero image
      gsap.from(".hero-image-anim", {
        duration: 1.2,
        x: 100,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.8
      });
      
      // Animate nav items
      gsap.from(".nav-item-anim", {
        duration: 0.8,
        y: -30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
      });

    }, appRef);
    
    return () => ctx.revert();
  }, []);

  const openModal = (title, content) => {
    setModalState({ isOpen: true, title, content });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, title: '', content: '' });
  };

  const navLinks = [
    { name: 'About', href: '#' },
    { name: 'Cabinet', href: '#', hasDropdown: true },
    { name: 'Issues', href: '#' },
    { name: 'Priority', href: '#' },
    { name: 'Blog', href: '#' },
  ];
  
  const actionItems = [
    { icon: ClipboardList, title: "Register To Vote", description: "Make your voice heard by registering to vote. Exercise your democratic right." },
    { icon: Calendar, title: "Attend Events", description: "Engage with our political party and be part of the positive movement." },
    { icon: Users, title: "Get Involved", description: "Make a real difference by getting involved in our political party's campaigns.", featured: true },
    { icon: Gift, title: "Donate Today", description: "Support our great party's efforts and help us make a difference donation." },
  ];

  const issues = [
    { icon: Landmark, name: 'Spending and Debt' },
    { icon: Globe, name: 'Foreign Policy' },
    { icon: Timer, name: 'Term Limits' },
    { icon: HeartPulse, name: 'Medicare and Medicaid' },
    { icon: Scale, name: 'Social Issues' },
  ];

  const missionItems = [
    { icon: TrendingUp, title: "Economic", description: "We are dedicated to promoting sustainable growth, supporting small businesses, and creating jobs.", featured: true },
    { icon: Stethoscope, title: "Medical", description: "We envision a healthcare system that is accessible, affordable, and of the highest quality for every citizen." },
    { icon: Users2, title: "Social", description: "Our mission is to build a society that is founded on equality, justice, and respect for all social inclusion." },
  ];

  return (
    <div ref={appRef} className="bg-gray-100 font-sans text-gray-800">
      <Modal isOpen={modalState.isOpen} onClose={closeModal} title={modalState.title}>
        <p>{modalState.content}</p>
      </Modal>

      {/* --- Header --- */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-transparent text-white">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold nav-item-anim">MP of Muzaffarnagar.</h1>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <a key={link.name} href={link.href} className="nav-item-anim flex items-center hover:opacity-80 transition-opacity" style={{animationDelay: `${i * 100}ms`}}>
                {link.name}
                {link.hasDropdown && <ChevronDown size={16} className="ml-1" />}
              </a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => openModal('Contact Us', 'Call us at XXXXXXXXXX for any inquiries.')}
              className="nav-item-anim flex items-center bg-white text-blue-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition-colors"
            >
              <Phone size={16} className="mr-2"/>
              XXXXXXXXXX
            </button>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#002D62] bg-opacity-95 backdrop-blur-sm absolute top-full left-0 w-full">
            <nav className="flex flex-col items-center space-y-4 py-6">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="flex items-center text-lg hover:opacity-80 transition-opacity">
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={16} className="ml-1" />}
                </a>
              ))}
              <button 
                onClick={() => openModal('Contact Us', 'Call us at XXXXXXXXXX for any inquiries.')}
                className="flex items-center bg-white text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
              >
                <Phone size={16} className="mr-2"/>
                XXXXXXXXXX
              </button>
            </nav>
          </div>
        )}
      </header>
      
      {/* --- Hero Section --- */}
      <section className="relative  text-white pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="public/FLAG.jpg" 
            alt="Party Flag"
            className="w-full h-full object-cover opacity-20" 
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="hero-text-anim  font-semibold tracking-widest text-xl uppercase">परिवर्तन का समय आ गया है</p>
              <h2 className="hero-text-anim font-serif font-black text-5xl md:text-7xl mt-4 leading-tight">
                "एक साथ मिलकर <br/> भारत को फिर से <br/>
                <span >फिर से</span>
                <br/> <span className="font-script text-blue-400"> महान बनाएँ "</span>
              </h2>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0 relative flex justify-center">
              <div className="hero-image-anim w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] relative">
                 <img 
                    src="public/netaji.jpg" 
                    alt="Main Candidate" 
                    className="absolute bottom-0 object-contain object-bottom w-full h-auto"
                  />
              </div>
            </div>
             <div className="absolute bottom-16 right-0 lg:right-10 hidden md:block w-full max-w-xs p-6 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg">
                <p className="hero-text-anim text-sm">
                  We are a dedicated group of individuals who are passionate about revitalizing our nation and ensuring a prosperous future for all Americans.
                </p>
                <button
                  onClick={() => openModal('Our Vision', 'Our vision is to restore American values, strengthen our economy, and ensure liberty and justice for all citizens. We believe in a government that serves the people, not the other way around.')}
                  className="hero-text-anim mt-4 flex items-center justify-center w-full bg-[#0052FF] text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  SEE OUR VISION <ArrowRight size={20} className="ml-2"/>
                </button>
              </div>
          </div>
        </div>
      </section>

      {/* --- Action Cards Section --- */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {actionItems.map((item, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-lg transition-all duration-300 ${item.featured ? 'bg-[#0052FF] text-white' : 'bg-gray-50 hover:shadow-xl hover:-translate-y-2'}`}
              >
                <div className={`inline-flex p-4 rounded-full mb-4 ${item.featured ? 'bg-white text-[#0052FF]' : 'bg-blue-100 text-[#0052FF]'}`}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className={`text-sm ${item.featured ? 'text-blue-100' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Get to Know Section --- */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-5/12 w-full">
              <div className="relative rounded-lg overflow-hidden shadow-2xl"> {/* Parent needs overflow-hidden and rounded-lg */}
         <img 
          src="/netaji1.avif" 
          alt="Harendra Malik, Member of Parliament"
          className="w-full h-full object-cover aspect-[4/5]" // Image takes full space
        />
       
        {/* --- Corrected Text Box --- */}
        {/* Now positioned at the bottom with a gradient background */}
        <div className="absolute bottom-0 left-0 right-0 p-6 
                       bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
       
          <p className="font-serif italic text-base md:text-lg drop-shadow-md">
            "हरेंद्र सिंह मलिक का राजनीतिक जीवन 1978 में डीएवी कॉलेज, मुजफ्फरनगर के छात्र संघ चुनाव के साथ शुरू हुआ। 1985–1996: लगातार चार बार विधायक रहे... किसान नेता: उनकी गिनती प्रदेश के प्रमुख किसान नेताओं में होती है।"
          </p>
       
          <p className="text-xs font-bold text-blue-300 mt-4 tracking-wider drop-shadow-sm">
            MEMBER OF PARLIAMENT
          </p>
       
          <p className="font-bold text-white drop-shadow-sm">
            Harendra Malik
          </p>
        </div>
       </div>
            </div>
            <div className="lg:w-7/12 w-full mt-20 lg:mt-0">
              <p className="text-sm font-semibold text-blue-600 tracking-wider">ABOUT MP of Muzaffarnagar</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-2">Get to Know Closer <br/> With <span className="text-[#0052FF]">MP of Muzaffarnagar</span></h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                We firmly believe that when we come together, we can overcome any challenge and achieve remarkable things. Our party stands for unity, strength, and a commitment to the principles that made this nation great. We are dedicated to transparent governance and policies that benefit every American.
              </p>
              <button
                onClick={() => openModal('Our Core Issues', 'We focus on economic prosperity, national security, healthcare reform, and educational excellence. Explore our detailed plans on how we aim to address these critical areas.')}
                className="mt-8 flex items-center bg-[#0052FF] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                SEE THE ISSUES <ArrowRight size={20} className="ml-2"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Issues Section --- */}
      <section className="mt-24 lg:mt-32">
        <div className="container mx-auto px-0 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            <div className="relative text-white flex flex-col justify-center items-start p-8 lg:p-16 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none" style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1599321349979-57753a355f39?q=80&w=1974&auto=format&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="absolute inset-0 bg-black opacity-50 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"></div>
              <div className="relative z-10">
                <p className="text-sm font-semibold tracking-wider">THE ISSUES</p>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-2">Our <span className="text-blue-400">Responsibility</span> and Government Accountability</h2>
                <button
                  onClick={() => openModal('All Issues', 'We are committed to full transparency and accountability. Our detailed plans for each issue are available for public review.')}
                  className="mt-8 bg-white text-blue-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                >
                  SEE ALL ISSUES
                </button>
              </div>
            </div>
            <div className="bg-[#002D62] text-white flex flex-col justify-center p-8 lg:p-16 rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none">
              <div className="space-y-6">
                {issues.map((issue, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="p-3 bg-blue-900 rounded-md mr-4">
                      <issue.icon size={24} className="text-blue-300"/>
                    </div>
                    <span className="text-xl font-semibold group-hover:text-blue-300 transition-colors cursor-pointer">{issue.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission & Vision Section --- */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-blue-600 tracking-wider">OUR PRIORITY</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mt-2">Our Mission & <span className="text-[#0052FF]">Vision</span></h2>
            <p className="mt-4 text-gray-600">
              Our mission is to create a better future for our nation and its citizens. We are driven by a shared vision of progress, equality, and prosperity for all.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionItems.map((item, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-lg transition-all duration-300 ${item.featured ? 'bg-[#0052FF] text-white' : 'bg-white shadow-lg'}`}
              >
                <div className={`inline-flex p-3 rounded-md mb-6 ${item.featured ? 'bg-white text-[#0052FF]' : 'bg-blue-100 text-[#0052FF]'}`}>
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className={`${item.featured ? 'text-blue-100' : 'text-gray-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}