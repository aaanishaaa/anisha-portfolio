import { useState } from 'react';
import { X, AlertCircle, Folder, Search, Palette, Settings } from 'lucide-react';
import folder from '../assets/icons/folder.png';
import me from '../assets/elements/me.png';
import contacts from '../assets/icons/contacts.png';
import game from '../assets/icons/game.png';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Contact from './Contact';
import GetToKnow from './Gettoknow';
export default function Window() {
  const [showCreativityError, setShowCreativityError] = useState(true);
  const [showConcentrationError, setShowConcentrationError] = useState(true);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContactMe, setShowContactMe] = useState(false);
  const [showGetToKnow, setShowGetToKnow] = useState(false);
  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <>
    <div className="w-full h-full relative overflow-hidden font-mono bg-[#fffaf1]">
        {/* Background image with opacity */}
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: 'url(/bg.png)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Content layer */}
        <div className="relative z-10">
        <div className="absolute left-2 sm:left-4 md:left-8 top-4 sm:top-6 md:top-8 space-y-3 sm:space-y-4 md:space-y-6">
          <div className="flex flex-col items-center space-y-1 sm:space-y-2 w-12 sm:w-16 md:w-20">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-8 sm:mb-10 md:mb-12 hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={() => setShowAboutMe(true)}
            >
             <img src={me}/>
            </div>
            <span className="text-xs text-gray-700  text-center">About Me</span>
          </div>

          <div className="flex flex-col items-center space-y-1 sm:space-y-2 w-12 sm:w-16 md:w-20">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1 sm:mb-2 md:mb-3 hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={() => setShowProjects(true)}
            >
             <img src={folder}/>
            </div>
            <span className="text-xs text-gray-700 text-center">Projects</span>
          </div>

          <div className="flex flex-col items-center space-y-1 sm:space-y-2 w-12 sm:w-16 md:w-20">
            <div 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1 sm:mb-2 md:mb-3 hover:scale-110 transition-transform duration-300 cursor-pointer"
              onClick={() => setShowGetToKnow(true)}
            >
             <img src={game} alt="Get to Know Me"/>
            </div>
            <span className="text-xs text-gray-700 text-center">Get to Know Me</span>
          </div>
        </div>

            {/* Right side icons */}
      <div className="absolute right-2 sm:right-4 md:right-8 top-20 sm:top-24 md:top-32 space-y-3 sm:space-y-4 md:space-y-6">
        <div className="flex flex-col items-center space-y-1 sm:space-y-2 w-12 sm:w-16 md:w-20">
          <div
            onClick={() => setShowContactMe(true)}
          >
           <img src={contacts} alt="Contact Me" className="w-13 h-13 object-cover hover:scale-110 transition-transform duration-300 cursor-pointer" />
          </div>
          <span className="text-xs text-gray-700 text-center">Contact Me</span>
        </div>
      </div>

      {showAboutMe && (
        <AboutMe onClose={() => setShowAboutMe(false)} />
      )}
      {showProjects && (
        <Projects onClose={() => setShowProjects(false)} />
      )}
      {showContactMe && (
        <Contact onClose={() => setShowContactMe(false)} />
      )}
      {showGetToKnow && (
        <GetToKnow onClose={() => setShowGetToKnow(false)} />
      )}
      
      </div> 
    </div> 
    </>
  );
}