from pymongo import MongoClient
from datetime import datetime
from typing import List, Optional
import os
from dotenv import load_dotenv
from .memory_storage import memory_storage

load_dotenv()

class DatabaseService:
    def __init__(self):
        self.mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/portfolio_rss")
        self.db_name = os.getenv("DATABASE_NAME", "portfolio_rss")
        self.client = None
        self.db = None
        self.use_mongo = False
        self.connect()

    def connect(self):
        try:
            self.client = MongoClient(self.mongo_url, serverSelectionTimeoutMS=3000)
            self.db = self.client[self.db_name]
            # Test la connexion
            self.client.admin.command('ping')
            self.use_mongo = True
            print(f"✅ Connexion MongoDB réussie : {self.db_name}")
        except Exception as e:
            print(f"⚠️  MongoDB non disponible, utilisation du stockage en mémoire : {e}")
            self.use_mongo = False
            
    def get_collection(self, collection_name: str):
        return self.db[collection_name]
    
    def save_windows_update(self, update_data: dict):
        if not self.use_mongo:
            return memory_storage.save_windows_update(update_data)
            
        collection = self.get_collection("windows_updates")
        
        # Vérifie si l'update existe déjà (par titre et lien)
        existing = collection.find_one({
            "$or": [
                {"title": update_data["title"]},
                {"link": update_data["link"]}
            ]
        })
        
        if existing:
            # Mise à jour
            update_data["updated_at"] = datetime.now()
            collection.update_one(
                {"_id": existing["_id"]}, 
                {"$set": update_data}
            )
            return existing["_id"]
        else:
            # Nouveau document
            update_data["created_at"] = datetime.now()
            update_data["updated_at"] = datetime.now()
            result = collection.insert_one(update_data)
            return result.inserted_id
    
    def get_windows_updates(self, 
                           category: Optional[str] = None, 
                           limit: int = 50,
                           sort_by: str = "published_date") -> List[dict]:
        if not self.use_mongo:
            return memory_storage.get_windows_updates(category, limit, sort_by)
            
        collection = self.get_collection("windows_updates")
        
        query = {}
        if category:
            query["category"] = category
            
        cursor = collection.find(query).sort(sort_by, -1).limit(limit)
        updates = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])  # Convertir ObjectId en string
            updates.append(doc)
        return updates
    
    def get_latest_updates(self, limit: int = 10) -> List[dict]:
        return self.get_windows_updates(limit=limit, sort_by="published_date")
    
    def get_update_stats(self) -> dict:
        collection = self.get_collection("windows_updates")
        
        pipeline = [
            {
                "$group": {
                    "_id": "$category",
                    "count": {"$sum": 1}
                }
            }
        ]
        
        stats = {}
        for result in collection.aggregate(pipeline):
            stats[result["_id"]] = result["count"]
            
        total = collection.count_documents({})
        
        return {
            "total": total,
            "by_category": stats,
            "last_updated": datetime.now()
        }

# Instance globale
db_service = DatabaseService()