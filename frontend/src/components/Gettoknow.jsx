import React, { useState } from 'react';
import { X, Minimize2, Maximize2, Star, Trophy, Gamepad2, Heart, Coffee } from 'lucide-react';

export default function GetToKnow({ onClose }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'finished'
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "What's Anisha's favorite programming language?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correct: 3,
      fact: "C++ is my go-to language for its versatility and clean syntax!"
    },
    {
      question: "Where is Anisha currently based?",
      options: ["Bengalore", "Mumbai", "Delhi", "Chennai"],
      correct: 2,
      fact: "I'm currently in Delhi, close to my loved ones!"
    },
    {
      question: "What's Anisha's favorite type of project to work on?",
      options: ["Web Apps", "Web3", "AI/ML", "All of the above"],
      correct: 3,
      fact: "I love exploring all areas of tech - from web development to AI!"
    },
    {
      question: "What does Anisha do for fun?",
      options: ["Gaming", "Reading tech blogs", "Cooking", "Books?"],
      correct: 0,
      fact: "LOVEE GAMING!!"
    },
    {
      question: "What's Anisha's dream tech company to work for?",
      options: ["Google", "Apple", "Amazon", "IBM"],
      correct: 3,
      fact: "While other companies are amazing, I personally love the vision of IBM!"
    },
    {
      question: "What's Anisha's coffee preference?",
      options: ["Black coffee", "Latte", "Cappuccino", "Tea (plot twist!)"],
      correct: 0,
      fact: "A good Black coffee is my coding fuel - perfect balance of coffee and comfort!"
    }
  ];

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

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const selectAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameState('finished');
      }
    }, 2000);
  };

  const resetGame = () => {
    setGameState('start');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "Perfect! 🎉 You know me really well!";
    if (percentage >= 80) return "Awesome! 🌟 You're getting to know me!";
    if (percentage >= 60) return "Good job! 👍 We're becoming friends!";
    if (percentage >= 40) return "Not bad! 😊 Keep learning about me!";
    return "Thanks for playing! 💫 Now you know me better!";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div 
        className="draggable-window retro-window bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-gray-400 shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl flex flex-col font-mono relative scanlines max-h-[95vh] overflow-hidden"
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
            <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-bold">Get to Know Anisha - Quiz Game</span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-gray-400">
              <Minimize2 className="w-2 h-2 sm:w-3 sm:h-3 text-black" />
            </button>
            <button className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-gray-400">
              <Maximize2 className="w-2 h-2 sm:w-3 sm:h-3 text-black" />
            </button>
            <button
              onClick={onClose}
              className="w-4 h-4 sm:w-5 sm:h-5 bg-red-500 border border-gray-500 flex items-center justify-center hover:bg-red-600"
            >
              <X className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
            </button>
          </div>
        </div>

        {/* Game Content */}
        <div className="flex-1 overflow-auto bg-white">
          
          {/* Start Screen */}
          {gameState === 'start' && (
            <div className="p-6 text-center space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded border-2 border-gray-400">
                <Gamepad2 className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Get to Know Anisha!</h2>
                <p className="text-gray-600 mb-4">
                  Ready for a fun quiz? Test your knowledge about me and learn some interesting facts along the way!
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center"><Star className="w-4 h-4 mr-1" /> 6 Questions</span>
                  <span className="flex items-center"><Trophy className="w-4 h-4 mr-1" /> Fun Facts</span>
                  <span className="flex items-center"><Heart className="w-4 h-4 mr-1" /> Get to Know Me</span>
                </div>
              </div>
              
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded border-2 border-gray-400 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all font-bold text-lg shadow-lg"
              >
                🎮 Start Quiz!
              </button>
            </div>
          )}

          {/* Playing Screen */}
          {gameState === 'playing' && (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-bold text-purple-600">
                    Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 border-2 border-gray-400 h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded border-2 border-gray-400 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {questions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => selectAnswer(index)}
                      disabled={showResult}
                      className={`w-full p-3 text-left border-2 rounded transition-all ${
                        selectedAnswer === index
                          ? 'bg-blue-100 border-blue-500 text-blue-800'
                          : 'bg-white border-gray-300 hover:bg-gray-50'
                      } ${
                        showResult && index === questions[currentQuestion].correct
                          ? 'bg-green-100 border-green-500 text-green-800'
                          : ''
                      } ${
                        showResult && selectedAnswer === index && index !== questions[currentQuestion].correct
                          ? 'bg-red-100 border-red-500 text-red-800'
                          : ''
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {showResult && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded border-2 border-yellow-400 mb-4">
                  <div className="flex items-center mb-2">
                    <Coffee className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="font-bold text-gray-800">Fun Fact:</span>
                  </div>
                  <p className="text-gray-700">{questions[currentQuestion].fact}</p>
                </div>
              )}

              {!showResult && (
                <div className="text-center">
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-6 py-2 rounded border-2 font-bold transition-all ${
                      selectedAnswer !== null
                        ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
                        : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Finished Screen */}
          {gameState === 'finished' && (
            <div className="p-6 text-center space-y-6">
              <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded border-2 border-gray-400">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Quiz Complete!</h2>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {score}/{questions.length}
                </div>
                <p className="text-lg text-gray-700 mb-4">
                  {getScoreMessage()}
                </p>
                <p className="text-gray-600">
                  Thanks for taking the time to get to know me better! 
                  {score === questions.length ? " You're officially an Anisha expert! 🎓" : " Feel free to play again anytime! 🔄"}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded border-2 border-gray-400 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105 transition-all font-bold"
                >
                  🔄 Play Again
                </button>
                <button
                  onClick={onClose}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded border-2 border-gray-400 hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all font-bold"
                >
                  ✨ Explore Portfolio
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-gray-300 border-t-2 border-gray-500 px-2 py-1 text-xs flex justify-between items-center">
          <span>Interactive Quiz Game</span>
          <span className="flex items-center space-x-2">
            <span>Ready</span>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </span>
        </div>
      </div>
    </div>
  );
}
