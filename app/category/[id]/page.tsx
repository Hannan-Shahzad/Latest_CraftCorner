'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const categories = [
  { id: '1', name: 'Pottery' },
  { id: '2', name: 'Jewelry' },
  { id: '3', name: 'Clothing' },
  { id: '4', name: 'Home Decor' },
  { id: '5', name: 'Accessories' },
]

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    const categoryName = categories.find(c => c.id === params.id)?.name || ''
    setCategory(categoryName)

    const fetchCategoryProducts = () => {
      const categoryData = JSON.parse(localStorage.getItem('categoryData') || '{}')
      const products = categoryData[categoryName] || []
      setCategoryProducts(products)
    }

    fetchCategoryProducts()
  }, [params.id])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoryProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4">
              <div className="aspect-square mb-4">
                <img src={product.image} alt={product.name} className="object-cover w-full h-full rounded-md" />
              </div>
              <h3 className="text-lg font-semibold text-pink-600 mb-2">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
      {categoryProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-8">No products found in this category.</p>
      )}
    </div>
  )
}

