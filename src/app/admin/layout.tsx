import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import AdminSidebar from './_components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session || session.user?.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-[#f9f9f9] p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
