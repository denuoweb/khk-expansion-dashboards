"""Task management endpoints.

The routes defined here allow clients to create, list, update and delete
``Task`` records. All operations use asynchronous database sessions and return
Pydantic response models for serialization.
"""

from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..db import AsyncSessionLocal
from ..models.task import Task
from ..schemas.task import TaskCreate, TaskResponse, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])


async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session


@router.get("/", response_model=List[TaskResponse])
async def list_tasks(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Task))
    tasks = result.scalars().all()
    return tasks


@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate, db: AsyncSession = Depends(get_db)):
    db_task = Task(**task.dict(by_alias=False))
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int, task_update: TaskUpdate, db: AsyncSession = Depends(get_db)
):
    task = await db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    for field, value in task_update.dict(exclude_unset=True, by_alias=False).items():
        setattr(task, field, value)
    await db.commit()
    await db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: int, db: AsyncSession = Depends(get_db)):
    task = await db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    await db.delete(task)
    await db.commit()
    return None
