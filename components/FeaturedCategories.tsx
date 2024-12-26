import Link from 'next/link'

const categories = [
  { id: 1, name: 'Pottery', image: '/images/pottery.jpg' },
  { id: 2, name: 'Jewelry', image: '/images/jewellery.jpg' },
  { id: 3, name: 'Clothing', image: '/images/clothing.jpg' },
  { id: 4, name: 'Home Decor', image: '/images/homedecor.jpg' },
]

export default function FeaturedCategories() {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Featured Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`} className="block">
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img src={category.image} alt={category.name} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <span className="text-white text-xl font-semibold">{category.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

