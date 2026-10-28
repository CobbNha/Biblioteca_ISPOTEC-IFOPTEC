import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = { title: 'Biblioteca ISPOTEC • IFOPTEC', description: 'Sistema de gestão das bibliotecas do ISPOTEC e IFOPTEC.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt"><body>{children}</body></html> }
