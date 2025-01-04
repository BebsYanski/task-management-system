from sqlalchemy.orm import Session
from models.sql_model import Task
from schemas import TaskCreate, TaskUpdate

def get_tasks(db: Session, skip: int = 0, limit: int = 10):
    """Retrieves a list of tasks."""
    return db.query(Task).offset(skip).limit(limit).all()

def create_task(db: Session, task: TaskCreate):
    """Creates a new task."""
    db_task = Task(**task.model_dump())  # Use model_dump()
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

def get_task(db: Session, task_id: int):
    """Retrieves a task by ID."""
    return db.query(Task).filter(Task.id == task_id).first()

def update_task(db: Session, task_id: int, task: TaskUpdate):
    """Updates an existing task."""
    db_task = get_task(db, task_id)
    if db_task:
        for key, value in task.model_dump(exclude_unset=True).items(): # Use model_dump()
            setattr(db_task, key, value)
        db.commit()
        db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    """Deletes a task."""
    db_task = get_task(db, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
    return db_task