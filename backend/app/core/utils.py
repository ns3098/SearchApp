import os
from dotenv import load_dotenv

load_dotenv()
print("ENV loaded")

def get_env(variable):
    env_value = os.getenv(variable)
    return env_value
