export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#EEF6FB' }}>
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div style={{ position: 'absolute', top: '8%', left: '6%', width: 80, height: 80, borderRadius: '50%', backgroundColor: '#BDE3F5', opacity: 0.5 }} />
        <div style={{ position: 'absolute', top: '20%', right: '8%', width: 50, height: 50, borderRadius: '50%', backgroundColor: '#D4B89A', opacity: 0.35 }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '10%', width: 35, height: 35, borderRadius: '50%', backgroundColor: '#BDE3F5', opacity: 0.4 }} />
        <div style={{ position: 'absolute', bottom: '25%', right: '5%', width: 65, height: 65, borderRadius: '50%', backgroundColor: '#C9A882', opacity: 0.25 }} />
        <div style={{ position: 'absolute', top: '50%', left: '2%', width: 20, height: 20, borderRadius: '50%', backgroundColor: '#7EC8E3', opacity: 0.4 }} />
      </div>

      <div className="w-full max-w-md px-6 py-12 relative">
        <div className="text-center mb-8">
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: '#7EC8E3',
            marginBottom: 16,
            fontSize: 28,
          }}>
            ✨
          </div>
          <h1 style={{
            fontSize: 30,
            fontWeight: 700,
            color: '#5A3E2B',
            fontFamily: "'Pacifico', cursive",
            letterSpacing: '0.5px',
          }}>
            BeautyStack
          </h1>
          
          <p style={{ marginTop: 6, fontSize: 14, color: '#9C7B5E' }}>
            Your magical beauty shelf
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}