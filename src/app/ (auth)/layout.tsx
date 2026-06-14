export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF6F0' }}>
      <div className="w-full max-w-md px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight" style={{ color: '#C2728A' }}>
            BeautyStack
          </h1>
          <p className="mt-2 text-sm" style={{ color: '#B89FA8' }}>
            Your personal beauty shelf
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}