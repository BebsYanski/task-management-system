from fastapi import FastAPI
from app.routers import tasks
from app.db.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
  # "http://localhost:3000"
  "https://task-management-system-frontend-jycf.onrender.com"
]

# app.add_middleware(
#   CORSMiddleware,
#   allow_origins=origins,
#   allow_credentials=True,
#   allow_methods=["*"],
#   allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# Initialize database
Base.metadata.create_all(bind=engine)

# Include task routes
app.include_router(tasks.router)
