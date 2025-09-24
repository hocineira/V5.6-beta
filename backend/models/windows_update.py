from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel
import uuid

class WindowsUpdate(BaseModel):
    id: str = None
    title: str
    description: str
    link: str
    published_date: datetime
    category: str  # "security", "feature", "server", "general"
    version: Optional[str] = None  # "Windows 11", "Windows Server 2025", etc.
    kb_number: Optional[str] = None
    severity: Optional[str] = None  # "Critical", "Important", "Moderate", "Low"
    tags: List[str] = []
    source: str  # "microsoft-blog", "msrc", "windows-server-blog"
    created_at: datetime = None
    updated_at: datetime = None
    
    def __init__(self, **data):
        if data.get('id') is None:
            data['id'] = str(uuid.uuid4())
        if data.get('created_at') is None:
            data['created_at'] = datetime.now()
        if data.get('updated_at') is None:
            data['updated_at'] = datetime.now()
        super().__init__(**data)

class WindowsUpdateResponse(BaseModel):
    total: int
    updates: List[WindowsUpdate]
    last_updated: datetime