import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ServersPage from './pages/ServersPage'
import TutorialsPage from './pages/TutorialsPage'
import PurchasesPage from './pages/PurchasesPage'
import { AuthProvider } from './components/AuthProvider'
import ProtectedRoute from './hooks/ProtectedRoute'
import VerifyPaymentPage from './pages/VerifyPayment'
import InternetCheck from './components/InternetCheck'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <InternetCheck />

          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
            />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/servers' element={
              <ProtectedRoute>
                <ServersPage />
              </ProtectedRoute>
            } />
            <Route path='/tutorials' element={
              <ProtectedRoute>
                <TutorialsPage />
              </ProtectedRoute>
            } />
            <Route path='/purchases' element={
              <ProtectedRoute>
                <PurchasesPage />
              </ProtectedRoute>
            } />
            <Route path='/verifypayment' element={
              // <ProtectedRoute>
                <VerifyPaymentPage />
              // </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
