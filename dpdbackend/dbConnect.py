from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


load_dotenv()

SQL_ALCHEMY_DATABASEURL = os.getenv("DATABASE_URL")

engine = create_engine(SQL_ALCHEMY_DATABASEURL)

SessionLocal = sessionmaker(autocommit = False , autoflush= False , bind=engine)

Base = declarative_base()

def get_db():
    
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()    


def create_table():
    
  Base.metadata.create_all(bind=engine)   
  print('table created')        

  