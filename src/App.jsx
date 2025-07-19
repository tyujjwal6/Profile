import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, ChevronDown, ArrowRight, ClipboardList, Calendar, Users, Gift,
  Landmark, Globe, Timer, HeartPulse, Scale, TrendingUp, Stethoscope, Users2,
  Leaf,
  Award
} from 'lucide-react';
// Import GSAP and the ScrollTrigger plugin
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CompanyMilestones from './CompanyMilestones';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// --- Modal Component with Enhanced Animations ---
// A reusable modal component with GSAP-powered entry and exit animations.
const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // This effect handles the exit animation.
  // It runs the animation first, then calls the parent's onClose function.
  const handleClose = () => {
    gsap.to([modalRef.current, backdropRef.current], {
      opacity: 0,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: onClose, // This is the key: call onClose only after animation finishes
    });
  };
  
  // This effect handles the entry animation when the modal is opened.
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-xl w-full relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button
          onClick={handleClose}
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
    const ctx = gsap.context(() => {
      // --- Initial Page Load Animations ---
      gsap.from(".nav-item-anim", {
        duration: 0.8, y: -30, opacity: 0, stagger: 0.1, ease: 'power3.out',
      });
      
      const heroTl = gsap.timeline({ delay: 0.5 });
      heroTl
        .from(".hero-text-anim", {
          duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out',
        })
        .from(".hero-image-anim", {
          duration: 1.2, x: 100, opacity: 0, ease: 'power3.out',
        }, "-=1") // Start this animation 1s before the previous one ends
        .from(".hero-vision-box-anim", {
            duration: 0.8, opacity: 0, y: 30, ease: 'power3.out'
        }, "-=0.5");
        
      // --- Scroll-Triggered Animations ---

      // Hero background parallax effect
      gsap.to(".hero-bg-image", {
        scrollTrigger: {
          trigger: ".hero-section",
          scrub: true,
        },
        y: 100,
        scale: 1.1,
      });

      // Action Cards Section Animation
      gsap.from(".action-card-anim", {
        scrollTrigger: {
          trigger: ".action-cards-section",
          start: "top 80%",
          toggleActions: "play none none none",
        },
        duration: 0.8,
        opacity: 0,
        y: 50,
        stagger: 0.2,
        ease: 'power2.out',
      });

      // Get to Know Section Animation
      const getToKnowTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".get-to-know-section",
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
      getToKnowTl
        .from(".get-to-know-image-anim", { duration: 1, x: -100, opacity: 0, ease: 'power3.out' })
        .from(".get-to-know-text-anim", {
          duration: 0.8, x: 50, opacity: 0, stagger: 0.15, ease: 'power3.out'
        }, "-=0.7");

      // Issues Section Animation
      gsap.to(".issues-bg-image", {
        scrollTrigger: {
          trigger: ".issues-section",
          scrub: 1,
        },
        scale: 1.1,
        duration: 2,
      });
      gsap.from(".issue-item-anim", {
        scrollTrigger: {
          trigger: ".issues-section",
          start: "top 60%",
          toggleActions: "play none none none",
        },
        duration: 0.6,
        opacity: 0,
        x: 50,
        stagger: 0.2,
      });
      

            // ... (inside the useEffect's ctx function)

      
      // Mission & Vision Section Animation
      gsap.from(".mission-title-anim", {
          scrollTrigger: {
              trigger: ".mission-section",
              start: "top 80%",
              toggleActions: "play none none none",
          },
          duration: 1,
          opacity: 0,
          y: 40,
          stagger: 0.2
      });
      gsap.from(".mission-card-anim", {
          scrollTrigger: {
              trigger: ".mission-cards-container",
              start: "top 85%",
              toggleActions: "play none none none",
          },
          duration: 0.8,
          opacity: 0,
          y: 50,
          scale: 0.95,
          stagger: 0.2,
          ease: 'power2.out'
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
          <h1 className="text-3xl text-gray-600 font-bold nav-item-anim">MP of Muzaffarnagar.</h1>
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
      <section className="hero-section relative text-white pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/FLAG.jpg" 
            alt="Party Flag"
            className="hero-bg-image w-full h-full object-cover " 
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left">
              <p className="hero-text-anim font-semibold tracking-widest text-xl uppercase">परिवर्तन का समय आ गया है</p>
              <h2 className="hero-text-anim font-serif font-black text-5xl md:text-7xl mt-4 leading-tight">
                "एक साथ मिलकर <br/> भारत को फिर से <br/>
                <span >फिर से</span>
                <br/> <span className="font-script text-gray-600"> महान बनाएँ "</span>
              </h2>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0 relative flex justify-center">
              <div className="hero-image-anim w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] relative">
                 <img 
                    src="/netaji.png" 
                    alt="Main Candidate" 
                    className="absolute bottom-0 object-contain object-bottom w-full h-auto"
                  />
              </div>
            </div>
             <div className="hero-vision-box-anim absolute bottom-16 right-0 lg:right-10 hidden md:block w-full max-w-xs p-6 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg">
                
                <button
                  onClick={() => openModal('Our Vision', "हमारा लक्ष्य भारतीय मूल्यों की पुनर्स्थापना करना, अर्थव्यवस्था को सशक्त बनाना, और सभी नागरिकों के लिए स्वतंत्रता और न्याय सुनिश्चित करना है। हम ऐसे शासन में विश्वास करते हैं जो जनता की सेवा करे, न कि जनता उस शासन की।")}
                  className="mt-4 flex items-center justify-center w-full bg-[#0052FF] text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  SEE OUR VISION <ArrowRight size={20} className="ml-2"/>
                </button>
              </div>
          </div>
        </div>
      </section>

      {/* --- Action Cards Section --- */}
      

      {/* --- Get to Know Section --- */}
      <section className="get-to-know-section py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="get-to-know-image-anim lg:w-5/12 w-full">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                 <img 
                  src="/netaji2.jpg" 
                  alt="Harendra Malik, Member of Parliament"
                  className="w-full h-full object-cover aspect-[4/5]"
                 />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
                  <p className="font-serif italic text-base md:text-lg drop-shadow-md">
                    "हरेंद्र सिंह मलिक का राजनीतिक जीवन 1978 में डीएवी कॉलेज, मुजफ्फरनगर के छात्र संघ चुनाव के साथ शुरू हुआ। 1985–1996: लगातार चार बार विधायक रहे... किसान नेता: उनकी गिनती प्रदेश के प्रमुख किसान नेताओं में होती है।"
                  </p>
                  <p className="text-xs font-bold text-blue-300 mt-4 tracking-wider drop-shadow-sm">MEMBER OF PARLIAMENT</p>
                  <p className="font-bold text-white drop-shadow-sm">Harendra Malik</p>
                </div>
               </div>
            </div>
            <div className="lg:w-7/12 w-full mt-20 lg:mt-0">
              <p className="get-to-know-text-anim text-sm font-semibold text-blue-600 tracking-wider">ABOUT MP of Muzaffarnagar</p>
              <h2 className="get-to-know-text-anim font-serif text-4xl lg:text-5xl font-bold mt-2">Get to Know Closer <br/> With <span className="text-[#0052FF]">MP of Muzaffarnagar</span></h2>
              <p className="get-to-know-text-anim mt-6 text-gray-600 leading-relaxed">
                "हम दृढ़ता से मानते हैं कि जब हम एकजुट होते हैं, तो किसी भी चुनौती को पार कर सकते हैं और असाधारण उपलब्धियाँ हासिल कर सकते हैं। हमारी पार्टी एकता, शक्ति और उन सिद्धांतों के प्रति प्रतिबद्ध है, जिन्होंने इस राष्ट्र को महान बनाया है। हम पारदर्शी शासन व्यवस्था और ऐसी नीतियों के लिए समर्पित हैं जो हर भारतीय के हित में हों।"
              </p>
              <button
                onClick={() => openModal('Our Core Issues', "हम आर्थिक समृद्धि, राष्ट्रीय सुरक्षा, स्वास्थ्य सेवा में सुधार और शैक्षिक उत्कृष्टता पर विशेष ध्यान देते हैं। इन महत्वपूर्ण क्षेत्रों को कैसे सुलझाया जाएगा, इस पर हमारे विस्तृत योजनाओं को जानें।")}
                className="get-to-know-text-anim mt-8 flex items-center bg-[#0052FF] text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                SEE THE ISSUES <ArrowRight size={20} className="ml-2"/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- Issues Section --- */}
      <section className="issues-section mt-24 lg:mt-32">
        <div className="container mx-auto px-0 lg:px-6">
          <div className="grid grid-cols-1  min-h-[500px]">
            <div className="relative text-white flex flex-col justify-center items-start p-8 lg:p-16 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none" >
              <div className="absolute inset-0 bg-black opacity-50 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none"></div>
              <img src='https://images.unsplash.com/photo-1599321349979-57753a355f39?q=80&w=1974&auto=format&fit=crop' alt="Government Building" className="issues-bg-image absolute inset-0 w-full h-full object-cover -z-10 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none" />
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
            
          </div>
        </div>
      </section>

      {/* --- Mission & Vision Section --- */}
      <section className="mission-section py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="mission-title-anim text-sm font-semibold text-blue-600 tracking-wider">OUR PRIORITY</p>
            <h2 className="mission-title-anim font-serif text-4xl lg:text-5xl font-bold mt-2">Our Mission & <span className="text-[#0052FF]">Vision</span></h2>
            <p className="mission-title-anim mt-4 text-gray-600">
              "हमारा मिशन है कि हम अपने देश और इसके नागरिकों के लिए एक बेहतर भविष्य का निर्माण करें। हम सभी की साझा दृष्टि — प्रगति, समानता और समृद्धि — से प्रेरित हैं।"
            </p>
          </div>
          
        </div>
      </section>

      
        <CompanyMilestones />
      



      
    </div>
  );
}
