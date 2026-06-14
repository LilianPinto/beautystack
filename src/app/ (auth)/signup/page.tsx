'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl p-8 shadow-sm text-center" style={{ backgroundColor: '#FFFAF7', border: '1px solid #F2DDD9' }}>
        <div className="text-4xl mb-4">💌</div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#5C3D47' }}>Check your inbox</h2>
        <p className="text-sm" style={{ color: '#B89FA8' }}>
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-8 shadow-sm" style={{ backgroundColor: '#FFFAF7', border: '1px solid #F2DDD9' }}>
      <h2 className="text-xl font-semibold mb-1" style={{ color: '#5C3D47' }}>Create your shelf</h2>
      <p className="text-sm mb-8" style={{ color: '#B89FA8' }}>Track every product, never waste another one</p>

      <form onSubmit={handleSignup} className="space-y-5">
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
            placeholder="At least 8 characters"
            minLength={8}
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
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-sm mt-6" style={{ color: '#B89FA8' }}>
        Already have an account?{' '}
        <Link href="/login" className="font-medium" style={{ color: '#C2728A' }}>
          Sign in
        </Link>
      </p>
    </div>
  )
}