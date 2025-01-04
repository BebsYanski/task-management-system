from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

import models.sql_model as models
import crud
import schemas
from database import Session
from datetime import datetime

router = APIRouter(prefix="/tasks", tags=["Tasks"])

def get_db():
    """Dependency to get a database session."""
    db = Session()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    """Creates a new task."""
    return crud.create_task(db, task)

@router.get("/", response_model=List[schemas.TaskResponse])
def read_tasks(
    skip: int = 0,
    limit: int = 10,
    sort_by: str = "creation_date",
    db: Session = Depends(get_db),
):
    """Retrieves a list of tasks, optionally sorted."""
    query = db.query(models.Task)

    if sort_by == "priority":
        query = query.order_by(models.Task.priority)
    elif sort_by == "due_date":
        query = query.order_by(models.Task.due_date)
    elif sort_by == "id":
        query = query.order_by(models.Task.id)
    else:  # Default sorting
        query = query.order_by(models.Task.creation_date)

    return query.offset(skip).limit(limit).all()

@router.get("/{task_id}", response_model=schemas.TaskResponse)
def read_task(task_id: int, db: Session = Depends(get_db)):
    """Retrieves a task by ID."""
    task = crud.get_task(db, task_id)
    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    """Updates an existing task."""
    updated_task = crud.update_task(db, task_id, task)
    if updated_task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return updated_task

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """Deletes a task."""
    deleted_task = crud.delete_task(db, task_id)
    if deleted_task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return

@router.get("/search/", response_model=List[schemas.TaskResponse])
def search_tasks(
    title: Optional[str] = None,
    priority: Optional[str] = None,
    due_date: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """Searches tasks based on title, priority, and due date."""
    query = db.query(models.Task)

    if title:
        query = query.filter(models.Task.title.ilike(f"%{title}%"))

    if priority:
        query = query.filter(models.Task.priority == priority)

    if due_date:
        try:
            due_date_obj = datetime.strptime(due_date, "%Y-%m-%d").date()
            query = query.filter(models.Task.due_date == due_date_obj)
        except ValueError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid due_date format. Use YYYY-MM-DD.",
            )

    return query.all()