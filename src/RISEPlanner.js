import React, { useState, useRef } from 'react';
import { Download, Plus, X, Clock, User, Palette, FileText, Star, ArrowRight, AlertCircle, Heart, Zap, Target, Home, Settings, CheckCircle, Timer, Smile } from 'lucide-react';

const RISEPlanner = () => {
  const [childName, setChildName] = useState('');
  const [scheduleType, setScheduleType] = useState('daily');
  const [iconStyle, setIconStyle] = useState('cartoon');
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [customActivity, setCustomActivity] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [includeBreaks, setIncludeBreaks] = useState(true);
  const [transitionWarnings, setTransitionWarnings] = useState(true);
  const [scheduleTheme, setScheduleTheme] = useState('calming');
  const previewRef = useRef(null);

  // Enhanced activity library based on frustration analysis
  const activityLibrary = {
    'morning-essentials': [
      { id: 'wake-up-gentle', name: 'Wake Up Gently', icon: '🌅', description: 'Start the day calmly', category: 'Morning routine meltdown prevention' },
      { id: 'stretch-bed', name: 'Stretch in Bed', icon: '🤸', description: '2-minute gentle stretches', category: 'Calm transition' },
      { id: 'bathroom-first', name: 'Use Toilet', icon: '🚽', description: 'Morning bathroom visit', category: 'Independence building' },
      { id: 'wash-face', name: 'Wash Face & Hands', icon: '💧', description: 'Fresh morning clean', category: 'Personal care routine' },
      { id: 'brush-teeth-morning', name: 'Brush Teeth', icon: '🦷', description: 'Morning dental care', category: 'Independence building' },
      { id: 'get-dressed-step', name: 'Get Dressed', icon: '👕', description: 'Choose and put on clothes', category: 'Independence building' },
      { id: 'breakfast-together', name: 'Breakfast Time', icon: '🥣', description: 'Nutritious morning meal', category: 'Family routine' },
      { id: 'pack-bag-check', name: 'Pack & Check Bag', icon: '🎒', description: 'Prepare for the day ahead', category: 'Leaving house preparation' }
    ],
    'leaving-house': [
      { id: 'bag-checklist', name: 'Bag Checklist', icon: '📋', description: 'Check we have everything', category: 'Leaving house - no more wars!' },
      { id: 'shoes-on', name: 'Put Shoes On', icon: '👟', description: 'Get ready to go', category: 'Leaving house preparation' },
      { id: 'coat-weather', name: 'Check Weather & Coat', icon: '🧥', description: 'Dress for the weather', category: 'Leaving house preparation' },
      { id: 'keys-wallet', name: 'Keys & Essentials', icon: '🔑', description: 'Adult reminder check', category: 'Family organisation' },
      { id: 'goodbye-house', name: 'Say Goodbye to House', icon: '👋', description: 'Closure ritual', category: 'Transition helper' },
      { id: 'walk-to-car', name: 'Walk to Car/Bus', icon: '🚗', description: 'Move to transport', category: 'Transition helper' }
    ],
    'learning-time': [
      { id: 'learning-space-ready', name: 'Prepare Learning Space', icon: '📚', description: 'Set up books, materials, comfort items', category: 'Home education preparation' },
      { id: 'morning-chat', name: 'Morning Together Time', icon: '☀️', description: 'Weather, calendar, chat about today\'s plans', category: 'Home education routine' },
      { id: 'focused-learning', name: 'Focused Learning Session', icon: '🎯', description: 'Main lesson or subject work', category: 'Home education' },
      { id: 'learning-break', name: 'Learning Break', icon: '🤸', description: 'Movement or sensory break', category: 'Home education break' },
      { id: 'hands-on-activity', name: 'Hands-On Activity', icon: '🎨', description: 'Creative, practical or science experiment', category: 'Home education' },
      { id: 'independent-study', name: 'Independent Study Time', icon: '📖', description: 'Child chooses learning activity', category: 'Home education independence' },
      { id: 'learning-review', name: 'Review What We Learned', icon: '⭐', description: 'Talk about the day\'s learning', category: 'Home education reflection' },
      { id: 'pack-away-learning', name: 'Pack Away Learning Materials', icon: '📦', description: 'Tidy up learning space', category: 'Home education organisation' }
    ],
    'trips-outings': [
      { id: 'trip-preparation', name: 'Trip Preparation', icon: '🎒', description: 'Gather what we need for our outing', category: 'Home education trips' },
      { id: 'travel-to-destination', name: 'Travel to Destination', icon: '🚗', description: 'Journey to museum, park, library etc.', category: 'Home education trips' },
      { id: 'educational-exploration', name: 'Educational Exploration', icon: '🔍', description: 'Learn through real-world experiences', category: 'Home education trips' },
      { id: 'trip-snack-break', name: 'Trip Snack Break', icon: '🥪', description: 'Refuel during our outing', category: 'Home education trips' },
      { id: 'trip-reflection', name: 'Trip Learning Chat', icon: '💭', description: 'Discuss what we discovered', category: 'Home education reflection' },
      { id: 'return-home', name: 'Return Home', icon: '🏠', description: 'Travel back from our adventure', category: 'Home education trips' }
    ],
    'afternoon-recharge': [
      { id: 'arrive-home', name: 'Arrive Home', icon: '🏠', description: 'Back to safe space', category: 'After-school transitions' },
      { id: 'decompress-time', name: 'Quiet Decompress Time', icon: '🤫', description: '15-30 mins alone time', category: 'Prevent pickup meltdowns' },
      { id: 'change-clothes', name: 'Change into Comfy Clothes', icon: '👔', description: 'Get comfortable', category: 'After-school routine' },
      { id: 'healthy-snack', name: 'Healthy Snack', icon: '🍎', description: 'Refuel energy', category: 'Afternoon routine' },
      { id: 'homework-check', name: 'Check Homework', icon: '✏️', description: 'See what needs doing', category: 'School support' },
      { id: 'free-play', name: 'Free Play Time', icon: '🎮', description: 'Choose your activity', category: 'Independence building' },
      { id: 'outdoor-fresh-air', name: 'Fresh Air Time', icon: '🌳', description: 'Outside or by window', category: 'Sensory regulation' }
    ],
    'bedtime-success': [
      { id: 'dinner-family', name: 'Family Dinner', icon: '🍽️', description: 'Evening meal together', category: 'Family routine' },
      { id: 'tidy-toys', name: 'Tidy Up Toys', icon: '🧸', description: 'Put things away', category: 'Independence building' },
      { id: 'bath-or-wash', name: 'Bath or Wash', icon: '🛁', description: 'Clean before bed', category: 'Bedtime routine' },
      { id: 'pyjamas-comfortable', name: 'Comfy Pyjamas', icon: '👔', description: 'Get ready for sleep', category: 'Bedtime routine' },
      { id: 'brush-teeth-bedtime', name: 'Brush Teeth', icon: '🦷', description: 'Evening dental care', category: 'Bedtime routine' },
      { id: 'bedtime-story', name: 'Calm Story Time', icon: '📚', description: 'Quiet together time', category: 'Bedtime routine' },
      { id: 'bedroom-ready', name: 'Bedroom Ready', icon: '🛏️', description: 'Curtains, lights, comfort', category: 'Bedtime routine' },
      { id: 'goodnight-kisses', name: 'Goodnight Kisses', icon: '😘', description: 'Love and security', category: 'Bedtime routine' },
      { id: 'peaceful-sleep', name: 'Peaceful Sleep', icon: '😴', description: 'Rest and recharge', category: 'Bedtime routine' }
    ],
    'emotional-regulation': [
      { id: 'feeling-check', name: 'How Am I Feeling?', icon: '🎭', description: 'Check in with emotions', category: 'Emotional regulation' },
      { id: 'deep-breathing', name: 'Deep Breathing', icon: '🫁', description: '5 slow breaths', category: 'Calm-down strategy' },
      { id: 'counting-to-ten', name: 'Count to Ten', icon: '🔢', description: 'Slow counting', category: 'Calm-down strategy' },
      { id: 'squeeze-hands', name: 'Squeeze Hands Tight', icon: '✊', description: 'Tension release', category: 'Sensory regulation' },
      { id: 'safe-space', name: 'Go to Safe Space', icon: '🛡️', description: 'Find comfort zone', category: 'Emotional regulation' },
      { id: 'ask-for-help', name: 'Ask for Help', icon: '🙋', description: 'Get support when needed', category: 'Communication' },
      { id: 'drink-water', name: 'Drink Some Water', icon: '💧', description: 'Hydrate and reset', category: 'Self-care' },
      { id: 'gentle-music', name: 'Listen to Calm Music', icon: '🎵', description: 'Soothing sounds', category: 'Sensory regulation' }
    ],
    'independence-builders': [
      { id: 'choose-outfit', name: 'Choose My Outfit', icon: '👗', description: 'Make clothing decisions', category: 'Independence building' },
      { id: 'make-bed', name: 'Make My Bed', icon: '🛏️', description: 'Take care of space', category: 'Independence building' },
      { id: 'prepare-snack', name: 'Prepare My Own Snack', icon: '🥪', description: 'Simple food preparation', category: 'Life skills' },
      { id: 'organise-space', name: 'Organise My Space', icon: '📦', description: 'Keep things tidy', category: 'Independence building' },
      { id: 'check-calendar', name: 'Check What\'s Next', icon: '📅', description: 'Look ahead', category: 'Planning skills' },
      { id: 'help-family', name: 'Help Family Member', icon: '🤝', description: 'Contribute to household', category: 'Family cooperation' }
    ],
    'sensory-breaks': [
      { id: 'jumping-jacks', name: 'Jumping Jacks', icon: '🏃', description: '10 quick jumps', category: 'Movement break' },
      { id: 'wall-pushes', name: 'Push Against Wall', icon: '🧱', description: 'Proprioceptive input', category: 'Sensory regulation' },
      { id: 'fidget-toy', name: 'Fidget Toy Time', icon: '🎯', description: 'Sensory tool use', category: 'Sensory regulation' },
      { id: 'heavy-work', name: 'Heavy Work Activity', icon: '💪', description: 'Carry something heavy', category: 'Sensory regulation' },
      { id: 'quiet-corner', name: 'Quiet Corner Time', icon: '🤫', description: 'Reduce stimulation', category: 'Sensory regulation' },
      { id: 'texture-play', name: 'Texture Exploration', icon: '🤲', description: 'Safe sensory experience', category: 'Sensory regulation' }
    ]
  };

  const categoryTitles = {
    'morning-essentials': '🌅 Morning Essentials (No More Morning Battles!)',
    'leaving-house': '🚗 Leaving House (End The Door Wars!)',
    'learning-time': '📚 Home Education Learning (Structured Learning)',
    'trips-outings': '🎒 Educational Trips & Outings',
    'afternoon-recharge': '🏠 After School/Activity Recharge',
    'bedtime-success': '😴 Bedtime Success (Peaceful Evenings)',
    'emotional-regulation': '💙 Emotional Regulation & Calm-Down',
    'independence-builders': '⭐ Independence Builders',
    'sensory-breaks': '🤸 Sensory Breaks & Movement'
  };

  const addActivity = (activity) => {
    if (!selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, { 
        ...activity, 
        time: '', 
        duration: '30 mins',
        hasBreakAfter: false,
        transitionWarning: '5 mins'
      }]);
    }
  };

  const addCustomActivity = () => {
    if (customActivity.trim()) {
      const newActivity = {
        id: 'custom-' + Date.now(),
        name: customActivity.trim(),
        icon: '⭐',
        description: 'Custom activity for your child',
        category: 'Personalised',
        time: '',
        duration: '30 mins',
        hasBreakAfter: false,
        transitionWarning: '5 mins'
      };
      setSelectedActivities([...selectedActivities, newActivity]);
      setCustomActivity('');
    }
  };

  const removeActivity = (id) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== id));
  };

  const updateActivity = (id, field, value) => {
    setSelectedActivities(selectedActivities.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const generateSchedule = () => {
    if (selectedActivities.length === 0) {
      alert('Please add at least one activity to your schedule first!');
      return;
    }
    setShowPreview(true);
  };

  const downloadSchedule = () => {
    alert(`🎉 Your RISE Planner schedule "${childName ? `${childName}'s` : 'My'} ${scheduleType} routine" is being generated!\n\nIn a real implementation, this would create a beautiful, professional PDF tailored exactly to your child's needs - something that actually works, unlike those generic templates that never quite fit.`);
  };

  const SchedulePreview = () => {
    const themeColors = {
      calming: 'from-blue-50 to-purple-50 border-blue-200',
      energising: 'from-orange-50 to-yellow-50 border-orange-200',
      neutral: 'from-gray-50 to-slate-50 border-gray-200'
    };

    return (
      <div ref={previewRef} className="bg-white p-8 rounded-lg border-2 border-purple-200 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-yellow-500 mr-2" />
            <h2 className="text-3xl font-bold text-purple-600">
              {childName ? `${childName}'s` : 'My'} RISE Planner
            </h2>
            <Star className="h-8 w-8 text-yellow-500 ml-2" />
          </div>
          <p className="text-lg text-gray-600 mb-2">
            {scheduleType === 'daily' ? 'Daily Routine' : 'Weekly Plan'} • {selectedActivities.length} activities
          </p>
          <p className="text-sm text-purple-600 font-medium">
            Routine • Independence • Support • Empowerment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedActivities.map((activity, index) => (
            <div key={activity.id}>
              <div className={`bg-gradient-to-br ${themeColors[scheduleTheme]} p-6 rounded-lg text-center border shadow-sm hover:shadow-md transition-shadow`}>
                <div className="text-4xl mb-3">{activity.icon}</div>
                <div className="font-bold text-purple-700 text-lg mb-2">{activity.name}</div>
                {activity.time && (
                  <div className="text-sm text-blue-600 font-medium mb-1 flex items-center justify-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </div>
                )}
                <div className="text-xs text-gray-600 mb-3">{activity.duration}</div>
                {activity.category && (
                  <div className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full mb-3">
                    {activity.category}
                  </div>
                )}
                
                {transitionWarnings && activity.transitionWarning && index < selectedActivities.length - 1 && (
                  <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mb-2">
                    ⏰ {activity.transitionWarning} warning
                  </div>
                )}

                <div className="w-8 h-8 bg-white border-3 border-purple-300 rounded-lg mx-auto flex items-center justify-center shadow-sm">
                  <CheckCircle className="h-5 w-5 text-purple-400" />
                </div>
              </div>

              {includeBreaks && activity.hasBreakAfter && index < selectedActivities.length - 1 && (
                <div className="my-4 text-center">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mx-4">
                    <div className="text-2xl mb-1">🤫</div>
                    <div className="text-sm font-medium text-green-700">Calm Break</div>
                    <div className="text-xs text-green-600">2-5 minutes to reset</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
          <h3 className="text-lg font-bold text-purple-700 mb-3 flex items-center">
            <Heart className="h-5 w-5 mr-2" />
            Family Success Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Let your child tick off completed activities</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Place schedule where your child can easily see it</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Praise effort, not just completion</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span>Be flexible - adjust as needed</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={downloadSchedule}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-blue-700 transition-all flex items-center mx-auto shadow-lg"
          >
            <Download className="h-6 w-6 mr-3" />
            Download Your RISE Planner
          </button>
          <p className="text-sm text-gray-600 mt-3">
            High-quality PDF designed specifically for your child • Print on A4 • Laminate for reuse
          </p>
          <p className="text-xs text-purple-600 mt-2">
            Finally, a visual schedule that actually fits YOUR child's needs! 💜
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-full mr-4">
              <Zap className="h-10 w-10" />
            </div>
            <h1 className="text-5xl font-bold">RISE Planner</h1>
          </div>
          <p className="text-xl text-purple-100 mb-4">
            <span className="font-semibold">Routine • Independence • Support • Empowerment</span>
          </p>
          <p className="text-lg text-blue-100 max-w-4xl mx-auto">
            Create personalised visual schedules for families who benefit from structured routines. Perfect for home educators 
            using structured approaches, school families, and children with SEN who thrive with predictable visual support.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {!showPreview ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            {/* Enhanced Settings Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Settings className="h-6 w-6 mr-2 text-purple-600" />
                  Your RISE Planner
                </h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Child's Name (optional)
                    </label>
                    <input
                      type="text"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Enter your child's name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Schedule Type
                    </label>
                    <select
                      value={scheduleType}
                      onChange={(e) => setScheduleType(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="daily">Full Daily Routine</option>
                      <option value="morning">Morning Only</option>
                      <option value="learning">Home Education Learning Day</option>
                      <option value="trip">Educational Trip/Outing</option>
                      <option value="afterschool">After School/Activities</option>
                      <option value="bedtime">Bedtime Only</option>
                      <option value="weekend">Weekend/Flexible Day</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visual Theme
                    </label>
                    <select
                      value={scheduleTheme}
                      onChange={(e) => setScheduleTheme(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="calming">Calming Blues & Purples</option>
                      <option value="energising">Energising Oranges & Yellows</option>
                      <option value="neutral">Neutral Greys</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeBreaks"
                        checked={includeBreaks}
                        onChange={(e) => setIncludeBreaks(e.target.checked)}
                        className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      />
                      <label htmlFor="includeBreaks" className="ml-2 text-sm text-gray-700">
                        Include calm breaks between activities
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="transitionWarnings"
                        checked={transitionWarnings}
                        onChange={(e) => setTransitionWarnings(e.target.checked)}
                        className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                      />
                      <label htmlFor="transitionWarnings" className="ml-2 text-sm text-gray-700">
                        Add transition warnings
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Custom Activity
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customActivity}
                      onChange={(e) => setCustomActivity(e.target.value)}
                      placeholder="e.g., Take medicine, Call grandma"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addCustomActivity()}
                    />
                    <button
                      onClick={addCustomActivity}
                      className="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    Selected: {selectedActivities.length} activities
                  </h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Choose from our expertly-curated activities designed for structured home educators, school families, 
                    and everyone supporting children with SEN.
                  </p>
                  
                  {selectedActivities.length > 0 && (
                    <button
                      onClick={generateSchedule}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center"
                    >
                      <FileText className="h-5 w-5 mr-2" />
                      Preview Your RISE Planner
                    </button>
                  )}
                </div>

                {selectedActivities.length === 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center text-yellow-800 text-sm">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Start by choosing activities from the categories →
                    </div>
                  </div>
                )}

                {/* Selected Activities Summary */}
                {selectedActivities.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Selected Activities:</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedActivities.map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                          <div className="flex items-center">
                            <span className="mr-2">{activity.icon}</span>
                            <span className="truncate">{activity.name}</span>
                          </div>
                          <button
                            onClick={() => removeActivity(activity.id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Activity Selection */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {Object.entries(activityLibrary).map(([category, activities]) => (
                  <div key={category} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mr-3"></div>
                      {categoryTitles[category]}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {activities.map((activity) => {
                        const isSelected = selectedActivities.find(a => a.id === activity.id);
                        return (
                          <div
                            key={activity.id}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                              isSelected 
                                ? 'border-purple-500 bg-purple-50 shadow-md' 
                                : 'border-gray-200 bg-white hover:border-purple-300'
                            }`}
                            onClick={() => !isSelected && addActivity(activity)}
                          >
                            <div className="text-center">
                              <div className="text-3xl mb-2">{activity.icon}</div>
                              <div className={`font-semibold mb-1 ${isSelected ? 'text-purple-700' : 'text-gray-900'}`}>
                                {activity.name}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">{activity.description}</div>
                              {activity.category && (
                                <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                  {activity.category}
                                </div>
                              )}
                              {isSelected && (
                                <div className="mt-3 flex items-center justify-center text-purple-600">
                                  <CheckCircle className="h-5 w-5 mr-1" />
                                  <span className="text-sm font-medium">Added!</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Back to Edit
              </button>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Your RISE Planner Preview</h2>
                <p className="text-gray-600">Review your schedule before downloading</p>
              </div>
              <div className="w-32"></div>
            </div>
            <SchedulePreview />
          </div>
        )}
      </div>
    </div>
  );
};

export default RISEPlanner;
