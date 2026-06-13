import { useState, useEffect } from 'react'
import { getHistory } from '../api/index'

function History() {

  // stores list of past predictions from backend
  const [history, setHistory] = useState([])

  // stores loading state
  const [loading, setLoading] = useState(true)

  // useEffect runs automatically when page opens
  // the [] means run only once — when page first loads
  useEffect(() => {
    fetchHistory()
  }, [])

  // fetch all past predictions from backend
  const fetchHistory = async () => {
    try {
      const data = await getHistory()
      setHistory(data)
    } catch (err) {
      alert('Cannot connect to backend!')
    }
    setLoading(false)
  }

  // show loading text while fetching
  if (loading) {
    return <p className="text-center mt-10">Loading history...</p>
  }

  // show message if no predictions yet
  if (history.length === 0) {
    return <p className="text-center mt-10">No predictions yet. Go make one!</p>
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Prediction History
      </h2>

      {/* table of past predictions */}
      <table className="w-full text-sm text-left">

        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">Income</th>
            <th className="px-4 py-2">Loan Amount</th>
            <th className="px-4 py-2">Credit Score</th>
            <th className="px-4 py-2">Result</th>
            <th className="px-4 py-2">Confidence</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {/* loop through each prediction and show a row */}
          {history.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{item.age}</td>
              <td className="px-4 py-2">{item.income}</td>
              <td className="px-4 py-2">{item.loan_amount}</td>
              <td className="px-4 py-2">{item.credit_score}</td>
              <td className="px-4 py-2">
                {item.prediction === 1 ? '❌ Default' : '✅ Safe'}
              </td>
              <td className="px-4 py-2">{item.confidence}%</td>
              <td className="px-4 py-2">{item.created_at}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default History