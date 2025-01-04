from fastapi import FastAPI
from routers import tasks
from database import Base, engine

app = FastAPI()

# Initialize database
Base.metadata.create_all(bind=engine)

# Include task routes
app.include_router(tasks.router)
