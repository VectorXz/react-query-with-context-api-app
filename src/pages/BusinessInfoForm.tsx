import React, { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { updateUser } from '../api/userApi'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const BusinessInfoForm: React.FC = () => {
  const navigate = useNavigate()
  const { user, isLoading, error } = useUser()
  const queryClient = useQueryClient()

  const mutation = useMutation((data: Partial<typeof user>) => updateUser(1, { company: data }), {
    onSuccess: () => {
      queryClient.invalidateQueries('user')
      navigate('/')
    },
  })

  const [formData, setFormData] = useState({
    name: '',
    title: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.company.name,
        title: user.company.title,
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
      <h1 className="text-2xl font-bold mb-4">Edit Business Information</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="title" className="block mb-1">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button type="submit" className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600">
          Update Business Information
        </button>
      </form>
      {mutation.isError && <p className="mt-4 text-red-600">Error updating business information: {mutation.error?.message}</p>}
    </div>
  )
}

export default BusinessInfoForm