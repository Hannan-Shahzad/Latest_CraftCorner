'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Plus, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  sellerId: string
}

interface SellerMessage {
  id: string
  date: string
  products: { productName: string; quantity: number }[]
  shippingAddress: {
    fullName: string
    streetAddress: string
    city: string
    state: string
    zipCode: string
    country: string
  }
}

export default function SellerDashboard() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'sellerId'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
  })
  const [messages, setMessages] = useState<SellerMessage[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'seller') {
      router.push('/login')
    } else {
      // Load seller's products from localStorage
      const storedProducts = localStorage.getItem(`sellerProducts_${user.id}`)
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts))
      }
      // Load seller's messages from localStorage
      const storedMessages = localStorage.getItem(`sellerMessages_${user.id}`)
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages))
      }
    }
  }, [user, router])

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      sellerId: user.id,
    }
    const updatedProducts = [...products, product]
    setProducts(updatedProducts)
    localStorage.setItem(`sellerProducts_${user.id}`, JSON.stringify(updatedProducts))
    setNewProduct({ name: '', description: '', price: 0, image: '', category: '' })

    // Update category data
    const categoryData = JSON.parse(localStorage.getItem('categoryData') || '{}')
    if (!categoryData[product.category]) {
      categoryData[product.category] = []
    }
    categoryData[product.category].push(product)
    localStorage.setItem('categoryData', JSON.stringify(categoryData))
  }

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId)
    setProducts(updatedProducts)
    localStorage.setItem(`sellerProducts_${user?.id}`, JSON.stringify(updatedProducts))

    // Update category data
    const categoryData = JSON.parse(localStorage.getItem('categoryData') || '{}')
    Object.keys(categoryData).forEach(category => {
      categoryData[category] = categoryData[category].filter((p: Product) => p.id !== productId)
    })
    localStorage.setItem('categoryData', JSON.stringify(categoryData))
  }

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Seller Dashboard</h1>
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-pink-600 mb-4">Your Products</h2>
              {products.length === 0 ? (
                <p className="text-gray-600">You haven't added any products yet.</p>
              ) : (
                <ul className="space-y-4">
                  {products.map((product) => (
                    <li key={product.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-pink-600 mb-4">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                    required
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="url"
                    id="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    id="category"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50"
                  >
                    <option value="">Select a category</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home Decor">Home Decor</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 flex items-center justify-center"
                >
                  <Plus size={20} className="mr-2" />
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="messages">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4">Order Messages</h2>
          {messages.length === 0 ? (
            <p className="text-gray-600">You have no new messages.</p>
          ) : (
            <ul className="space-y-4">
              {messages.map((message) => (
                <li key={message.id} className="bg-white p-4 rounded-lg shadow">
                  <p className="font-semibold">Order Date: {new Date(message.date).toLocaleString()}</p>
                  <h3 className="font-semibold mt-2">Products:</h3>
                  <ul className="list-disc list-inside">
                    {message.products.map((product, index) => (
                      <li key={index}>{product.productName} - Quantity: {product.quantity}</li>
                    ))}
                  </ul>
                  <h3 className="font-semibold mt-2">Shipping Address:</h3>
                  <p>{message.shippingAddress.fullName}</p>
                  <p>{message.shippingAddress.streetAddress}</p>
                  <p>{message.shippingAddress.city}, {message.shippingAddress.state} {message.shippingAddress.zipCode}</p>
                  <p>{message.shippingAddress.country}</p>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

