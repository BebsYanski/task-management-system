from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.task import Base

db_user: str = 'postgres'
db_port: int = 5432
db_host: str = 'db'
db_password: str = '21000'

# URI format: postgres://username:password@hostname:port/database_name?sslmode=require


uri: str = F'postgres://avnadmin:AVNS_Ho7YPyhliX3KancEu9t@postgrestaskdb-task-management-systemv1.b.aivencloud.com:18629/defaultdb?sslmode=require'

# uri: str = F'postgresql://{db_user}:{db_password}@{db_host}:{db_port}/task_db'

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