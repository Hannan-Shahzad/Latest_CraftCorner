'use client'

import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: 'buyer' | 'seller' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, role: 'buyer' | 'seller') => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Check if the user is the admin
    if (email === 'hellothere123@gmail.com' && password === 'hellothere') {
      const adminUser = { id: 'admin', name: 'Admin', email, role: 'admin' }
      setUser(adminUser)
      localStorage.setItem('currentUser', JSON.stringify(adminUser))
      return true
    }
    const buyers = JSON.parse(localStorage.getItem('buyers') || '[]')
    const sellers = JSON.parse(localStorage.getItem('sellers') || '[]')
    
    const foundUser = [...buyers, ...sellers].find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      return true
    }
    
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
    router.push('/login')
  }

  const register = async (name: string, email: string, password: string, role: 'buyer' | 'seller'): Promise<boolean> => {
    // Check if the user is trying to register with the admin email
    if (email === 'hellothere123@gmail.com') {
      return false // Prevent registration with the admin email
    }
    const storageKey = role === 'buyer' ? 'buyers' : 'sellers'
    const users = JSON.parse(localStorage.getItem(storageKey) || '[]')
    
    if (users.some((u: User) => u.email === email)) {
      return false // User already exists
    }
    
    const newUser = { id: Date.now().toString(), name, email, password, role }
    users.push(newUser)
    localStorage.setItem(storageKey, JSON.stringify(users))
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
    
    return true
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

