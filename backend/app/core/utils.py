import os
from dotenv import load_dotenv

load_dotenv()
print("ENV loaded")

def get_env(variable):
    env_value = os.getenv(variable)
    print(variable, 'op', env_value)
    return env_value
