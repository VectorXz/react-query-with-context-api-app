import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const UserPage: React.FC = () => {
  const { user, isLoading, error } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>
  if (!user) return <div>No user data found</div>

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Information</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="w-32 h-32 rounded-full mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-center mb-4">{user.firstName} {user.lastName}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Birth Date:</strong> {user.birthDate}</p>
          </div>
          <div>
            <p><strong>Address:</strong> {user.address.address}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <p><strong>State:</strong> {user.address.state}</p>
            <p><strong>Postal Code:</strong> {user.address.postalCode}</p>
          </div>
        </div>
        <div className="mt-4">
          <p><strong>Company:</strong> {user.company.name}</p>
          <p><strong>Position:</strong> {user.company.title}</p>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Link to="/personal" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Edit Personal Info</Link>
          <Link to="/address" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">Edit Address</Link>
          <Link to="/business" className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">Edit Business Info</Link>
        </div>
      </div>
    </div>
  )
}

export default UserPage