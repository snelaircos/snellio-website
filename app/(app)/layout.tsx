import { requireSubscription } from '@/lib/auth/requireSubscription'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireSubscription()
  return <>{children}</>
}
