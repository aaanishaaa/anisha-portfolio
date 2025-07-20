import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, User, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

export default function Contact({ onClose }) {
  const [activeTab, setActiveTab] = useState('contact');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="bg-gray-100 border-2 border-gray-400 shadow-xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl font-mono select-none max-h-[95vh] overflow-hidden"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Title Bar */}
        <div 
          className="bg-gradient-to-r from-gray-200 to-gray-300 px-3 sm:px-4 py-2 border-b-2 border-gray-400 flex items-center justify-between cursor-move"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 border border-gray-600 flex items-center justify-center">
              <Mail className="w-2 h-2 text-white" />
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-800">Contact Me - Properties</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-yellow-500 rounded-full border border-gray-500"></div>
            <div className="w-4 h-4 bg-gray-400 rounded-full border border-gray-500"></div>
            <button 
              onClick={onClose}
              className="w-4 h-4 bg-red-500 hover:bg-red-500 rounded-full border border-gray-500 flex items-center justify-center"
            >
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-100 border-b border-gray-400 flex overflow-x-auto">
          <button
            className={`px-2 sm:px-4 py-2 text-xs font-bold border-r border-gray-400 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'contact' ? 'bg-white border-t-2 border-t-blue-500' : 'bg-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Info
          </button>
          <button
            className={`px-2 sm:px-4 py-2 text-xs font-bold border-r border-gray-400 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'message' ? 'bg-white border-t-2 border-t-blue-500' : 'bg-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('message')}
          >
            Send Message
          </button>
          <button
            className={`px-2 sm:px-4 py-2 text-xs font-bold border-r border-gray-400 whitespace-nowrap flex-shrink-0 ${
              activeTab === 'social' ? 'bg-white border-t-2 border-t-blue-500' : 'bg-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('social')}
          >
            Social Links
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-3 sm:p-6 h-64 sm:h-80 md:h-96 overflow-y-auto">
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-gray-300 bg-gray-50">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-bold text-sm">Email</div>
                    <div className="text-sm text-gray-600">anisha@example.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-gray-300 bg-gray-50">
                  <Phone className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-bold text-sm">Phone</div>
                    <div className="text-sm text-gray-600">Available upon request</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-gray-300 bg-gray-50">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-bold text-sm">Location</div>
                    <div className="text-sm text-gray-600">Remote work available worldwide</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Response Time:</strong> I typically respond to messages within 24 hours during business days.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'message' && (
            <div>
              <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-4">Send me a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-2 py-1 sm:py-2 border border-gray-400 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-2 py-1 sm:py-2 border border-gray-400 text-sm"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Subject:</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-2 py-1 sm:py-2 border border-gray-400 text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Message:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-2 py-1 sm:py-2 border border-gray-400 text-sm resize-none"
                    required
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="submit"
                    className="bg-gray-200 hover:bg-gray-300 border border-gray-400 px-4 py-2 text-sm font-bold w-full sm:w-auto"
                  >
                    Send Message
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                    className="bg-gray-200 hover:bg-gray-300 border border-gray-400 px-4 py-2 text-sm font-bold w-full sm:w-auto"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Social Media & Links</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-300 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 border border-gray-400 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">in</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">LinkedIn</div>
                      <div className="text-xs text-gray-600">Professional networking</div>
                    </div>
                  </div>
                  <button className="text-xs bg-gray-200 border border-gray-400 px-2 py-1 hover:bg-gray-300">
                    Visit
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-300 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-800 border border-gray-400 flex items-center justify-center">
                      <span className="text-white text-sm">🐙</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">GitHub</div>
                      <div className="text-xs text-gray-600">Code repositories</div>
                    </div>
                  </div>
                  <button className="text-xs bg-gray-200 border border-gray-400 px-2 py-1 hover:bg-gray-300">
                    Visit
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-300 bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-400 border border-gray-400 flex items-center justify-center">
                      <span className="text-white text-sm">🐦</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">Twitter</div>
                      <div className="text-xs text-gray-600">Latest updates</div>
                    </div>
                  </div>
                  <button className="text-xs bg-gray-200 border border-gray-400 px-2 py-1 hover:bg-gray-300">
                    Visit
                  </button>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-300">
                <p className="text-sm text-yellow-800">
                  <strong>Tip:</strong> Follow me on social media for updates on my latest projects and tech insights!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
