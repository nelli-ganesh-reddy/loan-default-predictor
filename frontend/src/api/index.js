// base URL of our FastAPI backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://loan-default-predictor-9np8.onrender.com'

const buildUrl = (path) => new URL(path, BASE_URL).toString()

const parseResponse = async (response) => {
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const message = data?.detail || data?.message || response.statusText || 'Unknown error'
    throw new Error(`API request failed: ${message}`)
  }
  return data
}

// send form data to backend and get prediction
export const getPrediction = async (formData) => {
  const response = await fetch(buildUrl('/predict'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  return parseResponse(response)
}

// get all past predictions from backend
export const getHistory = async () => {
  const response = await fetch(buildUrl('/history'))
  return parseResponse(response)
}