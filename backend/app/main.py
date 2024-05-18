from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import router
from app.core.config import settings


def create_application() -> FastAPI:
    """Wrapper function to create a FastAPI application.

    Returns:
        FastAPI: Newly created FastAPI application.
    """

    application = FastAPI(title=settings.PROJECT_NAME)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(router)
    return application


app = create_application()
