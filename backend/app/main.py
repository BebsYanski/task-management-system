from fastapi import FastAPI
from routers import tasks
from database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
  "http://localhost:3000"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Initialize database
Base.metadata.create_all(bind=engine)

# Include task routes
app.include_router(tasks.router)
