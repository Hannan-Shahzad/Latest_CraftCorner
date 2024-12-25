'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ShippingAddressPage() {
  const [address, setAddress] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  })
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save shipping address to localStorage
    localStorage.setItem('shippingAddress', JSON.stringify(address))
    // Get the selected payment method from localStorage
    const paymentMethod = localStorage.getItem('paymentMethod')
    // Redirect to the appropriate payment page
    if (paymentMethod === 'visa') {
      router.push('/payment/visa')
    } else if (paymentMethod === 'paypal') {
      router.push('/payment/paypal')
    } else {
      // If no payment method is selected, redirect back to checkout
      router.push('/checkout')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Shipping Address</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={address.fullName}
            onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            value={address.streetAddress}
            onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            id="state"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            value={address.zipCode}
            onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            id="country"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  )
}

