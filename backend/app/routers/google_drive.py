"""Endpoints simulating Google Drive operations.

These routes provide a stub implementation that mimics a subset of the
Google Drive API used by the frontend. Data is stored in-memory and is reset
whenever the application restarts. The goal is to provide a backend shape
compatible with the React services.
"""

from datetime import datetime
from typing import Dict, List
from uuid import uuid4

from fastapi import APIRouter, File, Form, HTTPException, UploadFile

from ..schemas.google_drive import (
    DriveFile,
    DriveFolder,
    FileShareRequest,
    FolderCreateRequest,
)

router = APIRouter(prefix="/drive", tags=["drive"])


# In-memory storage for files and folders
files: Dict[str, DriveFile] = {}
folders: Dict[str, DriveFolder] = {
    "recruitment_folder": DriveFolder(id="recruitment_folder", name="Recruitment"),
    "marketing_folder": DriveFolder(id="marketing_folder", name="Marketing"),
    "compliance_folder": DriveFolder(id="compliance_folder", name="Compliance"),
}

# Populate with a few demo files
for sample in [
    {
        "id": "file_1",
        "name": "University Contact Database.xlsx",
        "mimeType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "size": "45632",
        "modifiedTime": "2024-01-08T10:30:00Z",
        "webViewLink": "https://drive.google.com/file/d/demo_1/view",
        "webContentLink": "https://drive.google.com/uc?id=demo_1",
        "parents": ["recruitment_folder"],
        "shared": True,
        "permissions": [],
    },
    {
        "id": "file_2",
        "name": "Q1 Marketing Templates.zip",
        "mimeType": "application/zip",
        "size": "2048576",
        "modifiedTime": "2024-01-07T14:15:00Z",
        "webViewLink": "https://drive.google.com/file/d/demo_2/view",
        "webContentLink": "https://drive.google.com/uc?id=demo_2",
        "parents": ["marketing_folder"],
        "shared": True,
        "permissions": [],
    },
    {
        "id": "file_3",
        "name": "Risk Assessment Template.docx",
        "mimeType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "size": "87432",
        "modifiedTime": "2024-01-06T09:45:00Z",
        "webViewLink": "https://drive.google.com/file/d/demo_3/view",
        "webContentLink": "https://drive.google.com/uc?id=demo_3",
        "parents": ["compliance_folder"],
        "shared": False,
        "permissions": [],
    },
]:
    drive_file = DriveFile(**sample)
    files[sample["id"]] = drive_file
    for parent_id in drive_file.parents:
        parent = folders.get(parent_id)
        if parent:
            parent.files.append(drive_file)


def _generate_id(prefix: str) -> str:
    """Generate a pseudo-random identifier."""

    return f"{prefix}_{uuid4().hex}"


@router.get("/files", response_model=List[DriveFile])
async def list_files(folder_id: str | None = None) -> List[DriveFile]:
    """Return files optionally filtered by their parent folder."""

    if folder_id:
        return [f for f in files.values() if folder_id in f.parents]
    return list(files.values())


@router.get("/folders", response_model=List[DriveFolder])
async def list_folders(parent_id: str | None = None) -> List[DriveFolder]:
    """List folders optionally filtered by parent."""

    if parent_id:
        return [f for f in folders.values() if f.parent_id == parent_id]
    return [f for f in folders.values() if f.parent_id is None]


@router.post("/folders", response_model=DriveFolder)
async def create_folder(data: FolderCreateRequest) -> DriveFolder:
    """Create a new folder."""

    folder_id = _generate_id("folder")
    folder = DriveFolder(
        id=folder_id,
        name=data.name,
        files=[],
        subfolders=[],
        parent_id=data.parent_id,
    )
    folders[folder_id] = folder
    if data.parent_id and data.parent_id in folders:
        folders[data.parent_id].subfolders.append(folder)
    return folder


@router.post("/files", response_model=DriveFile)
async def upload_file(
    file: UploadFile = File(...), folder_id: str | None = Form(None)
) -> DriveFile:
    """Simulate uploading a file to Google Drive."""

    file_id = _generate_id("file")
    now = datetime.utcnow().isoformat() + "Z"
    content = await file.read()
    drive_file = DriveFile(
        id=file_id,
        name=file.filename,
        mimeType=file.content_type or "application/octet-stream",
        size=str(len(content)),
        modifiedTime=now,
        webViewLink=f"https://drive.google.com/file/d/{file_id}/view",
        webContentLink=f"https://drive.google.com/uc?id={file_id}",
        parents=[folder_id] if folder_id else [],
        shared=False,
        permissions=[],
    )
    files[file_id] = drive_file
    if folder_id and folder_id in folders:
        folders[folder_id].files.append(drive_file)
    return drive_file


@router.post("/files/{file_id}/share")
async def share_file(file_id: str, data: FileShareRequest) -> Dict[str, str]:
    """Pretend to share a file with another user."""

    if file_id not in files:
        raise HTTPException(status_code=404, detail="File not found")
    # Sharing logic would go here
    return {"status": f"shared with {data.email}"}


@router.delete("/files/{file_id}", status_code=204)
async def delete_file(file_id: str) -> None:
    """Delete a file from the in-memory store."""

    if file_id not in files:
        raise HTTPException(status_code=404, detail="File not found")
    drive_file = files.pop(file_id)
    for parent_id in drive_file.parents:
        folder = folders.get(parent_id)
        if folder:
            folder.files = [f for f in folder.files if f.id != file_id]
    return None


@router.get("/search", response_model=List[DriveFile])
async def search_files(q: str) -> List[DriveFile]:
    """Search for files by name."""

    query = q.lower()
    return [f for f in files.values() if query in f.name.lower()]
