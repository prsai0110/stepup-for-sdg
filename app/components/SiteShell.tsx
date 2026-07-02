'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from '@/app/components/site/Navbar'
import { Footer } from '@/app/components/site/Footer'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
    </>
  )
}
