import { Task } from '../types/Task';

class TaskService {
  private baseUrl: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
  private authToken: string | null = null;

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  async list(): Promise<Task[]> {
    const res = await fetch(`${this.baseUrl}/tasks/`, {
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return res.json();
  }

  async create(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const res = await fetch(`${this.baseUrl}/tasks/`, {
      method: 'POST',
      headers: this.buildHeaders(),
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
      headers: this.buildHeaders(),
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      throw new Error('Failed to update task');
    }
    return res.json();
  }

  async delete(id: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to delete task');
    }
  }
}

export const taskService = new TaskService();
