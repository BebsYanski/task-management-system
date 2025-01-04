from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, DateTime, Boolean
import datetime
from enum import Enum
from sqlalchemy import Enum as SQLAlchemyEnum

Base = declarative_base()

def get_timestamp():
    return datetime.datetime.now()

class Priority(str,Enum):
    low = "low"
    medium = "medium"
    high = "high"
    
class TaskStatus(str,Enum):
    complete = "complete"
    incomplete = "incomplete"

# Creating a new model or table

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    due_date = Column(DateTime)
    priority = Column(SQLAlchemyEnum(Priority))
    status = Column(SQLAlchemyEnum(TaskStatus), default="incomplete")
    creation_date = Column(DateTime, default=datetime.datetime.now()) 
     
    
