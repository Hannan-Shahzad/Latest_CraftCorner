'use client'

import { useState } from 'react'
import FeaturedCategories from '@/components/FeaturedCategories'
import FeaturedProducts from '@/components/FeaturedProducts'
import SearchResults from '@/components/SearchResults'
import Hero from '@/components/Hero'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-pink-600 mb-8">Welcome to CraftCorner</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
      {searchQuery ? (
        <SearchResults query={searchQuery} />
      ) : (
        <>
        
          <FeaturedCategories />
          <FeaturedProducts />
        </>
      )}
    </div>
  )
}

