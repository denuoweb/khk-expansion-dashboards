"""CRUD operations for ``UniversityContact`` records.

This router provides endpoints to list, create, update and delete university
contacts stored in the database. Each endpoint relies on an asynchronous SQL
Alchemy session obtained from ``AsyncSessionLocal``.
"""

from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..db import AsyncSessionLocal
from ..models.contact import UniversityContact
from ..schemas.contact import (
    UniversityContactCreate,
    UniversityContactUpdate,
    UniversityContactResponse,
)

router = APIRouter(prefix="/contacts", tags=["contacts"])


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


@router.get("/", response_model=List[UniversityContactResponse])
async def list_contacts(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UniversityContact))
    return result.scalars().all()


@router.post(
    "/", response_model=UniversityContactResponse, status_code=status.HTTP_201_CREATED
)
async def create_contact(
    contact: UniversityContactCreate, db: AsyncSession = Depends(get_db)
):
    db_contact = UniversityContact(**contact.dict(by_alias=False))
    db.add(db_contact)
    await db.commit()
    await db.refresh(db_contact)
    return db_contact


@router.get("/{contact_id}", response_model=UniversityContactResponse)
async def get_contact(contact_id: int, db: AsyncSession = Depends(get_db)):
    contact = await db.get(UniversityContact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact


@router.put("/{contact_id}", response_model=UniversityContactResponse)
async def update_contact(
    contact_id: int,
    contact_update: UniversityContactUpdate,
    db: AsyncSession = Depends(get_db),
):
    contact = await db.get(UniversityContact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    for field, value in contact_update.dict(exclude_unset=True, by_alias=False).items():
        setattr(contact, field, value)
    await db.commit()
    await db.refresh(contact)
    return contact


@router.delete("/{contact_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_contact(contact_id: int, db: AsyncSession = Depends(get_db)):
    contact = await db.get(UniversityContact, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    await db.delete(contact)
    await db.commit()
    return None
