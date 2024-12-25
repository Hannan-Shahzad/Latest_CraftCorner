'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const success = await register(name, email, password, role)
      if (success) {
        router.push(role === 'seller' ? '/seller-dashboard' : '/')
      } else {
        setError('Registration failed. Email may already be in use.')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      setError('An error occurred during registration')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Register</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name" className="block text-pink-600 mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-pink-600 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-pink-600 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-pink-600 mb-2">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as 'buyer' | 'seller')}
            className="w-full px-3 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
          Register
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link href="/login" className="text-pink-600 hover:underline">Login here</Link>
      </p>
    </div>
  )
}

