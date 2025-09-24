import schedule
import time
import threading
from datetime import datetime
from .rss_fetcher import rss_fetcher
from .database import db_service

class RSSScheduler:
    def __init__(self):
        self.running = False
        self.thread = None
        
    def setup_schedule(self):
        """Configure les tâches programmées"""
        # Mise à jour quotidienne à 8h00
        schedule.every().day.at("08:00").do(self.daily_update_job)
        
        # Mise à jour toutes les 6 heures pour les mises à jour critiques
        schedule.every(6).hours.do(self.hourly_check_job)
        
        print("📅 Planificateur configuré:")
        print("   - Mise à jour complète : tous les jours à 8h00")
        print("   - Vérification rapide : toutes les 6 heures")
    
    def daily_update_job(self):
        """Tâche quotidienne complète"""
        try:
            print(f"🌅 [{datetime.now().strftime('%H:%M:%S')}] Mise à jour quotidienne démarrée...")
            
            # Récupération de tous les flux
            all_updates = rss_fetcher.fetch_all_feeds()
            
            # Stockage en base
            stored_count = 0
            for update_data in all_updates:
                try:
                    db_service.save_windows_update(update_data)
                    stored_count += 1
                except Exception as e:
                    print(f"⚠️  Erreur stockage: {e}")
                    continue
            
            print(f"✅ Mise à jour quotidienne terminée: {stored_count} éléments traités")
            
        except Exception as e:
            print(f"❌ Erreur mise à jour quotidienne: {e}")
    
    def hourly_check_job(self):
        """Vérification rapide pour les mises à jour critiques"""
        try:
            print(f"🔍 [{datetime.now().strftime('%H:%M:%S')}] Vérification rapide...")
            
            # Récupère seulement les flux de sécurité
            security_updates = rss_fetcher.fetch_feed("microsoft_security")
            
            stored_count = 0
            for update_data in security_updates:
                # Ne traite que les mises à jour critiques récentes
                if update_data.get("severity") == "Critical":
                    try:
                        db_service.save_windows_update(update_data)
                        stored_count += 1
                    except Exception as e:
                        continue
            
            if stored_count > 0:
                print(f"🚨 {stored_count} mises à jour critiques détectées")
            else:
                print("✅ Aucune nouvelle mise à jour critique")
                
        except Exception as e:
            print(f"❌ Erreur vérification: {e}")
    
    def run_scheduler(self):
        """Exécute le planificateur"""
        self.running = True
        print("🚀 Planificateur RSS démarré")
        
        while self.running:
            try:
                schedule.run_pending()
                time.sleep(60)  # Vérifie toutes les minutes
            except Exception as e:
                print(f"❌ Erreur planificateur: {e}")
                time.sleep(300)  # Attend 5 minutes en cas d'erreur
    
    def start(self):
        """Démarre le planificateur en arrière-plan"""
        if not self.running:
            self.setup_schedule()
            self.thread = threading.Thread(target=self.run_scheduler, daemon=True)
            self.thread.start()
            print("✅ Planificateur RSS démarré en arrière-plan")
    
    def stop(self):
        """Arrête le planificateur"""
        self.running = False
        if self.thread:
            self.thread.join(timeout=5)
        print("🛑 Planificateur RSS arrêté")
    
    def manual_update(self):
        """Lance une mise à jour manuelle"""
        print("🔄 Mise à jour manuelle démarrée...")
        self.daily_update_job()

# Instance globale
scheduler = RSSScheduler()