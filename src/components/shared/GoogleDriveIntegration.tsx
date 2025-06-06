import React, { useState, useEffect } from 'react';
import { Upload, Download, Share2, Trash2, Eye, FolderPlus, Search, ExternalLink, FileText, Image, Video, Archive } from 'lucide-react';
import { googleDriveService, GoogleDriveFile } from '../../services/googleDriveService';
import { useAppContext } from '../../contexts/AppContext';

interface GoogleDriveIntegrationProps {
  folderId?: string;
  allowUpload?: boolean;
  allowDelete?: boolean;
  fileTypes?: string[];
  title?: string;
}

const GoogleDriveIntegration: React.FC<GoogleDriveIntegrationProps> = ({
  folderId,
  allowUpload = true,
  allowDelete = false,
  fileTypes,
  title = 'Documents'
}) => {
  const [files, setFiles] = useState<GoogleDriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const { addNotification } = useAppContext();

  useEffect(() => {
    loadFiles();
  }, [folderId]);

  const loadFiles = async () => {
    setIsLoading(true);
    try {
      if (!googleDriveService.isConnected()) {
        await googleDriveService.initialize();
      }
      
      const driveFiles = await googleDriveService.getFiles(folderId);
      let filteredFiles = driveFiles;
      
      if (fileTypes && fileTypes.length > 0) {
        filteredFiles = driveFiles.filter(file => 
          fileTypes.some(type => file.mimeType.includes(type))
        );
      }
      
      setFiles(filteredFiles);
    } catch (error) {
      console.error('Failed to load files:', error);
      addNotification({
        title: 'Error Loading Files',
        message: 'Failed to load files from Google Drive',
        type: 'error',
        priority: 'medium',
        category: 'system'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = event.target.files;
    if (!uploadFiles || uploadFiles.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of Array.from(uploadFiles)) {
        await googleDriveService.uploadFile(file, folderId);
      }
      
      addNotification({
        title: 'Files Uploaded',
        message: `Successfully uploaded ${uploadFiles.length} file(s) to Google Drive`,
        type: 'success',
        priority: 'medium',
        category: 'system'
      });
      
      await loadFiles();
    } catch (error) {
      console.error('Upload failed:', error);
      addNotification({
        title: 'Upload Failed',
        message: 'Failed to upload files to Google Drive',
        type: 'error',
        priority: 'medium',
        category: 'system'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleShare = async (fileId: string) => {
    try {
      // In a real app, this would open a sharing dialog
      await googleDriveService.shareFile(fileId, 'team@khk.org', 'writer');
      addNotification({
        title: 'File Shared',
        message: 'File has been shared with the team',
        type: 'success',
        priority: 'low',
        category: 'system'
      });
    } catch (error) {
      addNotification({
        title: 'Sharing Failed',
        message: 'Failed to share the file',
        type: 'error',
        priority: 'medium',
        category: 'system'
      });
    }
  };

  const handleDelete = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    
    try {
      await googleDriveService.deleteFile(fileId);
      addNotification({
        title: 'File Deleted',
        message: 'File has been moved to trash',
        type: 'info',
        priority: 'low',
        category: 'system'
      });
      await loadFiles();
    } catch (error) {
      addNotification({
        title: 'Delete Failed',
        message: 'Failed to delete the file',
        type: 'error',
        priority: 'medium',
        category: 'system'
      });
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return <Image className="h-4 w-4 text-blue-500" />;
    if (mimeType.includes('video')) return <Video className="h-4 w-4 text-purple-500" />;
    if (mimeType.includes('zip') || mimeType.includes('archive')) return <Archive className="h-4 w-4 text-yellow-500" />;
    return <FileText className="h-4 w-4 text-gray-500" />;
  };

  const formatFileSize = (bytes: string) => {
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            {allowUpload && (
              <label className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer text-sm touch-manipulation">
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
            <button
              onClick={loadFiles}
              disabled={isLoading}
              className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm touch-manipulation"
            >
              <Download className="h-4 w-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
        
        <div className="mt-3">
          <div className="relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading files...</p>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No files found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {getFileIcon(file.mimeType)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{new Date(file.modifiedTime).toLocaleDateString()}</span>
                      {file.shared && <span className="text-blue-600">Shared</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => window.open(file.webViewLink, '_blank')}
                    className="p-2 text-gray-400 hover:text-blue-600 rounded touch-manipulation"
                    title="View in Google Drive"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => window.open(file.webContentLink, '_blank')}
                    className="p-2 text-gray-400 hover:text-green-600 rounded touch-manipulation"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleShare(file.id)}
                    className="p-2 text-gray-400 hover:text-purple-600 rounded touch-manipulation"
                    title="Share"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => window.open(file.webViewLink, '_blank')}
                    className="p-2 text-gray-400 hover:text-blue-600 rounded touch-manipulation"
                    title="Open in new tab"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  {allowDelete && (
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded touch-manipulation"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleDriveIntegration;