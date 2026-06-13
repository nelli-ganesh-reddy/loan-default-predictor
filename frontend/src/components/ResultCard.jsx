function ResultCard({ result }) {

  // decide color based on prediction
  // 1 = default risk = red
  // 0 = safe = green
  const isDefault = result.prediction === 1

  return (
    <div className={`mt-6 p-6 rounded-xl border-2 ${
      isDefault ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'
    }`}>

      {/* main result */}
      <p className={`text-2xl font-bold ${
        isDefault ? 'text-red-600' : 'text-green-600'
      }`}>
        {isDefault ? '❌ Default Risk' : '✅ No Default Risk'}
      </p>

      {/* confidence score */}
      <p className="text-gray-600 mt-2 text-lg">
        Confidence: <span className="font-semibold">{result.confidence}%</span>
      </p>

      {/* simple message */}
      <p className="text-gray-500 mt-2 text-sm">
        {isDefault
          ? 'This applicant has a high risk of defaulting on the loan.'
          : 'This applicant is likely to repay the loan successfully.'}
      </p>

    </div>
  )
}

export default ResultCard