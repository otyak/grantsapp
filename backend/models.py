from sqlalchemy import create_engine, Column, Integer, String, Float, Date, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()

class Grant(Base):
    __tablename__ = 'grants'

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    description = Column(String(1000))
    status = Column(String(50))  # open, closed, upcoming
    opening_date = Column(Date)
    closing_date = Column(Date)
    funding_amount = Column(Float)
    business_contribution_percentage = Column(Float)
    location = Column(String(100))
    industry = Column(String(100))
    eligibility_criteria = Column(String(500))
    keywords = Column(String(200))
    is_active = Column(Boolean, default=True)

# Initialize database
engine = create_engine('sqlite:///grants.db')
Base.metadata.create_all(engine)

# Create session factory
Session = sessionmaker(bind=engine)
