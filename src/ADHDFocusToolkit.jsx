import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Brain, Target, CheckCircle, AlertCircle, Star, Settings, Volume2, VolumeX, Plus, X, Lightbulb } from 'lucide-react';

const ADHDFocusToolkit = () => {
  const [activeTab, setActiveTab] = useState('focus-timer');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [focusScore, setFocusScore] = useState(0);
  const [distractionLog, setDistractionLog] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        setPomodoroCount(prev => prev + 1);
        setFocusScore(prev => prev + 10);
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const logDistraction = () => {
    setDistractionLog([...distractionLog, { id: Date.now(), time: new Date().toLocaleTimeString() }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-full mr-4">
              <Brain className="h-10 w-10" />
            </div>
            <h1 className="text-5xl font-bold">ADHD Focus Toolkit</h1>
          </div>
          <p className="text-xl text-blue-100 mb-4">
            <span className="font-semibold">Executive Function • Attention • Time Management • Planning</span>
          </p>
          <p className="text-lg text-purple-100 max-w-4xl mx-auto">
            Specifically designed tools and strategies for ADHD brains. Work with your neurodivergent strengths, 
            not against them.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8 mt-8">
          <div className="flex flex-wrap gap-2">
            {['focus-timer', 'tasks', 'strategies', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'focus-timer' && <Timer className="h-5 w-5 mr-2 inline" />}
                {tab === 'tasks' && <CheckCircle className="h-5 w-5 mr-2 inline" />}
                {tab === 'strategies' && <Brain className="h-5 w-5 mr-2 inline" />}
                {tab === 'settings' && <Settings className="h-5 w-5 mr-2 inline" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Focus Timer Tab */}
        {activeTab === 'focus-timer' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <div className="text-center mb-6">
                <div className={`text-6xl font-mono font-bold mb-4 ${isBreak ? 'text-green-600' : 'text-purple-600'}`}>
                  {formatTime(timeLeft)}
                </div>
                <div className="text-lg font-medium text-gray-700 mb-2">
                  {isBreak ? '🧘 Break Time' : '🎯 Focus Time'}
                </div>
                <div className="text-sm text-gray-500">
                  Pomodoro #{pomodoroCount + 1}
                </div>
              </div>

              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-8 py-3 rounded-lg font-bold text-white transition-all ${
                    isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isRunning ? <Pause className="h-5 w-5 mr-2 inline" /> : <Play className="h-5 w-5 mr-2 inline" />}
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(25 * 60);
                    setIsBreak(false);
                  }}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
                >
                  <RotateCcw className="h-5 w-5 mr-2 inline" />
                  Reset
                </button>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Today's Focus Score</span>
                  <span className="text-2xl font-bold text-purple-600">{focusScore}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (focusScore / 100) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {pomodoroCount} pomodoros completed • {distractionLog.length} distractions logged
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
                Distraction Helper
              </h3>
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Mind wandering? Click to log it and get back on track!</p>
                <button
                  onClick={logDistraction}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all font-medium"
                >
                  <Brain className="h-5 w-5 mr-2 inline" />
                  I Got Distracted
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-green-500" />
                ADHD-Friendly Task List
              </h3>
              
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a task (keep it specific and small!)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && addTask()}
                />
                <button
                  onClick={addTask}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No tasks yet. Add your first task above!</p>
                    <p className="text-sm mt-2">💡 Tip: Break big tasks into smaller, specific actions</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`p-4 rounded-lg border transition-all ${
                        task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`mr-3 ${task.completed ? 'text-green-500' : 'text-gray-400'}`}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {task.text}
                          </span>
                        </div>
                        <button
                          onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🧠 ADHD Task Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">✂️ Break It Down</h4>
                  <p className="text-sm text-purple-600">
                    "Clean room" → "Put clothes in basket", "Make bed", "Clear desk"
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">⏰ Time Boxing</h4>
                  <p className="text-sm text-blue-600">
                    Estimate how long each task will take. Add 50% more time!
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">🎯 One Thing</h4>
                  <p className="text-sm text-green-600">
                    Focus on ONE task at a time. Resist the urge to multitask.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-700 mb-2">🏆 Celebrate Wins</h4>
                  <p className="text-sm text-orange-600">
                    Completed a task? Do a little celebration! Your brain needs the dopamine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Strategies Tab */}
        {activeTab === 'strategies' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="h-6 w-6 mr-2 text-blue-500" />
                ADHD Focus Strategies
              </h3>
              <p className="text-gray-600 mb-6">
                Quick strategies to help you refocus when your mind starts to wander.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { emoji: '🤲', title: 'Fidget Break', desc: 'Use fidget toy for 1 minute', category: 'Physical' },
                  { emoji: '🫁', title: 'Box Breathing', desc: '4 in, 4 hold, 4 out, 4 hold', category: 'Calming' },
                  { emoji: '🏃', title: 'Quick Movement', desc: '10 jumping jacks or stretch', category: 'Physical' },
                  { emoji: '💧', title: 'Hydration Reset', desc: 'Drink water mindfully', category: 'Reset' },
                  { emoji: '🎯', title: 'Priority Check', desc: 'What\'s most important right now?', category: 'Mental' },
                  { emoji: '⭐', title: 'Micro Reward', desc: 'Celebrate what you accomplished', category: 'Motivation' }
                ].map((strategy, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer">
                    <div className="text-3xl mb-3 text-center">{strategy.emoji}</div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-center">{strategy.title}</h4>
                    <p className="text-sm text-gray-600 text-center mb-3">{strategy.desc}</p>
                    <div className="text-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        strategy.category === 'Physical' ? 'bg-blue-100 text-blue-700' :
                        strategy.category === 'Mental' ? 'bg-purple-100 text-purple-700' :
                        strategy.category === 'Calming' ? 'bg-green-100 text-green-700' :
                        strategy.category === 'Motivation' ? 'bg-pink-100 text-pink-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {strategy.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="h-6 w-6 mr-2 text-gray-500" />
                Your ADHD Stats
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{pomodoroCount}</div>
                  <div className="text-sm text-gray-600">Today's Pomodoros</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{focusScore}</div>
                  <div className="text-sm text-gray-600">Focus Points</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{tasks.filter(t => t.completed).length}</div>
                  <div className="text-sm text-gray-600">Tasks Completed</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{distractionLog.length}</div>
                  <div className="text-sm text-gray-600">Distractions Logged</div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">💡 ADHD-Friendly Reminder</h4>
                <p className="text-sm text-blue-700">
                  Remember: Logging distractions isn't about shame - it's about awareness! 
                  The more you notice your patterns, the better you can work with your ADHD brain.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🎯 ADHD Types & Strategies</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Predominantly Inattentive</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Difficulty sustaining attention, easily distracted, forgetful
                  </p>
                  <div className="text-xs text-blue-600">Best tools: Timer alerts, task breakdown, environment checks</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Predominantly Hyperactive-Impulsive</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Fidgeting, difficulty remaining seated, acting impulsively
                  </p>
                  <div className="text-xs text-blue-600">Best tools: Movement breaks, fidget strategies, quick bursts</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Combined Presentation</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Symptoms from both inattentive and hyperactive-impulsive types
                  </p>
                  <div className="text-xs text-blue-600">Best tools: All strategies - experiment to find your mix!</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
            How This Toolkit Helps Your ADHD Brain
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Timer className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Time Awareness</h4>
              <p className="text-sm text-gray-600">Visual timers help with time blindness</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Task Focus</h4>
              <p className="text-sm text-gray-600">One task at a time reduces overwhelm</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Brain className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Executive Function</h4>
              <p className="text-sm text-gray-600">Structured support for planning</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Dopamine Rewards</h4>
              <p className="text-sm text-gray-600">Built-in celebration and progress tracking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADHDFocusToolkit;
