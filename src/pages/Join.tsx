import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react'

const Join = () => {
  const [roomId, setRoomId] = useState('')
  const navigate = useNavigate()

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (roomId.trim()) {
      navigate(`/room/${roomId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto">
            <Users size={24} className="text-blue-600" />
          </div>
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Join Collaboration Room</h1>
            <p className="text-gray-500">Enter a room ID to join your team</p>
          </div>

          <form onSubmit={handleJoin} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="roomId" className="text-sm font-medium text-gray-700">
                Room ID
              </label>
              <input
                id="roomId"
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter 6-digit room code"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!roomId.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Join Room
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Need to create a new room?{' '}
              <button 
                onClick={() => navigate('/create')} 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create Room
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join