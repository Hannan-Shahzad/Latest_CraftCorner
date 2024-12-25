'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function BuyerProfile() {
  const { user } = useAuth()
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (!user || user.role !== 'buyer') {
      router.push('/login')
    } else {
      const storedCart = localStorage.getItem('cart')
      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Your Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Personal Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Your Cart</h2>
        {cartItems.length > 0 ? (
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
        {cartItems.length > 0 && (
          <Link href="/cart" className="mt-4 inline-block bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
            View Full Cart
          </Link>
        )}
      </div>
    </div>
  )
}

