'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, User } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-pink-100 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-pink-600">
          CraftCorner
        </Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="/cart" className="text-pink-600 hover:text-pink-800">
                <ShoppingCart />
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    href={user.role === 'seller' ? '/seller-dashboard' : user.role === 'admin' ? '/admin-profile' : '/profile'}
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <User />
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="text-pink-600 hover:text-pink-800">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-pink-600 hover:text-pink-800">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-pink-600 hover:text-pink-800">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

