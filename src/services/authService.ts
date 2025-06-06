import { User, UserSession } from '../types/User';

class AuthService {
  private baseUrl: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

  private handleResponse = async (res: Response) => {
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Request failed');
    }
    return res.json();
  };

  async login(email: string, password: string): Promise<UserSession> {
    const body = new URLSearchParams({ username: email, password });
    const res = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    });
    const data = await this.handleResponse(res);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    return {
      user: data.user as User,
      token: data.access_token as string,
      expiresAt
    };
  }

  async currentUser(token: string): Promise<User> {
    const res = await fetch(`${this.baseUrl}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return this.handleResponse(res);
  }
}

export const authService = new AuthService();
