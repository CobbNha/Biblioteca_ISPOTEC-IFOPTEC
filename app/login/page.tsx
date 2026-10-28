'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (event.nativeEvent instanceof SubmitEvent === false) return
    setLoading(true)
    setError('')
    const { error: signInError } = await createClient().auth.signInWithPassword({ email, password })
    setLoading(false)
    if (signInError) {
      setError('Email ou palavra-passe inválidos.')
      return
    }
    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="auth-shell">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">ISPOTEC · IFOPTEC</p>
        <h1>Acesso administrativo</h1>
        <p className="muted">Entre para gerir o acervo e acompanhar a biblioteca digital.</p>
        <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
        <label>Palavra-passe<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required autoComplete="current-password" /></label>
        {error && <p className="error">{error}</p>}
        <button className="primary-button" disabled={loading}>{loading ? 'A entrar…' : 'Entrar'}</button>
      </form>
    </main>
  )
}
