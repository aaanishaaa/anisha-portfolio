import React, { useState } from 'react';
import { X, Minimize2, Maximize2, User, Code, Coffee, Music, Heart } from 'lucide-react';
import me2 from "/me2.png";

export default function AboutMe({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState('bio');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

const skills = [
  { name: 'JavaScript', level: 85, color: '#f7df1e' },
  { name: 'React / React Native', level: 90, color: '#61dafb' },
  { name: 'HTML / CSS / Tailwind / Sass', level: 95, color: '#e34c26' },
  { name: 'TypeScript', level: 80, color: '#3178c6' },
  { name: 'Python', level: 75, color: '#3776ab' },
  { name: 'Figma / UI-UX Design', level: 90, color: '#a259ff' },
  { name: 'Git / GitHub', level: 85, color: '#f05032' },
  { name: 'C++', level: 70, color: '#00599C' },
  { name: 'Flask / Django', level: 60, color: '#000000' },
];


  const hobbies = [
    { icon: '🎮', name: 'Gaming', description: 'Love retro and indie games' },
    { icon: '🎵', name: 'Music', description: 'Synthwave and lo-fi enthusiast' },
    { icon: '☕', name: 'Coffee', description: 'Fuel for coding sessions' },
    { icon: '📚', name: 'Reading', description: 'Sci-fi and tech books' },
    { icon: '🎨', name: 'Painting', description: 'Oil Painting and Sketches' },
    { icon: '🌸', name: 'Gardening', description: 'Plants and Flowers' }
  ];

  const handleMouseDown = (e) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for mouse move and up
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection while dragging
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div className={`fixed inset-0 z-50 ${isMaximized ? 'p-0' : 'p-2 sm:p-4 md:p-8 pointer-events-none'}`}>
      <div 
        className={`draggable-window retro-window bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-gray-400 shadow-2xl ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl h-4/5 sm:h-3/4 md:h-3/5'
        } flex flex-col font-mono relative scanlines ${isDragging ? 'cursor-grabbing' : ''} pointer-events-auto`}
        style={!isMaximized ? {
          transform: `translate(${position.x}px, ${position.y}px)`,
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginLeft: '-26%',
          marginTop: isMaximized ? '0' : '-17%'
        } : {}}
      >
        
        {/* Window Title Bar */}
        <div 
          className={`bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 sm:px-4 py-2 flex items-center justify-between border-b-2 border-gray-500 ${
            !isMaximized ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <User className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-bold text-xs sm:text-sm">About Me - Anisha.exe</span>
          </div>
          <div className="flex space-x-1">
            <button 
              className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex items-center justify-center retro-button"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Minimize2 className="w-2 h-2 sm:w-3 sm:h-3 text-black" />
            </button>
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex items-center justify-center retro-button"
            >
              <Maximize2 className="w-2 h-2 sm:w-3 sm:h-3 text-black" />
            </button>
            <button 
              onClick={onClose}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-5 h-5 sm:w-6 sm:h-6 bg-red-400 hover:bg-red-500 border border-gray-500 flex items-center justify-center retro-button"
            >
              <X className="w-2 h-2 sm:w-3 sm:h-3 text-black" />
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="bg-gray-100 border-b border-gray-400 px-2 sm:px-4 py-1">
          <div className="flex space-x-3 sm:space-x-6 text-xs sm:text-sm">
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">File</span>
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">View</span>
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">Help</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-200 border-b border-gray-400 px-2 sm:px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto">
            {[
              { id: 'bio', label: 'Bio', icon: '👤' },
              { id: 'skills', label: 'Skills', icon: '💻' },
              { id: 'hobbies', label: 'Hobbies', icon: '🎯' },
              { id: 'contact', label: 'Contact', icon: '📧' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 sm:px-4 py-2 border border-gray-400 text-xs sm:text-sm font-bold whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-white border-t-2 border-t-blue-500 -mb-px' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto bg-white">
          
          {/* Bio Tab */}
          {activeTab === 'bio' && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex-shrink-0 self-center sm:self-start">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-gray-400 bg-pink-100 p-2">
                      <img src={me2} alt="Profile" className="w-full h-full object-cover pixelated" />
                    </div>
                  <div className="text-center mt-2 text-xs sm:text-sm font-bold">anisha.png</div>
                </div>
                <div className="flex-1 space-y-3 sm:space-y-4">
                  <div className="border-2 border-gray-400 p-3 sm:p-4 bg-gray-50">
                    <h2 className="text-lg sm:text-xl font-bold mb-2 text-blue-800">Hi, I'm Anisha! 👋</h2>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      Welcome to my digital world! I'm a passionate web developer who loves creating 
                      beautiful and functional websites. When I'm not coding, you'll find me exploring 
                      new technologies, sipping coffee, or getting lost in a good book.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="border-2 border-gray-400 p-2 sm:p-3 bg-yellow-50">
                      <h3 className="font-bold text-xs sm:text-sm mb-2">📍 Location</h3>
                      <p className="text-xs">Somewhere on Earth</p>
                    </div>
                    <div className="border-2 border-gray-400 p-2 sm:p-3 bg-green-50">
                      <h3 className="font-bold text-xs sm:text-sm mb-2">🎓 Education</h3>
                      <p className="text-xs">Computer Science</p>
                    </div>
                    <div className="border-2 border-gray-400 p-2 sm:p-3 bg-blue-50">
                      <h3 className="font-bold text-xs sm:text-sm mb-2">💼 Role</h3>
                      <p className="text-xs">Frontend Developer</p>
                    </div>
                    <div className="border-2 border-gray-400 p-2 sm:p-3 bg-purple-50">
                      <h3 className="font-bold text-xs sm:text-sm mb-2">🌟 Passion</h3>
                      <p className="text-xs">Creating digital experiences</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">Technical Skills</h2>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="border-2 border-gray-400 p-3 sm:p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-xs sm:text-sm">{skill.name}</span>
                      <span className="text-xs text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-300 border border-gray-500 h-3 sm:h-4">
                      <div 
                        className="h-full border-r border-gray-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${skill.level}%`, 
                          backgroundColor: skill.color,
                          '--target-width': `${skill.level}%`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-2 border-gray-400 p-3 sm:p-4 bg-yellow-50 mt-6">
                <h3 className="font-bold text-xs sm:text-sm mb-2">🛠️ Tools & Technologies</h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {['VS Code', 'Git', 'Figma', 'Photoshop', 'Webpack', 'Vite', 'MongoDB', 'PostgreSQL'].map((tool) => (
                    <span key={tool} className="px-1 sm:px-2 py-1 bg-white border border-gray-400 text-xs font-bold">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Hobbies Tab */}
          {activeTab === 'hobbies' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">When I'm Not Coding...</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {hobbies.map((hobby) => (
                  <div key={hobby.name} className="border-2 border-gray-400 p-3 sm:p-4 bg-gradient-to-br from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 transition-all duration-300">
                    <div className="text-xl sm:text-2xl mb-2">{hobby.icon}</div>
                    <h3 className="font-bold text-xs sm:text-sm mb-1">{hobby.name}</h3>
                    <p className="text-xs text-gray-600">{hobby.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-2 border-gray-400 p-3 sm:p-4 bg-blue-50">
                <h3 className="font-bold text-xs sm:text-sm mb-2">🎵 Currently Vibing To</h3>
                <div className="bg-white border border-gray-400 p-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>I Want To Break Free - "Queen"</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">Let's Connect!</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="border-2 border-gray-400 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
                    <h3 className="font-bold text-xs sm:text-sm mb-2">📧 Email</h3>
                    <p className="text-xs break-all">anishaworks21@example.com</p>
                  </div>
                  
                  <div className="border-2 border-gray-400 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                    <h3 className="font-bold text-xs sm:text-sm mb-2">🐱 GitHub</h3>
                    <p className="text-xs break-all">github.com/aaanishaaa</p>
                  </div>
                  
                  <div className="border-2 border-gray-400 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h3 className="font-bold text-xs sm:text-sm mb-2">💼 LinkedIn</h3>
                    <p className="text-xs break-all"><a href="https://www.linkedin.com/in/anisha-rawat/" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/anisha-rawat/</a></p>
                  </div>
                </div>
                
                <div className="border-2 border-gray-400 p-3 sm:p-4 bg-green-50">
                  <h3 className="font-bold text-xs sm:text-sm mb-4">💌 Send Me a Message</h3>
                  <div className="space-y-2">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full border border-gray-400 p-2 text-xs"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full border border-gray-400 p-2 text-xs"
                    />
                    <textarea 
                      placeholder="Your Message" 
                      rows="3" 
                      className="w-full border border-gray-400 p-2 text-xs resize-none"
                    ></textarea>
                    <button className="retro-button bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 text-xs font-bold border-2 border-blue-800 w-full sm:w-auto">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-200 border-t border-gray-400 px-2 sm:px-4 py-1 flex justify-between items-center text-xs">
          <div className="flex space-x-2 sm:space-x-4">
            <span>Ready</span>
            <span>|</span>
            <span className="hidden sm:inline">Tab: {activeTab}</span>
            <span className="sm:hidden">{activeTab}</span>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <span className="hidden sm:inline">Lines: 42</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Encoding: UTF-8</span>
            <span className="sm:hidden">UTF-8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
