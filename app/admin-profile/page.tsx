'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface Seller {
  id: string
  name: string
  email: string
}

export default function AdminProfile() {
  const { user } = useAuth()
  const router = useRouter()
  const [sellers, setSellers] = useState<Seller[]>([])

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login')
    } else {
      // Fetch all sellers
      const allSellers: Seller[] = []
      const sellersData = localStorage.getItem('sellers')
      if (sellersData) {
        const parsedSellers = JSON.parse(sellersData)
        parsedSellers.forEach((seller: any) => {
          allSellers.push({
            id: seller.id,
            name: seller.name,
            email: seller.email,
          })
        })
      }
      setSellers(allSellers)
    }
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Admin Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">Seller Information</h2>
        {sellers.length === 0 ? (
          <p className="text-gray-600">No sellers registered yet.</p>
        ) : (
          <ul className="space-y-4">
            {sellers.map((seller) => (
              <li key={seller.id} className="border-b pb-2">
                <p><strong>Name:</strong> {seller.name}</p>
                <p><strong>Email:</strong> {seller.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

