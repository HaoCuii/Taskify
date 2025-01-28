import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './pages/App.tsx'
import NavBar from './components/NavBar.tsx'
import Create from './pages/Create.tsx'
import Home from './pages/Home.tsx'
import Join from './pages/Join.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/join" element={<Join />} />
        <Route path="/room/:roomId" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)
