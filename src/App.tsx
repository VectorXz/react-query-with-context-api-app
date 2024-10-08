import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from './context/UserContext'
import UserPage from './pages/UserPage'
import PersonalInfoForm from './pages/PersonalInfoForm'
import AddressForm from './pages/AddressForm'
import BusinessInfoForm from './pages/BusinessInfoForm'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md p-4">
              <ul className="flex space-x-4">
                <li><Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link></li>
                <li><Link to="/personal" className="text-blue-600 hover:text-blue-800">Personal Info</Link></li>
                <li><Link to="/address" className="text-blue-600 hover:text-blue-800">Address</Link></li>
                <li><Link to="/business" className="text-blue-600 hover:text-blue-800">Business Info</Link></li>
              </ul>
            </nav>
            <div className="container mx-auto p-4">
              <Routes>
                <Route path="/" element={<UserPage />} />
                <Route path="/personal" element={<PersonalInfoForm />} />
                <Route path="/address" element={<AddressForm />} />
                <Route path="/business" element={<BusinessInfoForm />} />
              </Routes>
            </div>
          </div>
        </Router>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App