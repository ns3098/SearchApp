from re import L, T
from typing import Optional
from fastapi import APIRouter, HTTPException
from app.core.constants import ASSEMBLY_TO_COLLECTION_MAP, ASSEMBLY_TO_COLLECTION_FACTORY, FIELDS
from mongoengine import Q

router = APIRouter(tags=["Home"])


@router.get("/fetch_epic_details/")
async def home(assembly: str, text: str, page: Optional[int] = 1, page_size: Optional[int] = 10):
    """Home endpoint."""
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_id__startswith=text)
    skip_value = (page - 1) * page_size
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).exclude("id").skip(skip_value).limit(page_size).as_pymongo().batch_size(10000).values_list(*FIELDS)
    return {"data": list(voter_info)}


@router.get("/fetch_name_details/")
async def home(assembly: str, text: str, page: Optional[int] = 1, page_size: Optional[int] = 10):
    """Home endpoint."""
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_name_eng__startswith=text)
    skip_value = (page - 1) * page_size
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).exclude("id").skip(skip_value).limit(page_size).as_pymongo().batch_size(10000).values_list(*FIELDS)
    return {"data": list(voter_info)}



@router.get("/get_assembly")
async def get_all_assembly():
    keys = list(ASSEMBLY_TO_COLLECTION_MAP.keys())
    return {"data": sorted(keys)}

