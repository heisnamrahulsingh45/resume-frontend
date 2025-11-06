import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [backendMessage, setBackendMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBackendMessage = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://resume-backend-production-12d4.up.railway.app/')
        const data = await response.text()
        setBackendMessage(data)
      } catch (error) {
        console.error('Error fetching backend message:', error)
        setBackendMessage('Error fetching message from backend')
      } finally {
        setLoading(false)
      }
    }

    fetchBackendMessage()
  }, [])

  return (
    <div className="app">
      <h1>Hello from frontend</h1>
      <div className="backend-message">
        {loading ? (
          <p>Loading…</p>
        ) : (
          <p>{backendMessage}</p>
        )}
      </div>
    </div>
  )
}

export default App

