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

  return (
    <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#FFFAF7', border: '1px solid #F2DDD9' }}>
      <h2 className="text-xl font-semibold mb-1" style={{ color: '#5C3D47' }}>Welcome back</h2>
      <p className="text-sm mb-8" style={{ color: '#B89FA8' }}>Sign in to your beauty shelf</p>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#7A5566' }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: '#FDF6F0',
              border: '1px solid #F2DDD9',
              color: '#5C3D47',
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: '#7A5566' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
            style={{
              backgroundColor: '#FDF6F0',
              border: '1px solid #F2DDD9',
              color: '#5C3D47',
            }}
          />
        </div>

        {error && (
          <p className="text-sm rounded-lg px-4 py-2.5" style={{ backgroundColor: '#FDE8E8', color: '#C0394B' }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl text-sm font-medium transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#C2728A', color: '#fff' }}
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="text-center text-sm mt-6" style={{ color: '#B89FA8' }}>
        No account yet?{' '}
        <Link href="/signup" className="font-medium" style={{ color: '#C2728A' }}>
          Create one
        </Link>
      </p>
    </div>
  )
}