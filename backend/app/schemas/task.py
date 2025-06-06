from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel, Field

from ..models.task import TaskStatus, TaskPriority


class ConfigBase:
    from_attributes = True
    populate_by_name = True

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.TODO
    priority: TaskPriority = TaskPriority.MEDIUM
    assigned_positions: List[str] = Field(default_factory=list, alias="assignedPositions")
    due_date: Optional[date] = Field(None, alias="dueDate")
    tags: List[str] = Field(default_factory=list)

    class Config(ConfigBase):
        pass

class TaskCreate(TaskBase):
    created_by: str = Field(alias="createdBy")

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    priority: Optional[TaskPriority] = None
    assigned_positions: Optional[List[str]] = Field(default=None, alias="assignedPositions")
    due_date: Optional[date] = Field(default=None, alias="dueDate")
    tags: Optional[List[str]] = None

    class Config(ConfigBase):
        pass

class TaskInDB(TaskBase):
    id: int
    created_by: str = Field(alias="createdBy")
    created_at: datetime = Field(alias="createdAt")

    class Config(ConfigBase):
        pass

class TaskResponse(TaskInDB):
    pass
