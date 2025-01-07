import os
import sqlalchemy.exc
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.task import Base

load_dotenv()

db_url = os.environ.get("DATABASE_URL")
# os.environ['DATABASE_URL'] = DATABASE_URL

if not db_url:
    raise ValueError("DB_URL environment variable not set")

uri: str = db_url

try:
    engine = create_engine(uri)
    Base.metadata.create_all(bind=engine)  # Create tables if they don't exist

    Session = sessionmaker(bind=engine, autoflush=True)
    db_session = Session()

    engine.connect().close() # Test the connection
    print("Database connected successfully.")

except sqlalchemy.exc.OperationalError as e:
    print(f"Database connection error: {e}")
    exit(1) # Exit with error status
except Exception as e:
    print(f"An unexpected error occurred: {e}")
    raise # Re-raise the exception

# ... rest of your code using db_session