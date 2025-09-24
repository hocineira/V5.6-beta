from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from datetime import datetime
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes.windows_updates import router as windows_router
from services.scheduler import scheduler

app = FastAPI(title="Portfolio RSS API", version="1.0.0")

# CORS configuration pour le frontend Next.js  
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes
app.include_router(windows_router)

@app.get("/")
async def root():
    return {"message": "Portfolio RSS API", "status": "running", "timestamp": datetime.now()}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.on_event("startup")
async def startup_event():
    """Démarre le planificateur RSS au démarrage de l'application"""
    print("🚀 Démarrage du service RSS...")
    
    # Effectue une première récupération des données
    from routes.windows_updates import fetch_and_store_updates
    try:
        result = await fetch_and_store_updates()
        print(f"✅ Données initiales chargées : {result}")
    except Exception as e:
        print(f"⚠️  Erreur chargement initial : {e}")
    
    # Démarre le planificateur pour les mises à jour automatiques
    scheduler.start()
    print("✅ Planificateur RSS démarré")

@app.on_event("shutdown")
async def shutdown_event():
    """Arrête le planificateur RSS proprement"""
    print("🛑 Arrêt du planificateur RSS...")
    scheduler.stop()

if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0", 
        port=8001, 
        reload=True
    )