from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import SessionLocal, Prediction
from model import predict

# create FastAPI app
app = FastAPI()

# allow React frontend to talk to backend
# without this browser blocks the request
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# this defines what data we expect from frontend
# pydantic checks the data automatically
class LoanInput(BaseModel):
    Age: int
    Income: int
    LoanAmount: int
    CreditScore: int
    MonthsEmployed: int
    NumCreditLines: int
    InterestRate: float
    LoanTerm: int
    DTIRatio: float
    Education: str
    EmploymentType: str
    MaritalStatus: str
    HasMortgage: str
    HasDependents: str
    LoanPurpose: str
    HasCoSigner: str

# test route — just to check server is running
@app.get("/")
def home():
    return {"message": "Loan Default Predictor API is running!"}

# prediction route
@app.post("/predict")
def get_prediction(input: LoanInput):

    # convert input to dictionary
    data = input.dict()

    # get prediction and confidence from model
    prediction, confidence = predict(data)

    # save to TiDB database
    db = SessionLocal()
    record = Prediction(
        age          = input.Age,
        income       = input.Income,
        loan_amount  = input.LoanAmount,
        credit_score = input.CreditScore,
        prediction   = prediction,
        confidence   = confidence
    )
    db.add(record)
    db.commit()
    db.close()

    # send result back to frontend
    return {
        "prediction": prediction,
        "confidence": confidence
    }

# history route
@app.get("/history")
def get_history():

    # fetch all predictions from TiDB
    db = SessionLocal()
    records = db.query(Prediction).order_by(Prediction.created_at.desc()).all()
    db.close()

    # convert to list of dictionaries
    return [
        {
            "age"        : r.age,
            "income"     : r.income,
            "loan_amount": r.loan_amount,
            "credit_score": r.credit_score,
            "prediction" : r.prediction,
            "confidence" : r.confidence,
            "created_at" : str(r.created_at)
        }
        for r in records
    ]