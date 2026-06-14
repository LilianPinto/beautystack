'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 999,
    border: '2px solid #BDE3F5',
    backgroundColor: '#F7FBFE',
    color: '#5A3E2B',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box' as const,
  }

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#7A5C42',
    marginBottom: 6,
    marginLeft: 8,
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 32,
      padding: '36px 32px',
      border: '2.5px solid #BDE3F5',
      boxShadow: '0 8px 32px rgba(126,200,227,0.15)',
    }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#5A3E2B', marginBottom: 4 }}>
        Welcome back! 👋
      </h2>
      <p style={{ fontSize: 13, color: '#9C7B5E', marginBottom: 28 }}>
        Sign in to check on your beauties
      </p>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FEF0F0',
            border: '1.5px solid #F5C0C0',
            borderRadius: 16,
            padding: '10px 16px',
            fontSize: 13,
            color: '#B94040',
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '13px',
            borderRadius: 999,
            border: 'none',
            backgroundColor: '#7EC8E3',
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            marginTop: 4,
            letterSpacing: '0.2px',
          }}
        >
          {loading ? 'Signing in…' : 'Sign in ✨'}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: 13, color: '#9C7B5E', marginTop: 24 }}>
        No account yet?{' '}
        <Link href="/signup" style={{ color: '#5A9DB8', fontWeight: 700, textDecoration: 'none' }}>
          Join BeautyStack
        </Link>
      </p>
    </div>
  )
}