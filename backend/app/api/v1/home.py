from fastapi import APIRouter, HTTPException
from app.core.mongo import Mongo
from app.core.constants import ASSEMBLY_TO_COLLECTION_MAP

router = APIRouter(tags=["Home"])


@router.get("/fetch_details/")
async def home(assembly: str, text: str):
    """Home endpoint."""
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    
    return {"Hello": "World!"}



@router.get("/get_assembly")
async def get_all_assembly():
    keys = list(ASSEMBLY_TO_COLLECTION_MAP.keys())
    return {"data": keys}

