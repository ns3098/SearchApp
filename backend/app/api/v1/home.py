from fastapi import APIRouter, Request

# from app.models.items import Items

router = APIRouter(tags=["Home"])


@router.get("/")
async def home():
    """Home endpoint."""
    return {"Hello": "World!"}


@router.post("/")
async def post_method(request: Request):
    return {'data': request.method}
