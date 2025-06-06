export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  permissions: string[];
  avatar?: string;
}

export interface UserSession {
  user: User;
  token: string;
  expiresAt: string;
}