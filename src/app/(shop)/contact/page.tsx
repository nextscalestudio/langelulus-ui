import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  return { title: 'Contact | Parfum' }
}

export default function ContactPage() {
  return <ContactForm />
}
