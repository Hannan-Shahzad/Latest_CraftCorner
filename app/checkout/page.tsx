'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'paypal' | ''>('')
  const router = useRouter()

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }
  }, [])

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePaymentMethodChange = (method: 'visa' | 'paypal') => {
    setPaymentMethod(method)
  }

  const handleProceedToPayment = () => {
    if (paymentMethod) {
      localStorage.setItem('paymentMethod', paymentMethod)
      router.push('/checkout/shipping')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Payment Method</h2>
          <div className="space-y-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="visa"
                checked={paymentMethod === 'visa'}
                onChange={() => handlePaymentMethodChange('visa')}
                className="text-pink-600 focus:ring-pink-500"
              />
              <span>Credit Card (Visa)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => handlePaymentMethodChange('paypal')}
                className="text-pink-600 focus:ring-pink-500"
              />
              <span>PayPal</span>
            </label>
          </div>
          <button
            onClick={handleProceedToPayment}
            disabled={!paymentMethod}
            className="mt-8 w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Shipping
          </button>
        </div>
      </div>
    </div>
  )
}

