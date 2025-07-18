import { useState } from 'react';
import { X, AlertCircle, Folder, Search, Palette, Settings } from 'lucide-react';
import cat from '../assets/elements/cat.gif';
import folder from '../assets/icons/folder.png';
import me from '../assets/elements/me.png';
import contacts from '../assets/icons/contacts.png';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Contact from './Contact';
export default function Window() {
  const [showCreativityError, setShowCreativityError] = useState(true);
  const [showConcentrationError, setShowConcentrationError] = useState(true);
  const [showFolderPopup, setShowFolderPopup] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showContactMe, setShowContactMe] = useState(false);
// const [notifications, setNotifications] = useState([
//   { id: 1, user: 'Versus Bot', message: 'You’ve been challenged to a 1v1 DSA duel!', type: 'less go Battle Mode', avatar: '🕹️' },
//   { id: 2, user: 'HeartByte Core', message: '99% model accuracy achieved on test set!', type: 'Niceee', avatar: '❤️' },
//   { id: 3, user: 'Git Guardian', message: '4 pull requests need reviewing', type: 'Dev Stuff', avatar: '🐙' }
// ]);

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
          {/* Folder Icon with Popup */}
          <div className="flex flex-col items-center space-y-1 sm:space-y-2 w-12 sm:w-16 md:w-20">
            <div
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 cursor-pointer mb-2 sm:mb-3 hover:scale-110 transition-transform duration-300"
            onClick={() => setShowFolderPopup(true)}
            >
            <img src={folder} onClick={() => setShowFolderPopup(true)} />
            </div>
            <span className="text-xs text-gray-700 text-center">Cato</span>
          </div>


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
        </div>
            {showFolderPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-2xl p-4 sm:p-6 relative w-[90%] max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl flex flex-col items-center">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowFolderPopup(false)}
                >
                  <X className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                </button>
                <div className="mb-3 sm:mb-4 font-bold text-sm sm:text-base md:text-lg">Cato Folder</div>
                <img
                  src={cat}
                  alt="Cato GIF"
                  className="rounded-lg w-full h-full object-cover "
                />
                </div>
              </div>
            )}

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

      {/* Notifications */}
      {/* <div className="absolute top-2 sm:top-4 md:top-8 right-2 sm:right-4 md:right-8 space-y-2 sm:space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white border-2 border-gray-400 rounded-lg p-2 sm:p-3 shadow-lg min-w-48 sm:min-w-56 md:min-w-64 flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs sm:text-sm">
              {notification.avatar}
            </div>
            <div className="flex-1">
              <div className="font-bold text-xs sm:text-sm">{notification.user}</div>
              <div className="text-xs text-gray-600">{notification.message}</div>
            </div>
            <button 
              onClick={() => dismissNotification(notification.id)}
              className="bg-gray-200 hover:bg-gray-300 px-1 sm:px-2 py-1 rounded text-xs font-bold"
            >
              {notification.type}
            </button>
          </div>
        ))}
      </div> */}

      {/* Main Error Dialog
      {showCreativityError && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 bg-gray-100 border-2 border-gray-400 rounded-lg shadow-xl w-96">
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 px-4 py-2 border-b-2 border-gray-400 flex items-center justify-between">
            <span className="text-sm font-bold">creativity.exe error</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-yellow-400 rounded-full border border-gray-500"></div>
              <div className="w-4 h-4 bg-gray-300 rounded-full border border-gray-500"></div>
              <button 
                onClick={() => setShowCreativityError(false)}
                className="w-4 h-4 bg-red-400 hover:bg-red-500 rounded-full border border-gray-500 flex items-center justify-center"
              >
                <X className="w-2 h-2" />
              </button>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <div className="font-bold text-sm">creativity.exe has stopped working</div>
                <div className="text-xs text-gray-600">You can check an online solution to the problem.</div>
              </div>
            </div>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <span>→</span>
                <span>Check similar things on Dribbble "for inspiration"</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>→</span>
                <span>Go to Procrastiland Explorer</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>→</span>
                <span>Quit design forever</span>
              </div>
            </div>
            
            <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1">
              <span>↓</span>
              <span>View excuses for this problem</span>
            </button>
          </div>
        </div>
      )} */}

      {/* Concentration Error Dialog
      {showConcentrationError && (
        <div className="absolute top-72 left-1/2 transform -translate-x-1/2 translate-x-16 bg-yellow-50 border-2 border-yellow-400 rounded-lg shadow-xl w-80">
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 border-b-2 border-yellow-400 flex items-center justify-between">
            <span className="text-sm font-bold">Concentration error</span>
            <button 
              onClick={() => setShowConcentrationError(false)}
              className="w-4 h-4 bg-red-400 hover:bg-red-500 rounded-full border border-gray-500 flex items-center justify-center"
            >
              <X className="w-2 h-2" />
            </button>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-800" />
              </div>
              <div className="text-sm">
                <div className="font-bold">You can't start working because concentration.dll is missing.</div>
                <div className="text-xs text-gray-600 mt-1">
                  Try to take a nap and fix this problem later, however it may not work.
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={() => setShowConcentrationError(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1 rounded text-sm"
              >
                Say no more
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* About Me Component */}
      {showAboutMe && (
        <AboutMe onClose={() => setShowAboutMe(false)} />
      )}

      {/* Projects Component */}
      {showProjects && (
        <Projects onClose={() => setShowProjects(false)} />
      )}

      {/* Contact Me Component */}
      {showContactMe && (
        <Contact onClose={() => setShowContactMe(false)} />
      )}
      
      </div> {/* Close content layer */}
    </div> {/* Close main container */}
    </>
  );
}