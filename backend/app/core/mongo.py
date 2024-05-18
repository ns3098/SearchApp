from pymongo.mongo_client import MongoClient
from pymongo.errors import ConnectionFailure

from app.main import app


class Mongo:
    def __init__(self):
        """
        Initialize the Mongo utility class.
        
        :param connection_string: MongoDB connection string. If None, environment variables are used.
        :param db_name: Name of the database to connect to.
        """
        self.client = app.mongodb_client
        self.db = app.mongodb

    def list_collections(self):
        """
        List all collections in the database.
        
        :return: List of collection names.
        """
        return self.db.list_collection_names()

    def fetch_all(self, collection_name, query={}, projection=None):
        """
        Fetch all documents from a specific collection that match the query.
        
        :param collection_name: Name of the collection to fetch data from.
        :param query: MongoDB query to filter documents.
        :param projection: MongoDB projection to specify which fields to return.
        :return: List of documents.
        """
        collection = self.db[collection_name]
        return list(collection.find(query, projection))

    def fetch_one(self, collection_name, query={}, projection=None):
        """
        Fetch a single document from a specific collection that matches the query.
        
        :param collection_name: Name of the collection to fetch data from.
        :param query: MongoDB query to filter documents.
        :param projection: MongoDB projection to specify which fields to return.
        :return: Single document or None if no document matches the query.
        """
        collection = self.db[collection_name]
        return collection.find_one(query, projection)

    def ping(self):
        """
        Ping the database to ensure the connection is alive.
        
        :return: True if the connection is alive, False otherwise.
        """
        try:
            # The ping command is used to test the connection
            self.client.admin.command('ping')
            print("Connection to MongoDB is successful.")
            return True
        except ConnectionFailure:
            print("Connection to MongoDB failed.")
            return False
