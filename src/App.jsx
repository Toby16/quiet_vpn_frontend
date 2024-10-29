import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ServersPage from './pages/ServersPage'
import TutorialsPage from './pages/TutorialsPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<SignUpPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/servers' element={<ServersPage />} />
          <Route path='/tutorials' element={<TutorialsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
