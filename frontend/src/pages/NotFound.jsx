import { Link } from 'react-router-dom'


export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist</p>
      <Link 
        to="/" 
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Go Home
      </Link>
    </div>
  )
}