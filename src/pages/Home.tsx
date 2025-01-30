import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Share,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  Layout,
  Zap
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="text-white" size={24} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const ActionButton = ({ to, primary, children }) => (
  <Link 
    to={to}
    className={`
      flex items-center gap-2 px-8 py-4 rounded-xl font-medium shadow-sm
      transition-all duration-300 transform hover:-translate-y-0.5
      ${primary 
        ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:shadow-lg" 
        : "bg-white text-gray-800 hover:bg-gray-50 hover:shadow-lg"
      }
    `}
  >
    {children}
  </Link>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="text-blue-600" size={24} />
          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            Revolutionizing Team Collaboration
          </span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Collaborate With{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> WorkFlow</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Transform your team's workflow with our intuitive task management platform. Create rooms, collaborate in real-time, and achieve more together.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
          <ActionButton to="/create" primary>
            Create Room <ArrowRight size={18} />
          </ActionButton>
          <ActionButton to="/join" primary={false}>
            Join Existing Room <Users size={18} />
          </ActionButton>
        </div>


        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <FeatureCard
            icon={CheckCircle}
            title="Smart Task Tracking"
            description="Track project progress with intuitive kanban boards and real-time updates"
            color="bg-blue-600"
          />
          <FeatureCard
            icon={Share}
            title="Seamless Collaboration"
            description="Share and update tasks in real-time with your entire team"
            color="bg-green-600"
          />
          <FeatureCard
            icon={Clock}
            title="Time Management"
            description="Optimize team productivity with efficient task scheduling"
            color="bg-purple-600"
          />
          <FeatureCard
            icon={Zap}
            title="Instant Updates"
            description="Stay informed with real-time notifications and task changes"
            color="bg-orange-600"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-gray-600 text-sm">
        <p>© 2025 Taskify. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;