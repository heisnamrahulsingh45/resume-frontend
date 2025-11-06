import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [rootMessage, setRootMessage] = useState('')
  const [status, setStatus] = useState(null)
  const [info, setInfo] = useState(null)
  const [stats, setStats] = useState(null)
  const [version, setVersion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true)
        setErrors({})

        // Fetch all endpoints in parallel
        const [rootRes, statusRes, infoRes, statsRes, versionRes] = await Promise.allSettled([
          fetch(`${API_BASE_URL}/`),
          fetch(`${API_BASE_URL}/api/status`),
          fetch(`${API_BASE_URL}/api/info`),
          fetch(`${API_BASE_URL}/api/stats`),
          fetch(`${API_BASE_URL}/api/version`)
        ])

        // Handle root endpoint
        if (rootRes.status === 'fulfilled' && rootRes.value.ok) {
          const data = await rootRes.value.text()
          setRootMessage(data)
        } else {
          setErrors(prev => ({ ...prev, root: 'Failed to fetch root message' }))
        }

        // Handle status endpoint
        if (statusRes.status === 'fulfilled' && statusRes.value.ok) {
          const data = await statusRes.value.json()
          setStatus(data)
        } else {
          setErrors(prev => ({ ...prev, status: 'Failed to fetch status' }))
        }

        // Handle info endpoint
        if (infoRes.status === 'fulfilled' && infoRes.value.ok) {
          const data = await infoRes.value.json()
          setInfo(data)
        } else {
          setErrors(prev => ({ ...prev, info: 'Failed to fetch info' }))
        }

        // Handle stats endpoint
        if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
          const data = await statsRes.value.json()
          setStats(data)
        } else {
          setErrors(prev => ({ ...prev, stats: 'Failed to fetch stats' }))
        }

        // Handle version endpoint
        if (versionRes.status === 'fulfilled' && versionRes.value.ok) {
          const data = await versionRes.value.json()
          setVersion(data)
        } else {
          setErrors(prev => ({ ...prev, version: 'Failed to fetch version' }))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setErrors({ general: 'Error fetching data from backend' })
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  return (
    <div className="app">
      <h1>Hello from frontend</h1>
      
      {loading ? (
        <div className="loading">
          <p>Loading…</p>
        </div>
      ) : (
        <div className="api-results">
          {/* Root endpoint */}
          <div className="api-card">
            <h2>Root Endpoint (/)</h2>
            {errors.root ? (
              <p className="error">{errors.root}</p>
            ) : (
              <p>{rootMessage}</p>
            )}
          </div>

          {/* Status endpoint */}
          <div className="api-card">
            <h2>Status API (/api/status)</h2>
            {errors.status ? (
              <p className="error">{errors.status}</p>
            ) : status ? (
              <pre>{JSON.stringify(status, null, 2)}</pre>
            ) : (
              <p>No data</p>
            )}
          </div>

          {/* Info endpoint */}
          <div className="api-card">
            <h2>Info API (/api/info)</h2>
            {errors.info ? (
              <p className="error">{errors.info}</p>
            ) : info ? (
              <pre>{JSON.stringify(info, null, 2)}</pre>
            ) : (
              <p>No data</p>
            )}
          </div>

          {/* Stats endpoint */}
          <div className="api-card">
            <h2>Stats API (/api/stats)</h2>
            {errors.stats ? (
              <p className="error">{errors.stats}</p>
            ) : stats ? (
              <pre>{JSON.stringify(stats, null, 2)}</pre>
            ) : (
              <p>No data</p>
            )}
          </div>

          {/* Version endpoint */}
          <div className="api-card">
            <h2>Version API (/api/version)</h2>
            {errors.version ? (
              <p className="error">{errors.version}</p>
            ) : version ? (
              <pre>{JSON.stringify(version, null, 2)}</pre>
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

