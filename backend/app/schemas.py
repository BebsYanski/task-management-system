from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional
from enum import Enum

class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class TaskStatus(str, Enum):
    complete = "complete"
    incomplete = "incomplete"

class TaskBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=100, description="Title of the task")
    description: Optional[str] = Field(None, max_length=500, description="Description of the task")
    due_date: Optional[datetime] = Field(None, description="Due date of the task")
    priority: Priority = Field(Priority.medium, description="Priority of the task (low, medium, high)")
    status: TaskStatus = Field(TaskStatus.incomplete, description="Status of the task (complete, incomplete)")

    @validator("priority", pre=True)
    def validate_priority(cls, value):
        if isinstance(value, str):
            try:
                return Priority(value.lower())
            except ValueError:
                raise ValueError(f"Invalid priority: {value}. Must be one of: {', '.join(Priority.__members__)}")
        return value

    @validator("status", pre=True)
    def validate_status(cls, value):
        if isinstance(value, str):
            try:
                return TaskStatus(value.lower())
            except ValueError:
                raise ValueError(f"Invalid status: {value}. Must be one of: {', '.join(TaskStatus.__members__)}")
        return value

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=100, description="Title of the task")
    description: Optional[str] = Field(None, max_length=500, description="Description of the task")
    due_date: Optional[datetime] = Field(None, description="Due date of the task")
    priority: Optional[Priority] = Field(None, description="Priority of the task (low, medium, high)")
    status: Optional[TaskStatus] = Field(None, description="Status of the task (complete, incomplete)")

    @validator("priority", pre=True)
    def validate_priority(cls, value):
        if isinstance(value, str):
            try:
                return Priority(value.lower())
            except ValueError:
                raise ValueError(f"Invalid priority: {value}. Must be one of: {', '.join(Priority.__members__)}")
        return value

    @validator("status", pre=True)
    def validate_status(cls, value):
        if isinstance(value, str):
            try:
                return TaskStatus(value.lower())
            except ValueError:
                raise ValueError(f"Invalid status: {value}. Must be one of: {', '.join(TaskStatus.__members__)}")
        return value

class TaskResponse(TaskBase):
    id: int = Field(..., description="ID of the task")
    creation_date: datetime = Field(..., description="Creation timestamp of the task")

    class Config:
        orm_mode = True