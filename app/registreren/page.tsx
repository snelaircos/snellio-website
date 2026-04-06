import { redirect } from 'next/navigation'

interface Props {
  searchParams: { pakket?: string }
}

export default function RegistrerenPage({ searchParams }: Props) {
  const pakket = searchParams.pakket || 'pro'
  redirect(`/checkout?pakket=${pakket}`)
}
