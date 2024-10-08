import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
  }
  company: {
    name: string
    title: string
  }
  // Add other fields as needed
}

export const fetchUser = async (userId: number): Promise<User> => {
  const response = await axios.get(`${API_BASE_URL}/users/${userId}`)
  return response.data
}

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  const response = await axios.put(`${API_BASE_URL}/users/${userId}`, JSON.stringify(userData), {
    headers: { 'Content-Type': 'application/json' },
  })
  return response.data
}