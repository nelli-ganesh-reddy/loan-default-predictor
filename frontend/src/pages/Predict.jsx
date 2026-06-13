import { useState } from 'react'
import { getPrediction } from '../api/index'
import ResultCard from '../components/ResultCard'

function Predict() {

  // useState stores all form values in one object
  const [formData, setFormData] = useState({
    Age: '',
    Income: '',
    LoanAmount: '',
    CreditScore: '',
    MonthsEmployed: '',
    NumCreditLines: '',
    InterestRate: '',
    LoanTerm: '',
    DTIRatio: '',
    Education: "Bachelor's",
    EmploymentType: 'Full-time',
    MaritalStatus: 'Single',
    HasMortgage: 'No',
    HasDependents: 'No',
    LoanPurpose: 'Auto',
    HasCoSigner: 'No'
  })

  // stores the result from backend
  const [result, setResult] = useState(null)

  // tracks if we are waiting for backend response
  const [loading, setLoading] = useState(false)

  // runs every time user types or selects something
  // e.target.name  → which field changed (Age, Income etc)
  // e.target.value → what user typed
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // runs when user clicks Predict button
  const handleSubmit = async () => {
    setLoading(true) // show "Predicting..." on button

    try {
      // send form data to FastAPI backend
      const data = await getPrediction(formData)
      setResult(data)
    } catch (err) {
      alert('Cannot connect to backend!')
    }

    setLoading(false) // hide "Predicting..."
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Check Loan Default Risk
      </h2>

      {/* Number inputs */}
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
          <input type="number" name="Age" value={formData.Age}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Income</label>
          <input type="number" name="Income" value={formData.Income}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Loan Amount</label>
          <input type="number" name="LoanAmount" value={formData.LoanAmount}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Credit Score</label>
          <input type="number" name="CreditScore" value={formData.CreditScore}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Months Employed</label>
          <input type="number" name="MonthsEmployed" value={formData.MonthsEmployed}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Num Credit Lines</label>
          <input type="number" name="NumCreditLines" value={formData.NumCreditLines}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Interest Rate</label>
          <input type="number" name="InterestRate" value={formData.InterestRate}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Loan Term (months)</label>
          <input type="number" name="LoanTerm" value={formData.LoanTerm}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">DTI Ratio</label>
          <input type="number" name="DTIRatio" value={formData.DTIRatio}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Dropdown inputs */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Education</label>
          <select name="Education" value={formData.Education}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2">
            <option>Bachelor's</option>
            <option>Master's</option>
            <option>High School</option>
            <option>PhD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Employment Type</label>
          <select name="EmploymentType" value={formData.EmploymentType}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2">
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Self-employed</option>
            <option>Unemployed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Marital Status</label>
          <select name="MaritalStatus" value={formData.MaritalStatus}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2">
            <option>Single</option>
            <option>Married</option>
            <option>Divorced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Loan Purpose</label>
          <select name="LoanPurpose" value={formData.LoanPurpose}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2">
            <option>Auto</option>
            <option>Business</option>
            <option>Education</option>
            <option>Home</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Has Mortgage</label>
          <select name="HasMortgage" value={formData.HasMortgage}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Has Dependents</label>
          <select name="HasDependents" value={formData.HasDependents}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Has Co-Signer</label>
          <select name="HasCoSigner" value={formData.HasCoSigner}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2">
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

      </div>

      {/* Predict button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50">
        {loading ? 'Predicting...' : 'Predict'}
      </button>
      {/* show result card only when we have a result */}
      {result && <ResultCard result={result} />}
      {/* Show result only when we have one */}

    </div>
  )
}

export default Predict