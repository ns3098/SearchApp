from typing import Optional
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from app.core.constants import ASSEMBLY_TO_COLLECTION_MAP, ASSEMBLY_TO_COLLECTION_FACTORY, FIELDS, HEADERS
from mongoengine import Q

router = APIRouter(tags=["Home"])


@router.get("/fetch_epic_details/")
async def home(assembly: str, text: str, page: Optional[int] = 1, page_size: Optional[int] = 10):
    """Home endpoint."""
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_id__istartswith=text)
    skip_value = (page - 1) * page_size
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).exclude("id").skip(skip_value).limit(page_size).as_pymongo().batch_size(10000).values_list(*FIELDS)
    return JSONResponse(content={"data": list(voter_info)}, headers=HEADERS)


@router.get("/fetch_name_details/")
async def home(assembly: str, text: str, page: Optional[int] = 1, page_size: Optional[int] = 10):
    """Home endpoint."""
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_name_eng__istartswith=text)
    skip_value = (page - 1) * page_size
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).exclude("id").skip(skip_value).limit(page_size).as_pymongo().batch_size(10000).values_list(*FIELDS)
    return JSONResponse(content={"data": list(voter_info)}, headers=HEADERS)


@router.get("/fetch_epic_list/")
async def home(assembly: str, text: str, page: Optional[int] = 1, page_size: Optional[int] = 10):
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_id__istartswith=text)
    skip_value = (page - 1) * page_size
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).skip(skip_value).limit(page_size).as_pymongo().batch_size(10000).values_list('voter_id')
    voters_info = [x['Voter ID'] for x in voter_info]
    return JSONResponse(content={"data": voters_info}, headers=HEADERS)


@router.get("/fetch_name_list/")
async def home(assembly: str, text: str, page: Optional[int] = 1, page_size: Optional[int] = 10):
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_name_eng__istartswith=text)
    skip_value = (page - 1) * page_size
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).skip(skip_value).limit(page_size).as_pymongo().batch_size(10000).values_list('voter_name_eng')
    voters_info = [x['Voter Name Eng'] for x in voter_info]
    return JSONResponse(content={"data": voters_info}, headers=HEADERS)


@router.get("/fetch_epic_count/")
async def home(assembly: str, text: str):
    """Home endpoint."""
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_id__istartswith=text)
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).as_pymongo().batch_size(10000)
    count = voter_info.count()
    return JSONResponse(content={"data": count}, headers=HEADERS)


@router.get("/fetch_name_count/")
async def home(assembly: str, text: str):
    """Home endpoint."""
    assembly_collection = ASSEMBLY_TO_COLLECTION_MAP.get(assembly, "")
    if not assembly_collection:
        raise HTTPException(status_code=400, detail=f"Bad Request: Invalid assembly name {assembly}") 
    query = Q(voter_name_eng__istartswith=text)
    voter_info = ASSEMBLY_TO_COLLECTION_FACTORY.get(assembly_collection).objects(query).as_pymongo().batch_size(10000)
    count = voter_info.count()
    return JSONResponse(content={"data": count}, headers=HEADERS)

@router.get("/get_assembly")
async def get_all_assembly():
    keys = list(ASSEMBLY_TO_COLLECTION_MAP.keys())
    return JSONResponse(content={"data": keys}, headers=HEADERS)



