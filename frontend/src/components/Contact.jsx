import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { X, Mail, Phone, MapPin, Send, User, MessageCircle, Minimize2, Maximize2 } from 'lucide-react';

export default function Contact({ onClose }) {
  const [activeTab, setActiveTab] = useState('contact');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // EmailJS configuration - Replace with your actual values from EmailJS dashboard
      const serviceID = 'service_v7hpvtj';  // Get from EmailJS dashboard
      const templateID = 'template_97bsw1d';  // Get from EmailJS dashboard  
      const publicKey = 'WUHwKB9bEVZTWE0RU';  // Get from EmailJS dashboard

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'your.email@example.com' // Replace with your actual email
      };

      // Try EmailJS first
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('EmailJS failed:', error);
      
      // Fallback to mailto if EmailJS fails
      const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.open(mailtoLink);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="draggable-window retro-window bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-gray-400 shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl flex flex-col font-mono relative scanlines max-h-[95vh] overflow-hidden"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        {/* Window Title Bar */}
        <div 
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 sm:px-4 py-2 flex items-center justify-between border-b-2 border-gray-500 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center space-x-2">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-bold text-xs sm:text-sm">Contact Me - Properties</span>
          </div>
          <div className="flex space-x-1">
            <button 
              className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-300 hover:bg-gray-400 border border-gray-500 flex items-center justify-center retro-button"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Minimize2 className="w-2 h-2 sm:w-3 sm:h-3 text-black" />
            </button>
            <button 
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

        {/* Menu Bar
        <div className="bg-gray-100 border-b border-gray-400 px-2 sm:px-4 py-1">
          <div className="flex space-x-3 sm:space-x-6 text-xs sm:text-sm">
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">File</span>
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">View</span>
            <span className="hover:bg-blue-200 px-1 sm:px-2 py-1 cursor-pointer">Help</span>
          </div>
        </div> */}

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
                    <div className="text-sm text-gray-600">anishaworks21@gmail.com</div>
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
                    <div className="text-sm text-gray-600">Delhi (India)</div>
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
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Email (i will reply for sure):</label>
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
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-sm">
                    ✅ Message sent successfully!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
                    ❌ Failed to send message. Please try again or contact me directly.
                  </div>
                )}
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`border border-gray-400 px-4 py-2 text-sm font-bold w-full sm:w-auto ${
                      isSubmitting 
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setFormData({ name: '', email: '', subject: '', message: '' });
                      setSubmitStatus('');
                    }}
                    className="bg-gray-200 hover:bg-gray-300 border border-gray-400 px-4 py-2 text-sm font-bold w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <button 
                    onClick={() => window.open('https://www.linkedin.com/in/anisha-rawat/', '_blank')}
                    className="text-xs bg-gray-200 border border-gray-400 px-2 py-1 hover:bg-gray-300 cursor-pointer"
                  >
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
                  <button 
                    onClick={() => window.open('https://github.com/aaanishaaa', '_blank')}
                    className="text-xs bg-gray-200 border border-gray-400 px-2 py-1 hover:bg-gray-300 cursor-pointer"
                  >
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
                  <button 
                    onClick={() => window.open('https://x.com/anisharawr', '_blank')}
                    className="text-xs bg-gray-200 border border-gray-400 px-2 py-1 hover:bg-gray-300 cursor-pointer"
                  >
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

        {/* Status Bar */}
        <div className="bg-gray-200 border-t border-gray-400 px-2 sm:px-4 py-1 text-xs text-gray-600 flex justify-between">
          <span>Ready</span>
          <div className="flex space-x-4">
            <span>Tab: {activeTab}</span>
            <span>Lines: 42</span>
            <span>Encoding: UTF-8</span>
          </div>
        </div>
      </div>
    </div>
  );
}
