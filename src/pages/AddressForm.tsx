import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateUser } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const AddressForm: React.FC = () => {
  const navigate = useNavigate()
  const { user, isLoading, error } = useUser()
  const queryClient = useQueryClient()

  const mutation = useMutation((data: Partial<typeof user>) => updateUser(1, { address: data }), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      navigate('/')
    },
  })

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    postalCode: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        address: user.address.address,
        city: user.address.city,
        state: user.address.state,
        postalCode: user.address.postalCode,
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Address Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="address" className="block mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block mb-1">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="state" className="block mb-1">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="postalCode" className="block mb-1">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Update Address Information
        </button>
      </form>
      {mutation.isError && <p className="mt-4 text-red-600">Error updating address: {mutation.error?.message}</p>}
    </div>
  )
}

export default AddressForm