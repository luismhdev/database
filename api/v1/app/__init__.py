import os

from bson import ObjectId
from bson.errors import InvalidId
from dotenv import load_dotenv
from flask import Flask
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.environ["MONGO_URI"]

client = MongoClient(MONGO_URI)
db = client.get_default_database()


class BaseModel:
    """CRUD genérico sobre una colección de MongoDB. Cada modelo de
    colección hereda de esta clase e indica su collection_name."""

    collection_name = None

    def __init__(self):
        self.collection = db[self.collection_name]

    def get_all(self):
        return [self._serialize(doc) for doc in self.collection.find()]

    def get_by_id(self, id_str):
        oid = self._to_object_id(id_str)
        if oid is None:
            return None
        doc = self.collection.find_one({"_id": oid})
        return self._serialize(doc) if doc else None

    def create(self, data):
        data = dict(data)
        data.pop("_id", None)
        result = self.collection.insert_one(data)
        return str(result.inserted_id)

    def update(self, id_str, data):
        oid = self._to_object_id(id_str)
        if oid is None:
            return False
        data = dict(data)
        data.pop("_id", None)
        result = self.collection.update_one({"_id": oid}, {"$set": data})
        return result.matched_count > 0

    def delete(self, id_str):
        oid = self._to_object_id(id_str)
        if oid is None:
            return False
        result = self.collection.delete_one({"_id": oid})
        return result.deleted_count > 0

    @staticmethod
    def _to_object_id(id_str):
        try:
            return ObjectId(id_str)
        except (InvalidId, TypeError):
            return None

    @staticmethod
    def _serialize(doc):
        doc["_id"] = str(doc["_id"])
        return doc


def create_app():
    app = Flask(__name__)

    from app.auth import require_token

    app.before_request(require_token)

    from app.index import register_blueprints

    register_blueprints(app)
    return app
