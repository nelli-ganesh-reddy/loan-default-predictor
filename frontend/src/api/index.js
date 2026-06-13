// base URL of our FastAPI backend
const BASE_URL = 'https://loan-default-predictor-9np8.onrender.com/'

// send form data to backend and get prediction
export const getPrediction = async (formData) => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  return response.json()
}

// get all past predictions from backend
export const getHistory = async () => {
  const response = await fetch(`${BASE_URL}/history`)
  return response.json()
}