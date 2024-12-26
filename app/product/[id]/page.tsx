// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { Star, ShoppingCart } from 'lucide-react'
// import { useAuth } from '@/hooks/useAuth'

// interface Product {
//   id: string
//   name: string
//   description: string
//   price: number
//   image: string
//   category: string
//   sellerId: string
// }

// export default function ProductPage({ params }: { params: { id: string } }) {
//   const [product, setProduct] = useState<Product | null>(null)
//   const [quantity, setQuantity] = useState(1)
//   const router = useRouter()
//   const { user } = useAuth()

//   useEffect(() => {
//     const fetchProduct = () => {
//       const allProducts: Product[] = []
//       for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i)
//         if (key && key.startsWith('sellerProducts_')) {
//           const sellerProducts = JSON.parse(localStorage.getItem(key) || '[]')
//           allProducts.push(...sellerProducts)
//         }
//       }
//       const foundProduct = allProducts.find(p => p.id === params.id)
//       setProduct(foundProduct || null)
//     }

//     fetchProduct()
//   }, [params.id])

//   const handleAddToCart = () => {
//     if (user && user.role === 'seller') {
//       alert("You cannot buy products as a seller!")
//       return
//     }

//     if (product) {
//       const cartItem = {
//         id: product.id,
//         name: product.name,
//         price: product.price,
//         quantity: quantity,
//         image: product.image,
//         sellerId: product.sellerId,
//       }
      
//       const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
//       const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id)
      
//       if (existingItemIndex !== -1) {
//         existingCart[existingItemIndex].quantity += quantity
//       } else {
//         existingCart.push(cartItem)
//       }
      
//       localStorage.setItem('cart', JSON.stringify(existingCart))
//       router.push('/cart')
//     }
//   }

//   if (!product) {
//     return <div className="container mx-auto px-4 py-8">Product not found</div>
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="grid md:grid-cols-2 gap-8">
//         <div>
//           <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
//         </div>
//         <div>
//           <h1 className="text-3xl font-bold text-pink-600 mb-4">{product.name}</h1>
//           <p className="text-gray-600 mb-4">{product.description}</p>
//           <p className="text-gray-600 mb-4">Category: {product.category}</p>
//           <div className="flex items-center mb-4">
//             <span className="text-2xl font-bold text-pink-600 mr-2">${product.price.toFixed(2)}</span>
//           </div>
//           <div className="flex items-center mb-4">
//             <label htmlFor="quantity" className="mr-2">Quantity:</label>
//             <input
//               type="number"
//               id="quantity"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(parseInt(e.target.value))}
//               className="w-16 px-2 py-1 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
//             />
//           </div>
//           <button
//             onClick={handleAddToCart}
//             disabled={user && user.role === 'seller'}
//             className="flex items-center justify-center w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ShoppingCart className="mr-2" />
//             {user && user.role === 'seller' ? 'Sellers cannot buy' : 'Add to Cart'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }








'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import Comments from '@/components/Comments'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  sellerId: string
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchProduct = () => {
      const allProducts: Product[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith('sellerProducts_')) {
          const sellerProducts = JSON.parse(localStorage.getItem(key) || '[]')
          allProducts.push(...sellerProducts)
        }
      }
      const foundProduct = allProducts.find(p => p.id === params.id)
      setProduct(foundProduct || null)
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (user && (user.role === 'seller' || user.role === 'admin')) {
      alert(`${user.role === 'seller' ? 'Sellers' : 'Admins'} cannot buy products!`)
      return
    }

    if (product) {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image,
        sellerId: product.sellerId,
      }
    
      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
      const existingItemIndex = existingCart.findIndex((item: any) => item.id === cartItem.id)
    
      if (existingItemIndex !== -1) {
        existingCart[existingItemIndex].quantity += quantity
      } else {
        existingCart.push(cartItem)
      }
    
      localStorage.setItem('cart', JSON.stringify(existingCart))
      router.push('/cart')
    }
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-pink-600 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-gray-600 mb-4">Category: {product.category}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-pink-600 mr-2">${product.price.toFixed(2)}</span>
          </div>
          <div className="flex items-center mb-4">
            <label htmlFor="quantity" className="mr-2">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 px-2 py-1 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <button
            onClick={handleAddToCart}
            disabled={user && (user.role === 'seller' || user.role === 'admin')}
            className="flex items-center justify-center w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="mr-2" />
            {user && user.role === 'seller' ? 'Sellers cannot buy' : user && user.role === 'admin' ? 'Admins cannot buy' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <Comments productId={product.id} />
    </div>
  )
}

