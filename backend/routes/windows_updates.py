from fastapi import APIRouter, HTTPException, BackgroundTasks
from typing import Optional, List
from datetime import datetime
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.windows_update import WindowsUpdate, WindowsUpdateResponse
from services.database import db_service
from services.rss_fetcher import rss_fetcher

router = APIRouter(prefix="/api/windows", tags=["Windows Updates"])

@router.get("/updates", response_model=WindowsUpdateResponse)
async def get_windows_updates(
    category: Optional[str] = None,
    limit: int = 50,
    version: Optional[str] = None
):
    """Récupère les mises à jour Windows stockées"""
    try:
        updates_data = db_service.get_windows_updates(category=category, limit=limit)
        
        # Filtrer par version si spécifié
        if version:
            updates_data = [u for u in updates_data if u.get("version") and version.lower() in u["version"].lower()]
        
        # Convertir en modèles Pydantic
        updates = []
        for update_data in updates_data:
            try:
                update = WindowsUpdate(**update_data)
                updates.append(update)
            except Exception as e:
                print(f"Erreur conversion update: {e}")
                continue
        
        return WindowsUpdateResponse(
            total=len(updates),
            updates=updates,
            last_updated=datetime.now()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur récupération updates: {str(e)}")

@router.get("/updates/latest")
async def get_latest_updates(limit: int = 10):
    """Récupère les dernières mises à jour"""
    try:
        updates_data = db_service.get_latest_updates(limit=limit)
        
        updates = []
        for update_data in updates_data:
            try:
                update = WindowsUpdate(**update_data)
                updates.append(update)
            except Exception as e:
                continue
                
        return {
            "updates": updates,
            "count": len(updates),
            "timestamp": datetime.now()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur: {str(e)}")

@router.get("/updates/stats")
async def get_updates_stats():
    """Statistiques des mises à jour"""
    try:
        stats = db_service.get_update_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur stats: {str(e)}")

@router.post("/updates/refresh")
async def refresh_updates(background_tasks: BackgroundTasks):
    """Force la mise à jour des flux RSS"""
    try:
        background_tasks.add_task(fetch_and_store_updates)
        return {
            "message": "Mise à jour des flux RSS démarrée en arrière-plan",
            "timestamp": datetime.now()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur refresh: {str(e)}")

@router.get("/updates/categories")
async def get_categories():
    """Liste des catégories disponibles"""
    return {
        "categories": [
            {"key": "security", "name": "Sécurité", "description": "Mises à jour de sécurité et correctifs"},
            {"key": "feature", "name": "Fonctionnalités", "description": "Nouvelles fonctionnalités et améliorations"},
            {"key": "server", "name": "Windows Server", "description": "Spécifique à Windows Server"},
            {"key": "general", "name": "Général", "description": "Mises à jour générales"}
        ]
    }

async def fetch_and_store_updates():
    """Tâche pour récupérer et stocker les mises à jour"""
    try:
        print("🚀 Démarrage récupération RSS...")
        
        # Récupération de tous les flux
        all_updates = rss_fetcher.fetch_all_feeds()
        
        # Stockage en base
        stored_count = 0
        for update_data in all_updates:
            try:
                db_service.save_windows_update(update_data)
                stored_count += 1
            except Exception as e:
                print(f"Erreur stockage update: {e}")
                continue
        
        print(f"✅ {stored_count} mises à jour stockées sur {len(all_updates)} récupérées")
        return {"stored": stored_count, "total": len(all_updates)}
        
    except Exception as e:
        print(f"❌ Erreur tâche RSS: {e}")
        return {"error": str(e)}