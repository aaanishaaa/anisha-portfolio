import { useState } from 'react';
import { X, AlertCircle, Folder, Search, Palette, Settings } from 'lucide-react';
import cat from '../assets/elements/cat.gif';
import folder from '../assets/icons/folder.png';
import me from '../assets/elements/me.png';
export default function Window() {
  const [showCreativityError, setShowCreativityError] = useState(true);
  const [showConcentrationError, setShowConcentrationError] = useState(true);
  const [showFolderPopup, setShowFolderPopup] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, user: 'Trevor McLient', message: 'I need everything ASAP homie...', type: 'UGH', avatar: '📧' },
    { id: 2, user: 'Trevor McLient', message: '6 missing calls', type: 'GRR', avatar: '📞' },
    { id: 3, user: 'Trevor McLient', message: '36 new messages', type: 'SRSLY?', avatar: 'TM' }
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="w-full h-[90vh] relative overflow-hidden font-mono">
      {/* Cloud Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 left-16 w-24 h-12 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-6 left-32 w-32 h-16 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-12 right-24 w-28 h-14 bg-white rounded-full opacity-75"></div>
        <div className="absolute top-4 right-48 w-20 h-10 bg-white rounded-full opacity-65"></div>
      </div>
        <div className="absolute left-8 top-8 space-y-6">
          {/* Folder Icon with Popup */}
          <div className="flex flex-col items-center space-y-2 w-20">
            <div
            className="w-12 h-12 cursor-pointer"
            onClick={() => setShowFolderPopup(true)}
            >
            <img src={folder} onClick={() => setShowFolderPopup(true)} />
            </div>
            <span className="text-xs text-gray-700 text-center">Cato</span>
          </div>

          <div className="flex flex-col items-center space-y-2 w-20">
            <div className="w-12 h-12 ">
             <img src={folder}/>
            </div>
            <span className="text-xs text-gray-700 text-center">Projects</span>
          </div>

                    <div className="flex flex-col items-center space-y-2 w-20">
            <div className="w-12 h-12 mb-10 ">
             <img src={me}/>
            </div>
            <span className="text-xs text-gray-700 text-center">About Me!</span>
          </div>
        </div>
            {showFolderPopup && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-orange-200 bg-opacity-5">
                <div className="bg-white rounded-lg shadow-2xl p-6 relative w-[40rem] flex flex-col items-center">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowFolderPopup(false)}
                >
                  <X className="w-10 h-10" />
                </button>
                <div className="mb-4 font-bold text-lg">Cato Folder</div>
                <img
                  src={cat}
                  alt="Cato GIF"
                  className="rounded-lg w-full h-full object-cover"
                />
                </div>
              </div>
            )}

            {/* Right side icons */}
      <div className="absolute right-8 top-32 space-y-6">
        <div className="flex flex-col items-center space-y-2 w-20">
          <div className="w-12 h-12 bg-purple-100 border-2 border-purple-300 rounded-lg flex items-center justify-center shadow-sm">
            <Settings className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xs text-gray-700 text-center">Contact Me</span>
        </div>

        <div className="flex flex-col items-center space-y-2 w-20">
          <div className="w-12 h-12 ">
            <img src={folder} onClick={() => setShowFolderPopup(true)} />
          </div>
          <span className="text-xs text-gray-700 text-center">Anisha's project</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="absolute top-8 right-8 space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white border-2 border-gray-400 rounded-lg p-3 shadow-lg min-w-64 flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
              {notification.avatar}
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">{notification.user}</div>
              <div className="text-xs text-gray-600">{notification.message}</div>
            </div>
            <button 
              onClick={() => dismissNotification(notification.id)}
              className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs font-bold"
            >
              {notification.type}
            </button>
          </div>
        ))}
      </div>

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

    </div>
  );
}