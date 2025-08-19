import React, { useState, useEffect, useRef } from 'react';
import { Shuffle, Heart, Users, Lightbulb, Settings, Plus, X, CheckCircle, ArrowRight, Star, RotateCcw, Zap } from 'lucide-react';

const PDAChoiceToolkit = () => {
  const [activeTab, setActiveTab] = useState('choice-generator');
  const [choiceType, setChoiceType] = useState('');
  const [customSituation, setCustomSituation] = useState('');
  const [generatedChoices, setGeneratedChoices] = useState([]);
  const [choicesUsed, setChoicesUsed] = useState(0);
  const [dailyChoices, setDailyChoices] = useState([]);
  const [emergencyLevel, setEmergencyLevel] = useState(1);

  // Pre-made choice templates for common PDA situations
  const choiceTemplates = {
    'getting-ready': {
      name: 'Getting Ready',
      icon: '🌅',
      choices: [
        'Would you like to get dressed first or brush teeth first?',
        'Do you want to get ready upstairs or downstairs?',
        'Would you prefer to pick your clothes or have me pick them?',
        'Should we get ready with music on or in quiet?'
      ]
    },
    'meals': {
      name: 'Meals & Eating',
      icon: '🍽️',
      choices: [
        'Would you like to eat at the table or somewhere comfy?',
        'Do you want to help choose what we eat or would you like me to decide?',
        'Should we eat together or would you prefer to eat alone?',
        'Would you like to use a fork or spoon (or fingers)?'
      ]
    },
    'transitions': {
      name: 'Leaving/Transitions',
      icon: '🚪',
      choices: [
        'Do you want to leave in 5 minutes or 10 minutes?',
        'Would you like to walk to the car or skip to the car?',
        'Should we take the quick way or the scenic route?',
        'Do you want to carry something special or go hands-free?'
      ]
    },
    'homework': {
      name: 'Learning/Homework',
      icon: '📚',
      choices: [
        'Would you like to do this work here or somewhere else?',
        'Do you want to start with the easy part or the interesting part?',
        'Should we work for 10 minutes or 15 minutes?',
        'Would you like me to sit nearby or give you space?'
      ]
    },
    'bedtime': {
      name: 'Bedtime',
      icon: '🌙',
      choices: [
        'Do you want to get ready for bed upstairs or downstairs?',
        'Would you like to brush teeth first or put on pyjamas first?',
        'Should we read one story or two stories?',
        'Do you want the door open a little or closed?'
      ]
    },
    'chores': {
      name: 'Helping Out',
      icon: '🏠',
      choices: [
        'Would you like to help with this or do something else helpful?',
        'Do you want to do this now or in a few minutes?',
        'Should we do this together or would you prefer to do it your way?',
        'Would you like to choose how we do this?'
      ]
    }
  };

  // Emergency de-escalation phrases based on intensity
  const emergencyPhrases = {
    1: [
      "I can see you're not feeling up for this right now.",
      "What would feel better for you?",
      "No pressure - what are you thinking?"
    ],
    2: [
      "This doesn't have to happen right now.",
      "I wonder what would help you feel more comfortable?",
      "You're in charge of how we handle this."
    ],
    3: [
      "Let's pause everything for a moment.",
      "You don't have to do anything you don't want to do.",
      "I'm here when you're ready - no rush."
    ],
    4: [
      "All expectations are off the table right now.",
      "Your feelings are completely valid.",
      "We can figure this out together when you're ready."
    ],
    5: [
      "Nothing is urgent. You are safe.",
      "I hear you. This is really hard.",
      "We don't need to solve anything right now."
    ]
  };

  const generateChoices = () => {
    if (!choiceType && !customSituation) return;

    let choices = [];
    
    if (choiceType && choiceTemplates[choiceType]) {
      choices = choiceTemplates[choiceType].choices;
    } else if (customSituation) {
      // Generate PDA-friendly choices for custom situation
      choices = [
        `Would you like to ${customSituation.toLowerCase()} now or in a few minutes?`,
        `Do you want to ${customSituation.toLowerCase()} your way or should we do it together?`,
        `Should we ${customSituation.toLowerCase()} here or somewhere else?`,
        `Would you prefer to ${customSituation.toLowerCase()} quickly or take your time?`
      ];
    }

    // Randomly select 2-3 choices
    const shuffled = choices.sort(() => 0.5 - Math.random());
    setGeneratedChoices(shuffled.slice(0, Math.min(3, shuffled.length)));
    setChoicesUsed(prev => prev + 1);
  };

  const addDailyChoice = (choice) => {
    setDailyChoices([...dailyChoices, {
      id: Date.now(),
      text: choice,
      time: new Date().toLocaleTimeString(),
      used: false
    }]);
  };

  const toggleChoiceUsed = (id) => {
    setDailyChoices(dailyChoices.map(choice => 
      choice.id === id ? { ...choice, used: !choice.used } : choice
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-full mr-4">
              <Heart className="h-10 w-10" />
            </div>
            <h1 className="text-5xl font-bold">PDA Choice Toolkit</h1>
          </div>
          <p className="text-xl text-green-100 mb-4">
            <span className="font-semibold">Pathological Demand Avoidance • Autonomy • Collaboration • Choice</span>
          </p>
          <p className="text-lg text-blue-100 max-w-4xl mx-auto">
            Transform demands into choices. Work WITH your PDA child's need for autonomy, not against it. 
            Every tool here respects their autonomy while supporting daily life.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8 mt-8">
          <div className="flex flex-wrap gap-2">
            {['choice-generator', 'daily-planner', 'emergency-help', 'understanding'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab === 'choice-generator' && <Shuffle className="h-5 w-5 mr-2 inline" />}
                {tab === 'daily-planner' && <CheckCircle className="h-5 w-5 mr-2 inline" />}
                {tab === 'emergency-help' && <Zap className="h-5 w-5 mr-2 inline" />}
                {tab === 'understanding' && <Lightbulb className="h-5 w-5 mr-2 inline" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Choice Generator Tab */}
        {activeTab === 'choice-generator' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Shuffle className="h-6 w-6 mr-2 text-green-500" />
                Turn Any Demand Into Choices
              </h3>
              <p className="text-gray-600 mb-6">
                Select a common situation or describe your own. We'll create PDA-friendly choices that give your child autonomy.
              </p>

              {/* Pre-made Situations */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Quick Situation Templates:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(choiceTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setChoiceType(key);
                        setCustomSituation('');
                      }}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        choiceType === key 
                          ? 'bg-green-100 border-green-300 text-green-800' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="text-2xl mb-1">{template.icon}</div>
                      <div className="font-medium text-sm">{template.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Situation */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Or Describe Your Situation:</h4>
                <input
                  type="text"
                  value={customSituation}
                  onChange={(e) => {
                    setCustomSituation(e.target.value);
                    setChoiceType('');
                  }}
                  placeholder="e.g. 'put on shoes', 'tidy up toys', 'come for dinner'"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Generate Button */}
              <div className="text-center mb-6">
                <button
                  onClick={generateChoices}
                  disabled={!choiceType && !customSituation}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Shuffle className="h-5 w-5 mr-2 inline" />
                  Generate PDA-Friendly Choices
                </button>
              </div>

              {/* Generated Choices */}
              {generatedChoices.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                  <h4 className="font-bold text-green-800 mb-4 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Your PDA-Friendly Choices:
                  </h4>
                  <div className="space-y-3">
                    {generatedChoices.map((choice, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-green-200 flex items-center justify-between">
                        <p className="text-gray-800">{choice}</p>
                        <button
                          onClick={() => addDailyChoice(choice)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                        >
                          Save for Later
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      onClick={generateChoices}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <RotateCcw className="h-4 w-4 mr-1 inline" />
                      Generate Different Choices
                    </button>
                  </div>
                </div>
              )}

              {/* Usage Stats */}
              <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{choicesUsed}</div>
                  <div className="text-sm text-purple-700">Choices Generated Today</div>
                  <div className="text-xs text-purple-600 mt-1">
                    Keep offering choices - you're building autonomy! 🎯
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Daily Planner Tab */}
        {activeTab === 'daily-planner' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-blue-500" />
                Your Daily Choice Collection
              </h3>
              <p className="text-gray-600 mb-6">
                Choices you've saved and created. Use these when you need PDA-friendly options quickly!
              </p>

              {dailyChoices.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🤝</div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-2">No Saved Choices Yet</h4>
                  <p className="text-gray-600 mb-4">Generate some choices first, then save them here for quick access!</p>
                  <button
                    onClick={() => setActiveTab('choice-generator')}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Generate Your First Choices
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {dailyChoices.map((choice) => (
                    <div
                      key={choice.id}
                      className={`p-4 rounded-lg border transition-all ${
                        choice.used ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className={`${choice.used ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {choice.text}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Saved at {choice.time}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleChoiceUsed(choice.id)}
                            className={`p-2 rounded ${
                              choice.used ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                            }`}
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => setDailyChoices(dailyChoices.filter(c => c.id !== choice.id))}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 PDA Daily Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">🌅 Start Small</h4>
                  <p className="text-sm text-green-600">
                    Begin with tiny choices. "Do you want to sit here or here?" builds choice-making confidence.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">⏰ No Rush</h4>
                  <p className="text-sm text-blue-600">
                    PDA kids need time to process choices. Count to 10 (or 20) before offering help.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">🎭 Make it Fun</h4>
                  <p className="text-sm text-purple-600">
                    "Should we walk like robots or hop like bunnies?" turns demands into play.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-700 mb-2">🤝 Collaborate</h4>
                  <p className="text-sm text-orange-600">
                    "What would work better for you?" shows you value their expertise about themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Help Tab */}
        {activeTab === 'emergency-help' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="h-6 w-6 mr-2 text-red-500" />
                PDA Meltdown De-escalation
              </h3>
              <p className="text-gray-600 mb-6">
                When your PDA child is overwhelmed by demands, these phrases can help de-escalate the situation.
              </p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">How overwhelmed are they right now?</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setEmergencyLevel(level)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        emergencyLevel === level
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  1 = Slightly resistant • 5 = Full meltdown
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
                <h4 className="font-bold text-red-800 mb-4">
                  De-escalation Phrases for Level {emergencyLevel}:
                </h4>
                <div className="space-y-3">
                  {emergencyPhrases[emergencyLevel].map((phrase, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border border-red-200">
                      <p className="text-gray-800 text-lg">"{phrase}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🧘 Remember for Yourself:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Stay calm - your energy affects theirs</li>
                  <li>• Drop all demands immediately</li>
                  <li>• PDA meltdowns aren't defiance - they're overwhelm</li>
                  <li>• Connection before correction always</li>
                  <li>• You're both doing your best</li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🚨 Emergency Scripts</h3>
              <div className="space-y-4">
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <h4 className="font-medium text-orange-800 mb-2">When They're Saying "NO!" to Everything:</h4>
                  <p className="text-sm text-orange-700">
                    "I hear you saying no. That tells me something doesn't feel right. What would feel better?"
                  </p>
                </div>
                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-medium text-purple-800 mb-2">When Time is Running Out:</h4>
                  <p className="text-sm text-purple-700">
                    "I know this feels urgent, but you're more important than any deadline. How can we make this work for you?"
                  </p>
                </div>
                <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                  <h4 className="font-medium text-green-800 mb-2">When They're Overwhelmed:</h4>
                  <p className="text-sm text-green-700">
                    "This feels really big right now. Let's take all the pressure off and just breathe together."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Understanding Tab */}
        {activeTab === 'understanding' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-yellow-500" />
                Understanding PDA (Pathological Demand Avoidance)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">What PDA Looks Like:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Extreme avoidance of everyday demands</li>
                    <li>• "Can't" rather than "won't" - it's neurological</li>
                    <li>• May seem capable but struggles with expectations</li>
                    <li>• Often socially motivated and imaginative</li>
                    <li>• Comfortable with their own demands/interests</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">What Helps PDA:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Choices instead of demands</li>
                    <li>• Collaborative approaches</li>
                    <li>• Reducing overall demand load</li>
                    <li>• Trusting their autonomy</li>
                    <li>• Indirect communication</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">🎯 Key PDA Principle:</h4>
                <p className="text-yellow-700">
                  Traditional autism strategies often backfire with PDA. Instead of teaching compliance, 
                  we support autonomy. Instead of demands, we offer collaboration.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔄 Reframing Demands as Choices</h3>
              <div className="space-y-4">
                {[
                  { demand: '"Time to brush your teeth!"', choice: '"I wonder if your teeth are feeling ready for a brush?"' },
                  { demand: '"Put your shoes on now!"', choice: '"What do you think about getting your feet ready to go out?"' },
                  { demand: '"You need to tidy up!"', choice: '"I\'m wondering what would help this room feel more organized?"' },
                  { demand: '"Come and eat dinner!"', choice: '"The food is ready whenever you are!"' },
                  { demand: '"Stop doing that!"', choice: '"I\'m noticing that might not be working. What would work better?"' }
                ].map((example, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <h5 className="font-medium text-red-800 text-sm mb-1">❌ Demand (often triggers PDA):</h5>
                      <p className="text-red-700 text-sm">{example.demand}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h5 className="font-medium text-green-800 text-sm mb-1">✅ Choice-based (PDA-friendly):</h5>
                      <p className="text-green-700 text-sm">{example.choice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-lg font-bold text-gray-900 mb-4">❤️ Remember: You're Both Learning</h3>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-purple-700 mb-3">
                  PDA parenting is different from everything you've been told about parenting. 
                  It's normal to feel confused or like you're "giving in."
                </p>
                <p className="text-purple-700">
                  You're not giving in - you're giving your child what their nervous system needs to feel safe. 
                  When they feel safe and autonomous, cooperation naturally follows.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-pink-500" />
            How This Toolkit Supports Your PDA Child
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Autonomy First</h4>
              <p className="text-sm text-gray-600">Respects your child's need for control and choice</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Shuffle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Reduces Demands</h4>
              <p className="text-sm text-gray-600">Turns overwhelming demands into manageable choices</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Builds Trust</h4>
              <p className="text-sm text-gray-600">Shows you understand their nervous system needs</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Family Peace</h4>
              <p className="text-sm text-gray-600">Less conflict, more cooperation and connection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDAChoiceToolkit;
