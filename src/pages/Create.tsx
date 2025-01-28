import React from 'react'
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const navigate = useNavigate()

  const handleCreateRoom = async () => {
      const response = await fetch('http://localhost:1337/create', {
        method: 'POST',
      })
      const data = await response.json()
        navigate(`/room/${data.roomId}`)
  }

  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={handleCreateRoom}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Create Room
      </button>
    </div>
    </>

  )
}

export default Create
