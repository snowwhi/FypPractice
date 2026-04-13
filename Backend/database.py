from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))
db     = client["netflixrag"]
shows  = db["shows"]

def get_show_by_id(show_id: str):
    return shows.find_one({"_id": show_id})
