import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Join a Room</h1>
      <form onSubmit={handleJoin} className="max-w-md mx-auto">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Join Room
        </button>
      </form>
    </div>
  )
}

export default Join
