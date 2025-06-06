import { UniversityContact } from '../types/UniversityContact';

class ContactService {
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

  async list(): Promise<UniversityContact[]> {
    const res = await fetch(`${this.baseUrl}/contacts/`, {
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch contacts');
    }
    return res.json();
  }

  async create(contact: Omit<UniversityContact, 'id'>): Promise<UniversityContact> {
    const res = await fetch(`${this.baseUrl}/contacts/`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: JSON.stringify(contact),
    });
    if (!res.ok) {
      throw new Error('Failed to create contact');
    }
    return res.json();
  }

  async update(id: string | number, contact: Partial<Omit<UniversityContact, 'id'>>): Promise<UniversityContact> {
    const res = await fetch(`${this.baseUrl}/contacts/${id}`, {
      method: 'PUT',
      headers: this.buildHeaders(),
      body: JSON.stringify(contact),
    });
    if (!res.ok) {
      throw new Error('Failed to update contact');
    }
    return res.json();
  }

  async delete(id: string | number): Promise<void> {
    const res = await fetch(`${this.baseUrl}/contacts/${id}`, {
      method: 'DELETE',
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to delete contact');
    }
  }
}

export const contactService = new ContactService();
