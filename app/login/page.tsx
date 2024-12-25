'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const success = await login(email, password)
      if (success) {
        if (isAdmin) {
          router.push('/admin-profile')
        } else {
          router.push('/')
        }
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      console.error('Login failed:', error)
      setError('An error occurred during login')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mr-2"
            />
            <span>Login as Admin</span>
          </label>
        </div>
        <button type="submit" className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account? <Link href="/register" className="text-pink-600 hover:underline">Register here</Link>
      </p>
    </div>
  )
}

