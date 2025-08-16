interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
  modifiedTime: string;
  webViewLink: string;
  webContentLink: string;
  parents: string[];
  shared: boolean;
  permissions: unknown[];
}

interface GoogleDriveFolder {
  id: string;
  name: string;
  files: GoogleDriveFile[];
  subfolders: GoogleDriveFolder[];
  parentId?: string;
}

class GoogleDriveService {
  private baseUrl: string = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
  private isInitialized = false;
  private accessToken: string | null = null;
  private authToken: string | null = null;

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  private buildHeaders(extra: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = { ...extra };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  async initialize(): Promise<boolean> {
    try {
      // In a real implementation, this would handle Google OAuth
      // For demo purposes, we'll simulate the connection
      this.isInitialized = true;
      this.accessToken = 'demo_access_token';
      return true;
    } catch (error) {
      console.error('Failed to initialize Google Drive:', error);
      return false;
    }
  }

  async createFolder(name: string, parentId?: string): Promise<GoogleDriveFolder> {
    const res = await fetch(`${this.baseUrl}/drive/folders`, {
      method: 'POST',
      headers: this.buildHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ name, parentId }),
    });
    if (!res.ok) {
      throw new Error('Failed to create folder');
    }
    return res.json();
  }

  async uploadFile(file: File, folderId?: string): Promise<GoogleDriveFile> {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) {
      formData.append('folder_id', folderId);
    }

    const res = await fetch(`${this.baseUrl}/drive/files`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: formData,
    });
    if (!res.ok) {
      throw new Error('Failed to upload file');
    }
    return res.json();
  }

  async getFiles(folderId?: string): Promise<GoogleDriveFile[]> {
    const url = new URL(`${this.baseUrl}/drive/files`);
    if (folderId) {
      url.searchParams.set('folder_id', folderId);
    }
    const res = await fetch(url.toString(), {
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch files');
    }
    return res.json();
  }

  async getFolders(parentId?: string): Promise<GoogleDriveFolder[]> {
    const url = new URL(`${this.baseUrl}/drive/folders`);
    if (parentId) {
      url.searchParams.set('parent_id', parentId);
    }
    const res = await fetch(url.toString(), {
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to fetch folders');
    }
    return res.json();
  }

  async shareFile(
    fileId: string,
    email: string,
    role: 'reader' | 'writer' | 'commenter' = 'reader',
  ): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/drive/files/${fileId}/share`, {
      method: 'POST',
      headers: this.buildHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ email, role }),
    });
    return res.ok;
  }

  async deleteFile(fileId: string): Promise<boolean> {
    const res = await fetch(`${this.baseUrl}/drive/files/${fileId}`, {
      method: 'DELETE',
      headers: this.buildHeaders(),
    });
    return res.ok;
  }

  async searchFiles(query: string): Promise<GoogleDriveFile[]> {
    const url = new URL(`${this.baseUrl}/drive/search`);
    url.searchParams.set('q', query);
    const res = await fetch(url.toString(), {
      headers: this.buildHeaders(),
    });
    if (!res.ok) {
      throw new Error('Failed to search files');
    }
    return res.json();
  }

  getFilePreviewUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  isConnected(): boolean {
    return this.isInitialized && this.accessToken !== null;
  }
}

export const googleDriveService = new GoogleDriveService();
export type { GoogleDriveFile, GoogleDriveFolder };

