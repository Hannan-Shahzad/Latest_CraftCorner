import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-pink-100 text-pink-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">About CraftCorner</h3>
            <p className="text-sm">A marketplace for artisans to showcase and sell their unique handcrafted products.</p>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><Link href="/about" className="hover:text-pink-800 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-pink-800 transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-pink-800 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-800 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-pink-800 transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-3 py-2 text-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 text-sm rounded-r-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          &copy; {new Date().getFullYear()} CraftCorner. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

