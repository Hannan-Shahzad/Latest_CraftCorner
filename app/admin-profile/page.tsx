// 'use client'

// import { useEffect, useState } from 'react'
// import { useAuth } from '@/hooks/useAuth'
// import { useRouter } from 'next/navigation'

// interface Seller {
//   id: string
//   name: string
//   email: string
// }

// export default function AdminProfile() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const [sellers, setSellers] = useState<Seller[]>([])

//   useEffect(() => {
//     if (!user || user.role !== 'admin') {
//       router.push('/login')
//     } else {
//       // Fetch all sellers
//       const allSellers: Seller[] = []
//       const sellersData = localStorage.getItem('sellers')
//       if (sellersData) {
//         const parsedSellers = JSON.parse(sellersData)
//         parsedSellers.forEach((seller: any) => {
//           allSellers.push({
//             id: seller.id,
//             name: seller.name,
//             email: seller.email,
//           })
//         })
//       }
//       setSellers(allSellers)
//     }
//   }, [user, router])

//   if (!user || user.role !== 'admin') {
//     return null
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-pink-600 mb-8">Admin Profile</h1>
//       <div className="bg-white shadow-md rounded-lg p-6 mb-8">
//         <h2 className="text-2xl font-semibold text-pink-600 mb-4">Seller Information</h2>
//         {sellers.length === 0 ? (
//           <p className="text-gray-600">No sellers registered yet.</p>
//         ) : (
//           <ul className="space-y-4">
//             {sellers.map((seller) => (
//               <li key={seller.id} className="border-b pb-2">
//                 <p><strong>Name:</strong> {seller.name}</p>
//                 <p><strong>Email:</strong> {seller.email}</p>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   )
// }

















'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface Seller {
  id: string
  name: string
  email: string
  totalOrders: number
  products: Product[]
}

export default function AdminProfile() {
  const { user } = useAuth()
  const router = useRouter()
  const [sellers, setSellers] = useState<Seller[]>([])
  const [expandedSeller, setExpandedSeller] = useState<string | null>(null)

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/login')
    } else {
      // Fetch all sellers and their data
      const allSellers: Seller[] = []
      const sellersData = localStorage.getItem('sellers')
      if (sellersData) {
        const parsedSellers = JSON.parse(sellersData)
        parsedSellers.forEach((seller: any) => {
          const sellerProducts = JSON.parse(localStorage.getItem(`sellerProducts_${seller.id}`) || '[]')
          const sellerOrders = JSON.parse(localStorage.getItem(`sellerOrders_${seller.id}`) || '[]')
          allSellers.push({
            id: seller.id,
            name: seller.name,
            email: seller.email,
            totalOrders: sellerOrders.length,
            products: sellerProducts,
          })
        })
      }
      setSellers(allSellers)
    }
  }, [user, router])

  const handleDeleteSeller = (sellerId: string) => {
    // Remove seller from sellers list
    const updatedSellers = sellers.filter(seller => seller.id !== sellerId)
    setSellers(updatedSellers)
    
    // Update localStorage
    localStorage.setItem('sellers', JSON.stringify(updatedSellers.map(({ id, name, email }) => ({ id, name, email }))))
    
    // Delete seller's products
    localStorage.removeItem(`sellerProducts_${sellerId}`)
    
    // Delete seller's orders
    localStorage.removeItem(`sellerOrders_${sellerId}`)
    
    // Update category data
    const categoryData = JSON.parse(localStorage.getItem('categoryData') || '{}')
    Object.keys(categoryData).forEach(category => {
      categoryData[category] = categoryData[category].filter((product: any) => product.sellerId !== sellerId)
    })
    localStorage.setItem('categoryData', JSON.stringify(categoryData))
  }

  const toggleSellerExpand = (sellerId: string) => {
    setExpandedSeller(expandedSeller === sellerId ? null : sellerId)
  }

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
              <li key={seller.id} className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p><strong>Name:</strong> {seller.name}</p>
                    <p><strong>Email:</strong> {seller.email}</p>
                    <p><strong>Total Orders:</strong> {seller.totalOrders}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => toggleSellerExpand(seller.id)}
                      className="text-pink-600 hover:text-pink-800 mr-4"
                    >
                      {expandedSeller === seller.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <button
                      onClick={() => handleDeleteSeller(seller.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
                {expandedSeller === seller.id && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-pink-600 mb-2">Products:</h3>
                    {seller.products.length === 0 ? (
                      <p className="text-gray-600">No products available.</p>
                    ) : (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {seller.products.map((product) => (
                          <li key={product.id} className="bg-pink-50 rounded-lg p-4">
                            <Link href={`/product/${product.id}`} className="block">
                              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
                              <h4 className="font-semibold text-pink-600">{product.name}</h4>
                              <p className="text-gray-600">${product.price.toFixed(2)}</p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

