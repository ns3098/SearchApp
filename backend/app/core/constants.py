from enum import Enum

from app.core.utils import get_env
from app.core.mongo_models import VoterInfoThane, VoterInfoBhiwandi, VoterInfoKalyan


BATCH_SIZE = 1000
MONGO_URI = f"mongodb+srv://{get_env('MONGO_USERNAME')}:{get_env('MONGO_PASSWORD')}@cluster0.zqi1dga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = get_env("MONGO_DATABASE")


ASSEMBLY_TO_COLLECTION_MAP = {
    "Bhiwandi": "Voter_List_Bhiwandi",
    "Thane": "Voter_List_Thane",
    "Kalyan": "Voter_List_Kalyan"
}

ASSEMBLY_TO_COLLECTION_FACTORY = {
    "Voter_List_Bhiwandi": VoterInfoBhiwandi,
    "Voter_List_Thane": VoterInfoThane,
    "Voter_List_Kalyan": VoterInfoKalyan
}


FIELDS = ['voter_id', 'voter_name_eng', 'voter_name_hin', 'relative_name_eng', 'relative_name_hin', 'assembly_constituency', 'booth_number', 'polling_station_eng', 'polling_station_hin', 'serial_number']
FRONTEND_FIELDS = []

HEADERS = {
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'POST, GET, DELETE, OPTIONS',
        "Access-Control-Allow-Headers": 'Authorization, Content-Type'
    }
