import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      
      {/* left side - app name */}
      <h1 className="text-xl font-bold">
        🏦 Loan Default Predictor
      </h1>

      {/* right side - navigation links */}
      <div className="flex gap-6">
        <Link to="/" className="hover:underline">
          Predict
        </Link>
        <Link to="/history" className="hover:underline">
          History
        </Link>
      </div>

    </nav>
  )
}

export default Navbar