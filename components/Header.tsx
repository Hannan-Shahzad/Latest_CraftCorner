// 'use client'

// import Link from 'next/link'
// import { useAuth } from '@/hooks/useAuth'
// import { ShoppingCart, User } from 'lucide-react'

// export default function Header() {
//   const { user, logout } = useAuth()

//   return (
//     <header className="bg-pink-100 shadow-md">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <Link href="/" className="text-2xl font-bold text-pink-600">
//         {/* It should be here */}
//           CraftCorner
//         </Link>
//         <nav>
//           <ul className="flex items-center space-x-4">
//             <li>
//               <Link href="/cart" className="text-pink-600 hover:text-pink-800">
//                 <ShoppingCart />
//               </Link>
//             </li>
//             {user ? (
//               <>
//                 <li>
//                   <Link
//                     href={user.role === 'seller' ? '/seller-dashboard' : user.role === 'admin' ? '/admin-profile' : '/profile'}
//                     className="text-pink-600 hover:text-pink-800"
//                   >
//                     <User />
//                   </Link>
//                 </li>
//                 <li>
//                   <button onClick={logout} className="text-pink-600 hover:text-pink-800">
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link href="/login" className="text-pink-600 hover:text-pink-800">
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/register" className="text-pink-600 hover:text-pink-800">
//                     Register
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   )
// }






'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { ShoppingCart, User } from 'lucide-react'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-pink-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-1 py-1 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {/* Logo with responsive size */}
          
          {/* Website name with responsive size */}
          <Link
            href="/"
            className="text-xl font-bold text-pink-600 sm:text-2xl"
          >
            <Image
            src="/images/logo_SDA.png" // Adjust the path if your logo is located elsewhere
            alt="CraftCorner Logo"
            width={70}
            height={70}
            className="object-contain inline-block w-12 h-12 sm:w-16 sm:h-16"
          />
            CraftCorner
          </Link>
        </div>
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
                    href={
                      user.role === 'seller'
                        ? '/seller-dashboard'
                        : user.role === 'admin'
                        ? '/admin-profile'
                        : '/profile'
                    }
                    className="text-pink-600 hover:text-pink-800"
                  >
                    <User />
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="text-pink-600 hover:text-pink-800"
                  >
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
