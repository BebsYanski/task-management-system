from fastapi import FastAPI
from app.routers import tasks
from app.database import Base, engine

app = FastAPI()

# Initialize database
Base.metadata.create_all(bind=engine)

# Include task routes
app.include_router(tasks.router)
