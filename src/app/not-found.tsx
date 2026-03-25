import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-heading font-bold mb-4">404</h1>
      <p className="text-xl mb-8">This page doesn&apos;t exist. Yet.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  )
}
