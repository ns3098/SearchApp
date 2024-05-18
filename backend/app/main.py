from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import settings
from app.core.constants import MONGO_URI, DB_NAME

from contextlib import asynccontextmanager


# define a lifespan method for fastapi
@asynccontextmanager
async def lifespan(app: FastAPI):
    await startup_db_client(app)
    yield
    await shutdown_db_client(app)

# method for start the MongoDb Connection
async def startup_db_client(app):
    app.mongodb_client = AsyncIOMotorClient(MONGO_URI)
    app.mongodb = app.mongodb_client.get_database(DB_NAME)
    print("MongoDB connected.")

# method to close the database connection
async def shutdown_db_client(app):
    app.mongodb_client.close()
    print("Database disconnected.")


def create_application() -> FastAPI:
    """Wrapper function to create a FastAPI application.

    Returns:
        FastAPI: Newly created FastAPI application.
    """

    application = FastAPI(title=settings.PROJECT_NAME, lifespan=lifespan)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return application


app = create_application()

from app.api import router
app.include_router(router)
