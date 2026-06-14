import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

function getExpiryStatus(expiresAt: string | null) {
  if (!expiresAt) return 'none'
  const today = new Date()
  const expiry = new Date(expiresAt)
  const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  if (daysLeft < 0) return 'expired'
  if (daysLeft <= 30) return 'soon'
  return 'good'
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getDaysLeft(expiresAt: string | null) {
  if (!expiresAt) return null
  const today = new Date()
  const expiry = new Date(expiresAt)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const categoryEmoji: Record<string, string> = {
  skincare: '🧴',
  makeup: '💄',
  haircare: '💇',
  fragrance: '🌸',
  bodycare: '🛁',
  nails: '💅',
  other: '✨',
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const expired = products?.filter(p => getExpiryStatus(p.expires_at) === 'expired') ?? []
  const expiringSoon = products?.filter(p => getExpiryStatus(p.expires_at) === 'soon') ?? []
  const good = products?.filter(p => getExpiryStatus(p.expires_at) === 'good') ?? []
  const noDate = products?.filter(p => getExpiryStatus(p.expires_at) === 'none') ?? []

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EEF6FB', padding: '0 0 60px' }}>

      {/* Header */}
      <div style={{
        backgroundColor: '#fff',
        borderBottom: '2px solid #BDE3F5',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: 26,
            color: '#5A3E2B',
            margin: 0,
          }}>
            BeautyStack
          </h1>
          <p style={{ fontSize: 13, color: '#9C7B5E', margin: '2px 0 0' }}>
            Your shelf has {products?.length ?? 0} product{products?.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/products/new" style={{
            backgroundColor: '#7EC8E3',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
          }}>
            + Add product
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit" style={{
              backgroundColor: 'transparent',
              border: '2px solid #BDE3F5',
              color: '#7A5C42',
              padding: '8px 16px',
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Sign out
            </button>
          </form>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

        {/* Empty state */}
        {products?.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            backgroundColor: '#fff',
            borderRadius: 24,
            border: '2px dashed #BDE3F5',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🌸</div>
            <h2 style={{ fontSize: 20, color: '#5A3E2B', fontWeight: 700, marginBottom: 8 }}>
              Your shelf is empty!
            </h2>
            <p style={{ fontSize: 14, color: '#9C7B5E', marginBottom: 24 }}>
              Start by adding your first beauty product.
            </p>
            <Link href="/products/new" style={{
              backgroundColor: '#7EC8E3',
              color: '#fff',
              padding: '12px 28px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              Add your first product ✨
            </Link>
          </div>
        )}

        {/* Expired */}
        {expired.length > 0 && (
          <Section title="⚠️ Expired" color="#B94040">
            {expired.map(p => <ProductCard key={p.id} product={p} />)}
          </Section>
        )}

        {/* Expiring soon */}
        {expiringSoon.length > 0 && (
          <Section title="⏳ Expiring soon" color="#B87C2A">
            {expiringSoon.map(p => <ProductCard key={p.id} product={p} />)}
          </Section>
        )}

        {/* Good */}
        {good.length > 0 && (
          <Section title="✅ All good" color="#3A7A4A">
            {good.map(p => <ProductCard key={p.id} product={p} />)}
          </Section>
        )}

        {/* No expiry date */}
        {noDate.length > 0 && (
          <Section title="📦 No expiry date" color="#7A5C42">
            {noDate.map(p => <ProductCard key={p.id} product={p} />)}
          </Section>
        )}

      </div>
    </div>
  )
}

function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 16, fontWeight: 700, color, marginBottom: 16 }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {children}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const status = getExpiryStatus(product.expires_at)
  const daysLeft = getDaysLeft(product.expires_at)
  const emoji = categoryEmoji[product.category?.toLowerCase()] ?? '✨'

  const statusColors: Record<string, { bg: string; text: string; label: string }> = {
    expired: { bg: '#FEF0F0', text: '#B94040', label: 'Expired' },
    soon: { bg: '#FEF8EC', text: '#B87C2A', label: `${daysLeft}d left` },
    good: { bg: '#EDFBF2', text: '#3A7A4A', label: `${daysLeft}d left` },
    none: { bg: '#F5F0EB', text: '#7A5C42', label: 'No expiry' },
  }

  const { bg, text, label } = statusColors[status]

  return (
    <Link href={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: '20px',
        border: '2px solid #BDE3F5',
        cursor: 'pointer',
        transition: 'transform 0.15s',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <span style={{ fontSize: 28 }}>{emoji}</span>
          <span style={{
            backgroundColor: bg,
            color: text,
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 999,
          }}>
            {label}
          </span>
        </div>

        {/* Name & brand */}
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#5A3E2B', margin: '0 0 2px' }}>
          {product.name}
        </h3>
        {product.brand && (
          <p style={{ fontSize: 12, color: '#9C7B5E', margin: '0 0 14px' }}>{product.brand}</p>
        )}

        {/* Dates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#9C7B5E' }}>Opened</span>
            <span style={{ color: '#5A3E2B', fontWeight: 600 }}>{formatDate(product.opened_at)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
            <span style={{ color: '#9C7B5E' }}>Expires</span>
            <span style={{ color: text, fontWeight: 600 }}>{formatDate(product.expires_at)}</span>
          </div>
        </div>

        {/* Notes preview */}
        {product.notes && (
          <p style={{
            fontSize: 12,
            color: '#9C7B5E',
            marginTop: 12,
            padding: '8px 10px',
            backgroundColor: '#F7FBFE',
            borderRadius: 10,
            border: '1px solid #BDE3F5',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {product.notes}
          </p>
        )}
      </div>
    </Link>
  )
}