'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { sendMessageToSeller } from '@/utils/sellerMessages'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  sellerId: string
}

interface ShippingAddress {
  fullName: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function OrderConfirmationPage() {
  const [orderItems, setOrderItems] = useState<CartItem[]>([])
  const [orderTotal, setOrderTotal] = useState(0)
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    const storedAddress = localStorage.getItem('shippingAddress')
    if (storedCart && storedAddress) {
      const cartItems = JSON.parse(storedCart)
      const address = JSON.parse(storedAddress)
      setOrderItems(cartItems)
      setShippingAddress(address)
      const total = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)
      setOrderTotal(total)

      // Group items by seller
      const sellerItems = cartItems.reduce((acc: Record<string, CartItem[]>, item: CartItem) => {
        if (!acc[item.sellerId]) {
          acc[item.sellerId] = []
        }
        acc[item.sellerId].push(item)
        return acc
      }, {})

      // Send messages to relevant sellers
      Object.entries(sellerItems).forEach(([sellerId, items]) => {
        const sellerProducts = items.map(item => ({
          productName: item.name,
          quantity: item.quantity
        }))
        sendMessageToSeller(sellerId, sellerProducts, address)
      })
    }

    // Clear the cart and shipping address after confirming the order
    localStorage.removeItem('cart')
    localStorage.removeItem('shippingAddress')
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Order Confirmation</h1>
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-8" role="alert">
        <p className="font-bold">Thank you for your order!</p>
        <p>Your order has been successfully placed and is being processed.</p>
      </div>
      {shippingAddress && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Shipping Address</h2>
          <p>{shippingAddress.fullName}</p>
          <p>{shippingAddress.streetAddress}</p>
          <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
          <p>{shippingAddress.country}</p>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Order Summary</h2>
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-4 pt-4">
          <div className="flex justify-between items-center font-semibold">
            <span>Total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <Link href="/" className="text-pink-600 hover:underline">
        Continue Shopping
      </Link>
    </div>
  )
}

