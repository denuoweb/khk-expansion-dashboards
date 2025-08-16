"""Pydantic models for Google Drive operations."""

from typing import Any, List, Optional
from pydantic import BaseModel, Field


class ConfigBase:
    """Shared configuration for schemas."""

    populate_by_name = True
    from_attributes = True


class DriveFile(BaseModel):
    """Represents a file stored in Google Drive."""

    id: str
    name: str
    mime_type: str = Field(..., alias="mimeType")
    size: str
    modified_time: str = Field(..., alias="modifiedTime")
    web_view_link: str = Field(..., alias="webViewLink")
    web_content_link: str = Field(..., alias="webContentLink")
    parents: List[str] = []
    shared: bool = False
    permissions: List[Any] = []

    class Config(ConfigBase):
        pass


class DriveFolder(BaseModel):
    """Represents a folder in Google Drive."""

    id: str
    name: str
    files: List[DriveFile] = []
    subfolders: List["DriveFolder"] = []
    parent_id: Optional[str] = Field(None, alias="parentId")

    class Config(ConfigBase):
        pass


class FileShareRequest(BaseModel):
    """Request body for sharing a file."""

    email: str
    role: str = "reader"


class FolderCreateRequest(BaseModel):
    """Request body for creating a folder."""

    name: str
    parent_id: Optional[str] = Field(None, alias="parentId")

    class Config(ConfigBase):
        pass
