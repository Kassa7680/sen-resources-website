import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Search, Filter, Download, Star, Heart, User, Bell, Settings, Menu, X, Eye, Edit3, Crown, BookOpen, Clock, TrendingUp, Grid, List, Play, CheckCircle, ArrowRight, Shield, Zap, Users } from 'lucide-react';
import RISEPlanner from './RISEPlanner.js';
import ADHDFocusToolkit from './ADHDFocusToolkit.jsx';
import PDAChoiceToolkit from './PDAChoiceToolkit';
// Mock Authentication Context
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in production, this would call your API
    const mockUser = {
      id: 1,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      plan: 'Premium',
      avatar: email.charAt(0).toUpperCase(),
      joinDate: 'March 2024',
      downloadsThisMonth: 47,
      totalDownloads: 284
    };
    setUser(mockUser);
    // localStorage.setItem('sen_user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const logout = () => {
    setUser(null);
    // localStorage.removeItem('sen_user');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const features = [
    {
      icon: <Download className="h-8 w-8 text-purple-600" />,
      title: "Instant Downloads",
      description: "Get professional SEN resources instantly. No waiting, no complexity."
    },
    {
      icon: <Star className="h-8 w-8 text-purple-600" />,
      title: "Expert Created",
      description: "All resources designed by qualified SEN specialists and home education experts."
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "For All Families",
      description: "Perfect for both home educators and school families. Adapt to any setting."
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Always Updated",
      description: "New resources added weekly. Your subscription grows with your needs."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Wilson",
      role: "Home Educator, Mother of 2",
      content: "These visual schedules transformed our morning routine. My ASD daughter finally knows what to expect each day.",
      avatar: "SW"
    },
    {
      name: "Mike Johnson",
      role: "Parent, ADHD Support",
      content: "The focus tracking toolkit helped us understand our son's patterns. We've seen real improvement in his attention.",
      avatar: "MJ"
    },
    {
      name: "Emma Davis",
      role: "Home School Teacher",
      content: "Professional quality resources that save me hours each week. The editable versions are game-changers.",
      avatar: "ED"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">SEN Resources</h1>
              <span className="ml-2 text-sm text-gray-500">Premium Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Professional SEN Resources for Every Family
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Downloadable visual schedules, behavior supports, and learning tools designed specifically for children with special educational needs. Perfect for home educators and school families.
          </p>
         <div className="flex justify-center space-x-4">
  <button
    onClick={() => navigate('/rise-planner')}
    className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
  >
    Try RISE Planner Free
  </button>
      <button
    onClick={() => navigate('/adhd-toolkit')}
    className="bg-yellow-400 text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors"
  >
    🧠 Try ADHD Toolkit Free
  </button>
  <button
    onClick={() => navigate('/signup')}
    className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
  >
    Start 7-Day Free Trial
  </button>
<button
  onClick={() => navigate('/pda-toolkit')}
  className="bg-green-400 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-300 transition-colors"
>
  🤝 Try PDA Toolkit Free
</button>
</div>
          <p className="text-purple-200 mt-4">No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need in One Place</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From visual schedules to behavior support tools, we've got resources for every SEN need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">See What's Inside</h2>
            <p className="text-xl text-gray-600">Professional resources ready to download and use today</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => navigate('/rise-planner')}>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 h-48 flex items-center justify-center">
                <span className="text-6xl">🌈</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ASD Visual Schedules</h3>
                <p className="text-gray-600 mb-4">Morning, afternoon, and bedtime routines with customizable activities</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">7 pages • Ages 3-16</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.9</span>
                  </div>
                </div>
              </div>
            </div>
            
        <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => alert('🧠 ADHD Toolkit coming soon! Click OK to see our progress!')}>
              <div className="bg-gradient-to-br from-orange-100 to-red-100 h-48 flex items-center justify-center">
                <span className="text-6xl">🧠</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">ADHD Focus Toolkit</h3>
                <p className="text-gray-600 mb-4">Attention tracking, brain breaks, and focus strategies</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">12 pages • Ages 6-14</span>
                  <div className="flex items-center">
                    <Crown className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-yellow-600">Premium</span>
                  </div>
                </div>
              </div>
            </div>
            
          <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer" onClick={() => alert('✋ Sensory Break Cards coming soon! We are building amazing tools for you!')}>
              <div className="bg-gradient-to-br from-green-100 to-blue-100 h-48 flex items-center justify-center">
                <span className="text-6xl">✋</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Sensory Break Cards</h3>
                <p className="text-gray-600 mb-4">Quick regulation activities for home and classroom</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">8 pages • Ages 3-16</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Thousands of Families</h2>
            <p className="text-xl text-gray-600">See what parents and educators are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that works for your family</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Basic</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">£19<span className="text-lg font-normal text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Access to all PDF resources</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Unlimited downloads</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />New resources weekly</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Email support</li>
              </ul>
              <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Start Free Trial
              </button>
            </div>
            
            <div className="bg-purple-600 text-white rounded-xl shadow-lg p-8 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-yellow-400 text-purple-600 px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Premium</h3>
              <div className="text-4xl font-bold mb-2">£39<span className="text-lg font-normal opacity-80">/month</span></div>
              <p className="opacity-80 mb-6">Everything you need</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />Everything in Basic</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />Editable PowerPoint versions</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />Priority email support</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-400 mr-2" />Custom resource requests</li>
              </ul>
              <button className="w-full bg-white text-purple-600 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold">
                Start Free Trial
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">£99<span className="text-lg font-normal text-gray-600">/month</span></div>
              <p className="text-gray-600 mb-6">For schools and professionals</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Everything in Premium</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Commercial usage rights</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Bulk download access</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" />Priority phone support</li>
              </ul>
              <button className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Child's Learning?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of families who are already using our resources to support their children's success.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Your Free Trial Today
            <ArrowRight className="inline h-5 w-5 ml-2" />
          </button>
          <p className="text-purple-200 mt-4">7-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SEN Resources</h3>
              <p className="text-gray-400">Professional resources for special educational needs families.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SEN Resources. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Login Page Component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-purple-600">SEN Resources</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                  Start your free trial
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Signup Page Component
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    plan: 'basic'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      navigate('/login');
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <h1 className="text-3xl font-bold text-purple-600">SEN Resources</h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Start your free trial
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          No credit card required • Cancel anytime
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="plan" className="block text-sm font-medium text-gray-700">
                Choose your plan
              </label>
              <div className="mt-1">
                <select
                  id="plan"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="basic">Basic - £19/month</option>
                  <option value="premium">Premium - £39/month</option>
                  <option value="professional">Professional - £99/month</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Start free trial'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component (from our previous design)
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [favorites, setFavorites] = useState(new Set([1, 3, 5]));
  const [counter, setCounter] = useState(1);

  // Auto-increment counter every second (just for fun!)
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev >= 100 ? 1 : prev + 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = {
    totalResources: 156,
    newThisWeek: 8,
    mostPopular: "ASD Visual Schedules",
    downloadStreak: 12
  };

  const categories = [
    { id: 'all', name: 'All Resources', icon: '📚', count: 156 },
    { id: 'asd', name: 'Autism (ASD)', icon: '🌈', count: 34 },
    { id: 'adhd', name: 'ADHD', icon: '⚡', count: 28 },
    { id: 'dyslexia', name: 'Dyslexia', icon: '📖', count: 22 },
    { id: 'sensory', name: 'Sensory Support', icon: '✋', count: 18 },
    { id: 'social', name: 'Social Skills', icon: '👥', count: 25 },
    { id: 'behavior', name: 'Behavior Support', icon: '🎯', count: 19 },
    { id: 'transition', name: 'Transitions', icon: '🔄', count: 10 }
  ];

  const resources = [
    {
      id: 1,
      title: "ASD Visual Schedule Templates",
      description: "30+ customizable daily routine schedules with transition cards",
      category: "asd",
      type: "Templates",
      pages: 7,
      downloads: 2847,
      rating: 4.9,
      isPremium: false,
      isNew: false,
      tags: ["routine", "transitions", "visual"],
      ageRange: "3-16",
      thumbnail: "🌈",
      estimatedTime: "15 min setup"
    },
    {
      id: 2,
      title: "ADHD Focus & Attention Toolkit",
      description: "Complete toolkit with brain breaks, tracking sheets, and focus strategies",
      category: "adhd",
      type: "Toolkit",
      pages: 12,
      downloads: 1923,
      rating: 4.8,
      isPremium: true,
      isNew: true,
      tags: ["attention", "focus", "tracking"],
      ageRange: "6-14",
      thumbnail: "⚡",
      estimatedTime: "5 min daily"
    },
    {
      id: 3,
      title: "Social Stories Collection",
      description: "Ready-made social stories for common situations and challenges",
      category: "social",
      type: "Stories",
      pages: 15,
      downloads: 3456,
      rating: 4.9,
      isPremium: false,
      isNew: false,
      tags: ["social", "stories", "communication"],
      ageRange: "4-12",
      thumbnail: "👥",
      estimatedTime: "10 min reading"
    },
    {
      id: 4,
      title: "Sensory Break Activity Cards",
      description: "Quick sensory regulation activities for home and classroom",
      category: "sensory",
      type: "Cards",
      pages: 8,
      downloads: 2156,
      rating: 4.7,
      isPremium: true,
      isNew: true,
      tags: ["sensory", "regulation", "breaks"],
      ageRange: "3-16",
      thumbnail: "✋",
      estimatedTime: "2-5 min activities"
    },
    {
      id: 5,
      title: "Feelings Thermometer & Coping Strategies",
      description: "Visual emotional regulation tools with coping strategy menu",
      category: "behavior",
      type: "Visual Aids",
      pages: 6,
      downloads: 1847,
      rating: 4.8,
      isPremium: false,
      isNew: false,
      tags: ["emotions", "regulation", "coping"],
      ageRange: "5-16",
      thumbnail: "🎯",
      estimatedTime: "Daily check-ins"
    },
    {
      id: 6,
      title: "Transition Planning Workbook",
      description: "Comprehensive guide for post-16 transitions and life skills",
      category: "transition",
      type: "Workbook",
      pages: 24,
      downloads: 876,
      rating: 4.9,
      isPremium: true,
      isNew: true,
      tags: ["transition", "life-skills", "planning"],
      ageRange: "14-19",
      thumbnail: "🔄",
      estimatedTime: "Ongoing project"
    }
  ];

  const recentActivity = [
    { action: "Downloaded", resource: "ASD Visual Schedules", time: "2 hours ago" },
    { action: "Favorited", resource: "ADHD Focus Toolkit", time: "1 day ago" },
    { action: "Downloaded", resource: "Social Stories Collection", time: "3 days ago" },
    { action: "Downloaded", resource: "Sensory Break Cards", time: "1 week ago" }
  ];

  const toggleFavorite = (resourceId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(resourceId)) {
        newFavorites.delete(resourceId);
      } else {
        newFavorites.add(resourceId);
      }
      return newFavorites;
    });
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resourceId) => {
    // Simulate download process
    alert(`Downloading resource ${resourceId}...`);
    // In production, this would trigger the PDF delivery system
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-purple-100 mb-4">Ready to find the perfect resources for your child today?</p>
            <div className="flex space-x-4 text-sm">
              <div className="bg-white/20 px-3 py-1 rounded-full">
                {user?.plan} Member
              </div>
              <div className="bg-white/20 px-3 py-1 rounded-full">
                {stats.downloadStreak} day streak
              </div>
              <div className="bg-yellow-400/20 px-3 py-1 rounded-full">
                Counter: {counter}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{user?.downloadsThisMonth}</div>
            <div className="text-purple-200 text-sm">downloads this month</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalResources}</p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">New This Week</p>
              <p className="text-2xl font-bold text-green-600">{stats.newThisWeek}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Most Popular</p>
              <p className="text-sm font-medium text-gray-900">{stats.mostPopular}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Downloads</p>
              <p className="text-2xl font-bold text-blue-600">{user?.totalDownloads}</p>
            </div>
            <Download className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity & Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.resource}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Your Favorites
          </h3>
          <div className="space-y-3">
            {resources.filter(r => favorites.has(r.id)).slice(0, 4).map(resource => (
              <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{resource.thumbnail}</span>
                  <div>
                    <p className="font-medium text-gray-900">{resource.title}</p>
                    <p className="text-sm text-gray-600">{resource.type}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload(resource.id)}
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources, activities, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.name} ({cat.count})</option>
              ))}
            </select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredResources.length} resources
        </div>
      </div>

      {/* Resources Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {filteredResources.map(resource => (
          <div key={resource.id} className={`bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
            {/* Resource Thumbnail */}
            <div className={`bg-gradient-to-br from-purple-100 to-blue-100 ${viewMode === 'grid' ? 'h-32' : 'w-24 h-24'} flex items-center justify-center`}>
              <span className="text-4xl">{resource.thumbnail}</span>
            </div>
            
            {/* Resource Content */}
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {resource.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
                  )}
                  {resource.isPremium && (
                    <Crown className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <button
                  onClick={() => toggleFavorite(resource.id)}
                  className={`p-1 rounded ${favorites.has(resource.id) ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors`}
                >
                  <Heart className={`h-4 w-4 ${favorites.has(resource.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{resource.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span>{resource.pages} pages</span>
                <span>Ages {resource.ageRange}</span>
                <span>{resource.estimatedTime}</span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>{resource.rating}</span>
                </div>
                <span>{resource.downloads.toLocaleString()} downloads</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDownload(resource.id)}
                  className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center text-sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                {resource.isPremium && user?.plan === 'Premium' && (
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <Edit3 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
            <h1 className="text-xl font-bold text-purple-600">SEN Resources</h1>
            <p className="text-xs text-gray-500">Premium Platform</p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'dashboard' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Grid className="h-5 w-5 mr-3" />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          
          <button
            onClick={() => setActiveTab('browse')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'browse' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="h-5 w-5 mr-3" />
            {sidebarOpen && <span>Browse Resources</span>}
          </button>
          
          <button
            onClick={() => setActiveTab('favorites')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'favorites' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Heart className="h-5 w-5 mr-3" />
            {sidebarOpen && <span>My Favorites</span>}
          </button>
          
          <button
            onClick={() => setActiveTab('downloads')}
            className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'downloads' ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Download className="h-5 w-5 mr-3" />
            {sidebarOpen && <span>My Downloads</span>}
          </button>

          {sidebarOpen && (
            <>
              <hr className="my-4" />
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3">
                Quick Access
              </div>
              {categories.slice(1, 5).map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveTab('browse');
                    setSelectedCategory(category.id);
                  }}
                  className="w-full flex items-center px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <span className="mr-3">{category.icon}</span>
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </>
          )}
        </nav>

        {sidebarOpen && user?.plan !== 'Premium' && (
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg">
            <div className="text-sm font-medium mb-2">Upgrade to Premium</div>
            <div className="text-xs mb-3">Access editable templates and advanced resources.</div>
            <button className="w-full bg-white text-purple-600 py-2 px-3 rounded text-sm font-medium hover:bg-gray-100 transition-colors">
              Upgrade Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderTopBar = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 capitalize">
            {activeTab === 'browse' ? 'Browse Resources' : activeTab}
          </h2>
          <p className="text-sm text-gray-600">
            {activeTab === 'dashboard' && 'Your personalized learning hub'}
            {activeTab === 'browse' && `${filteredResources.length} resources available`}
            {activeTab === 'favorites' && `${favorites.size} saved resources`}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
              <div className="text-xs text-gray-500">{user?.plan} Member</div>
            </div>
            <div className="relative">
              <button className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-medium text-sm">
                {user?.avatar}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                <button
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {renderSidebar()}
      
      <div className="flex-1 flex flex-col">
        {renderTopBar()}
        
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'browse' && renderBrowse()}
          {activeTab === 'favorites' && (
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your Favorite Resources</h3>
              <p className="text-gray-600 mb-6">Resources you've saved for quick access will appear here.</p>
              <button 
                onClick={() => setActiveTab('browse')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse Resources
              </button>
            </div>
          )}
          {activeTab === 'downloads' && (
            <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
              <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Download History</h3>
              <p className="text-gray-600 mb-6">Track all your downloaded resources and access them again.</p>
              <div className="text-sm text-gray-500">
                Total downloads this month: {user?.downloadsThisMonth}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />
  <Route path="/rise-planner" element={<RISEPlanner />} />
    <Route path="/adhd-toolkit" element={<ADHDFocusToolkit />} />
    <Route path="/pda-toolkit" element={<PDAChoiceToolkit />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
