import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/home">
            <div className="text-white text-xl font-bold">Taskify</div>
        </a>
        <div className="space-x-4">
          <Link 
            to="/home" 
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            Home
          </Link>
          <Link 
            to="/join" 
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            Join Room
          </Link>
          <Link 
            to="/create" 
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            Create Room
          </Link>

          <Link 
            to="/room" 
            className="text-white hover:bg-gray-700 px-3 py-2 rounded-md"
          >
            Room
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default NavBar