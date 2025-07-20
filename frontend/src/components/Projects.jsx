import React, { useState } from 'react';
import { X, Minimize2, Maximize2, ExternalLink, Github, Globe } from 'lucide-react';

export default function Projects({ onClose }) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      category: "web",
      description: "A retro-themed personal portfolio showcasing my work and skills",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      status: "Completed",
      icon: "🌐",
      github: "https://github.com/aaanishaaa/portfolio",
      demo: "https://anisha-portfolio.com",
      screenshot: "/me2.png"
    },
    {
      id: 2,
      title: "HeartByte Core",
      category: "ai",
      description: "AI-powered health monitoring system with real-time analytics",
      tech: ["Python", "TensorFlow", "Flask", "React"],
      status: "In Progress",
      icon: "❤️",
      github: "https://github.com/aaanishaaa/heartbyte",
      demo: "https://heartbyte-demo.com",
      screenshot: "/me2.png"
    },
    {
      id: 3,
      title: "Versus Bot",
      category: "game",
      description: "Competitive coding challenge platform with real-time battles",
      tech: ["Node.js", "Socket.io", "MongoDB", "React"],
      status: "Completed",
      icon: "🕹️",
      github: "https://github.com/aaanishaaa/versus-bot",
      demo: "https://versus-bot.com",
      screenshot: "/me2.png"
    },
    {
      id: 4,
      title: "Data Visualization Dashboard",
      category: "data",
      description: "Interactive dashboard for analyzing complex datasets",
      tech: ["D3.js", "Python", "PostgreSQL", "Vue.js"],
      status: "Completed",
      icon: "📊",
      github: "https://github.com/aaanishaaa/data-viz",
      demo: "https://data-viz-demo.com",
      screenshot: "/me2.png"
    },
    {
      id: 5,
      title: "Mobile Weather App",
      category: "mobile",
      description: "Beautiful weather app with location-based forecasts",
      tech: ["React Native", "API Integration", "Redux"],
      status: "Completed",
      icon: "🌤️",
      github: "https://github.com/aaanishaaa/weather-app",
      demo: "https://weather-app-demo.com",
      screenshot: "/me2.png"
    },
    {
      id: 6,
      title: "E-commerce Platform",
      category: "web",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      status: "In Progress",
      icon: "🛒",
      github: "https://github.com/aaanishaaa/ecommerce",
      demo: "https://ecommerce-demo.com",
      screenshot: "/me2.png"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: '📁' },
    { id: 'web', label: 'Web Apps', icon: '🌐' },
    { id: 'ai', label: 'AI/ML', icon: '🤖' },
    { id: 'game', label: 'Games', icon: '🎮' },
    { id: 'data', label: 'Data Viz', icon: '📊' },
    { id: 'mobile', label: 'Mobile', icon: '📱' }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

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

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8">
      <div 
        className={`draggable-window retro-window bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-gray-400 shadow-2xl ${
          isMaximized ? 'w-full h-full' : 'w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl h-[95vh] sm:h-[90vh] md:h-[85vh]'
        } flex flex-col font-mono relative scanlines ${isDragging ? 'cursor-grabbing' : ''} max-h-screen overflow-hidden`}
        style={!isMaximized && !isDragging ? {} : !isMaximized ? {
          transform: `translate(${position.x}px, ${position.y}px)`
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
            <span className="text-lg">📁</span>
            <span className="font-bold text-xs sm:text-sm">Projects - Anisha.exe</span>
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
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">Filter</span>
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">Help</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-200 border-b border-gray-400 px-2 sm:px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-2 sm:px-4 py-2 border border-gray-400 text-xs sm:text-sm font-bold whitespace-nowrap flex-shrink-0 ${
                  activeTab === category.id 
                    ? 'bg-white border-t-2 border-t-blue-500 -mb-px' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1 sm:mr-2">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-3 sm:p-4 md:p-6 overflow-y-auto bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="border-2 border-gray-400 bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 hover:shadow-lg transition-all duration-300">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl">{project.icon}</span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-xs sm:text-sm text-blue-800 truncate">{project.title}</h3>
                      <span className={`text-xs px-1 sm:px-2 py-1 rounded border inline-block mt-1 ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 border-green-300' 
                          : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Screenshot */}
                <div className="mb-3 border-2 border-gray-300 bg-gray-100 h-32 flex items-center justify-center">
                  <img 
                    src={project.screenshot} 
                    alt={project.title}
                    className="w-full h-full object-cover pixelated"
                  />
                </div>

                {/* Project Description */}
                <p className="text-xs text-gray-700 mb-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-3">
                  <h4 className="font-bold text-xs mb-2 text-purple-800">💻 Tech Stack:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-100 border border-purple-300 text-xs font-bold text-purple-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className="flex-1 retro-button bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 text-xs font-bold border-2 border-blue-800 flex items-center justify-center space-x-1">
                    <Github className="w-3 h-3" />
                    <span>Code</span>
                  </button>
                  <button className="flex-1 retro-button bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-xs font-bold border-2 border-green-800 flex items-center justify-center space-x-1">
                    <Globe className="w-3 h-3" />
                    <span>Demo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="font-bold text-lg text-gray-600 mb-2">No Projects Found</h3>
              <p className="text-sm text-gray-500">No projects match the selected filter.</p>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-200 border-t border-gray-400 px-2 sm:px-4 py-1 flex justify-between items-center text-xs">
          <div className="flex space-x-2 sm:space-x-4">
            <span>Ready</span>
            <span>|</span>
            <span>{filteredProjects.length} project(s)</span>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <span className="hidden sm:inline">Filter: {categories.find(c => c.id === activeTab)?.label}</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">View: Grid</span>
            <span className="sm:hidden">Grid</span>
          </div>
        </div>
      </div>
    </div>
  );
}
