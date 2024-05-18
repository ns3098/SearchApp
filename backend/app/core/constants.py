from app.core.utils import get_env


MONGO_URI = f"mongodb+srv://{get_env('MONGO_USERNAME')}:{get_env('MONGO_PASSWORD')}@cluster0.zqi1dga.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = get_env("MONGO_DATABASE")