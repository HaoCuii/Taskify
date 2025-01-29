import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Loader2, ArrowLeft } from 'lucide-react'

const API_URL = 'https://workflow-tasks.vercel.app/'

const Create = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateRoom = async () => {
    try {
      console.log({API_URL})
      setIsLoading(true)
      setError('')
      const response = await fetch(`${API_URL}/create`, {
        method: 'POST',
      })
      if (!response.ok) throw new Error('Failed to create room')
      const data = await response.json()
      navigate(`/room/${data.roomId}`)
    } catch (err) {
      setError('Failed to create room. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto">
            <Plus size={24} className="text-blue-600" />
          </div>
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Create New Room</h1>
            <p className="text-gray-500">Start collaborating with your team instantly</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={handleCreateRoom}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating Room...
                </>
              ) : (
                <>
                  Create New Room
                  <Plus size={18} />
                </>
              )}
            </button>
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/join')}
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft size={16} />
              Back to Join Room
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Your room will be created with a unique 6-digit code</p>
          <p>Share this code with your team members to collaborate</p>
        </div>
      </div>
    </div>
  )
}

export default Create
