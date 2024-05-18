import os
from typing import List, Union

from dotenv import load_dotenv
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

load_dotenv(".env")


class Settings(BaseSettings):
    PROJECT_NAME: str = os.environ.get('PROJECT_NAME')
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)


settings = Settings()
