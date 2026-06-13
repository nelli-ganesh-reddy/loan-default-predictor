from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
from datetime import datetime
import os

# load .env file
load_dotenv()

# build TiDB connection URL
DB_URL = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}?ssl_verify_cert=false"

# create connection to database
engine = create_engine(DB_URL)

# base class for all tables
Base = declarative_base()

# this is our predictions table
class Prediction(Base):
    __tablename__ = 'predictions'

    id            = Column(Integer, primary_key=True)
    age           = Column(Integer)
    income        = Column(Integer)
    loan_amount   = Column(Integer)
    credit_score  = Column(Integer)
    prediction    = Column(Integer)   # 0 or 1
    confidence    = Column(Float)     # percentage
    created_at    = Column(DateTime, default=datetime.utcnow)

# create table in TiDB if it doesn't exist
Base.metadata.create_all(engine)

# session is used to talk to database
SessionLocal = sessionmaker(bind=engine)