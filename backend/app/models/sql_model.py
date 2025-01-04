from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean
import datetime

Base = declarative_base()

def get_timestamp():
    return datetime.datetime.now()

# Creating a new model or table

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    due_date = Column(DateTime)
    priority = Column(String)
    status = Column(Boolean, default=False)
    creation_date = Column(DateTime, default=datetime.datetime.now()) 
    
    
# class Task(Base):
#     __tablename__ = 'tasks'
    
#     id = Column(Integer, primary_key=True, index=True, autoincrement=True)
#     title = Column(String, nullable=False, index=True)
#     description = Column(String, nullable=True)
#     due_date = Column(DateTime, nullable=False, default=lambda: datetime.datetime.now() + datetime.timedelta(days=7))
#     priority = Column(Integer, default=1)
#     completed = Column(Boolean, default=False)
#     created_at = Column(DateTime, default=get_timestamp, nullable=False)
