from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.task import Base

from dotenv import load_dotenv
import os

load_dotenv()


db_user = os.environ.get("DB_USER")
db_port = int(os.environ.get("DB_PORT", default=5432)) 
db_host = os.environ.get("DB_HOST","db")
db_password = os.environ.get("DB_PASSWORD")
db_name = os.environ.get("DB_NAME")

# Aiven database
# uri = F'postgres://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}?sslmode=require'


uri: str = F'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}'

# Create the database engine
engine = create_engine(uri)

Base.metadata.create_all(bind = engine)

# Create a session factory
Session = sessionmaker(
  bind=engine,
  autoflush=True
  )

# Create a session
db_session = Session()


try:
    connection = engine.connect()
    connection.close()
    print("ping, Connected") 
except Exception as e:
    print(f'Error: {str(e)}')