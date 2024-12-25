'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  sellerId: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    router.push('/checkout')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-pink-600">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-pink-100 text-pink-600 px-2 py-1 rounded-md mr-2"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-pink-100 text-pink-600 px-2 py-1 rounded-md ml-2"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <p className="text-xl font-semibold text-pink-600">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/" className="text-pink-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  )
}

