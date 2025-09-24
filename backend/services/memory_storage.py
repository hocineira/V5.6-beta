from datetime import datetime
from typing import List, Dict, Optional
import json
import os

class InMemoryStorage:
    """Service de stockage en mémoire pour les tests"""
    
    def __init__(self):
        self.updates = []
        self.data_file = "/tmp/windows_updates.json"
        self.load_data()
    
    def save_data(self):
        """Sauvegarde les données dans un fichier"""
        try:
            data_to_save = []
            for update in self.updates:
                update_dict = dict(update)
                # Convertir les datetime en string pour JSON
                if isinstance(update_dict.get('published_date'), datetime):
                    update_dict['published_date'] = update_dict['published_date'].isoformat()
                if isinstance(update_dict.get('created_at'), datetime):
                    update_dict['created_at'] = update_dict['created_at'].isoformat()
                if isinstance(update_dict.get('updated_at'), datetime):
                    update_dict['updated_at'] = update_dict['updated_at'].isoformat()
                data_to_save.append(update_dict)
                
            with open(self.data_file, 'w', encoding='utf-8') as f:
                json.dump(data_to_save, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Erreur sauvegarde: {e}")
    
    def load_data(self):
        """Charge les données depuis le fichier"""
        try:
            if os.path.exists(self.data_file):
                with open(self.data_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    
                self.updates = []
                for item in data:
                    # Reconvertir les strings en datetime
                    if isinstance(item.get('published_date'), str):
                        try:
                            item['published_date'] = datetime.fromisoformat(item['published_date'])
                        except:
                            item['published_date'] = datetime.now()
                    if isinstance(item.get('created_at'), str):
                        try:
                            item['created_at'] = datetime.fromisoformat(item['created_at'])
                        except:
                            item['created_at'] = datetime.now()
                    if isinstance(item.get('updated_at'), str):
                        try:
                            item['updated_at'] = datetime.fromisoformat(item['updated_at'])
                        except:
                            item['updated_at'] = datetime.now()
                    self.updates.append(item)
                            
                print(f"✅ {len(self.updates)} mises à jour chargées depuis le fichier")
        except Exception as e:
            print(f"Erreur chargement: {e}")
            self.updates = []
    
    def save_windows_update(self, update_data: dict):
        """Sauvegarde une mise à jour Windows"""
        # Vérifie si l'update existe déjà
        existing_index = None
        for i, existing in enumerate(self.updates):
            if (existing.get("title") == update_data.get("title") or 
                existing.get("link") == update_data.get("link")):
                existing_index = i
                break
        
        if existing_index is not None:
            # Mise à jour
            update_data["updated_at"] = datetime.now()
            self.updates[existing_index] = update_data
            update_id = existing_index
        else:
            # Nouveau document
            update_data["id"] = len(self.updates) + 1
            update_data["created_at"] = datetime.now()
            update_data["updated_at"] = datetime.now()
            self.updates.append(update_data)
            update_id = update_data["id"]
        
        self.save_data()
        return update_id
    
    def get_windows_updates(self, 
                           category: Optional[str] = None, 
                           limit: int = 50,
                           sort_by: str = "published_date") -> List[dict]:
        """Récupère les mises à jour Windows"""
        filtered_updates = []
        
        for update in self.updates:
            if category and update.get("category") != category:
                continue
            filtered_updates.append(update)
        
        # Tri par date (plus récent en premier)
        if sort_by == "published_date":
            filtered_updates.sort(key=lambda x: x.get("published_date", datetime.now()), reverse=True)
        
        return filtered_updates[:limit]
    
    def get_latest_updates(self, limit: int = 10) -> List[dict]:
        """Récupère les dernières mises à jour"""
        return self.get_windows_updates(limit=limit, sort_by="published_date")
    
    def get_update_stats(self) -> dict:
        """Statistiques des mises à jour"""
        stats = {}
        
        for update in self.updates:
            category = update.get("category", "unknown")
            stats[category] = stats.get(category, 0) + 1
        
        return {
            "total": len(self.updates),
            "by_category": stats,
            "last_updated": datetime.now()
        }

# Instance globale pour les tests
memory_storage = InMemoryStorage()