from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.task import Base

db_user: str = 'postgres'
db_port: int = 5432
db_host: str = 'db'
db_password: str = '21000'

uri: str = F'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/task_db'

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