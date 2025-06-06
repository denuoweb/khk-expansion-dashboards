import { Task } from '../types/Task';

class TaskService {
  private baseUrl: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

  async list(): Promise<Task[]> {
    const res = await fetch(`${this.baseUrl}/tasks/`);
    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return res.json();
  }

  async create(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const res = await fetch(`${this.baseUrl}/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error('Failed to create task');
    }
    return res.json();
  }

  async update(id: string, task: Partial<Omit<Task, 'id' | 'createdAt' | 'createdBy'>>): Promise<Task> {
    const res = await fetch(`${this.baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error('Failed to update task');
    }
    return res.json();
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/tasks/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error('Failed to delete task');
    }
  }
}

export const taskService = new TaskService();
