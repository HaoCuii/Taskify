import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  ShareIcon, 
  ClockIcon, 
  UsersIcon 
} from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-7xl font-bold text-gray-800 mb-6">
            Taskify
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Streamline your team's workflow with easy room creation and seamless task management.
        </p>
        
        {/* Main Action Buttons */}
        <div className="flex justify-center space-x-6 mb-16">
          <Link 
            to="/join" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Join Room
          </Link>
          <Link 
            to="/create" 
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300"
          >
            Create Room
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <CheckCircleIcon className="mx-auto mb-4 text-blue-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>
            <p className="text-gray-600">Effortlessly manage and track project progress</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <ShareIcon className="mx-auto mb-4 text-green-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p className="text-gray-600">Real-time sharing and updates</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <ClockIcon className="mx-auto mb-4 text-purple-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Time Management</h3>
            <p className="text-gray-600">Optimize productivity with smart scheduling</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <UsersIcon className="mx-auto mb-4 text-orange-600" size={48} />
            <h3 className="text-xl font-semibold mb-2">Team Coordination</h3>
            <p className="text-gray-600">Seamless communication and task allocation</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;