import React from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'lucide-react'

const ActionButton = ({ to, primary, children }) => (
  <Link 
    to={to}
    className={`
      flex items-center gap-2 px-4 py-4 rounded-xl font-medium shadow-sm
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

const NavBar = () => {
  return (
    <nav className="container mx-auto px-6 py-2 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <img src='/assets/WorkFlow.png' alt="WorkFlow" className='h-8 w-auto' />
          <a href="/home">
            <span className="text-xl font-bold text-gray-900">WorkFlow</span>
          </a>
        </div>
        <div className="flex gap-2">
          <ActionButton to="/join" primary={false}>Join Room</ActionButton>
          <ActionButton to="/create" primary={false}>Create Room</ActionButton>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
