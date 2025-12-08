import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from './Const';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private baseUrl = CONFIG.BASE_URL + 'api/Document';

  constructor(private http: HttpClient) {}
  
  getFolderById(folderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFolderById/${folderId}`);
  }

  getAllFolderList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllFolderList`);
  }

  deleteFolderInfo(folderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/deleteFolderInfo/${folderId}`);
  }

  removeFolderShareInfo(folderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/removeFolderShareInfo/${folderId}`);
  }

  shareFolderInfo(data: { FolderId: number, Name: string, Description: string, Password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/shareFolderInfo`, data);
  }

  saveFolderInfo(data: { FolderId: number, Name: string, Description: string }): Observable<any> {
    const headers: any = { 'folderId': data.FolderId.toString() };
    return this.http.post(`${this.baseUrl}/saveFolderInfo`, data, { headers });
  }

  // Document APIs
  getDocuments(folderId: number) {
    // Pass folderId in header for backend compatibility
    // const headers: any = { 'folderId': folderId.toString() };
    // debugger;
    return this.http.get(`${this.baseUrl}/getDocuments/${folderId}`);
  }

  uploadDocuments(profileId: number, folderId: number, files: File[]) {
    const formData = new FormData();
    // Attach files as 'fileList' for backend compatibility
    if (files && files.length > 0) {
      files.forEach(file => formData.append('fileList', file));
    }
    // Pass profileId and folderId in header as required by API
    const headers: any = { 'profileId': profileId.toString(), 'folderId': folderId.toString() };
    return this.http.post(`${this.baseUrl}/uploadDocuments`, formData, { headers });
  }
  
  sharedUploadDocuments(folderInfo: any, fileList: File[]) {
    const formData = new FormData();
    // Attach files as 'fileList' for backend compatibility
    if (fileList && fileList.length > 0) {
      fileList.forEach(file => formData.append('fileList', file));
    }
    // Attach folderInfo as JSON string
    formData.append('folderStrInfo', JSON.stringify(folderInfo));
    
    return this.http.post(`${CONFIG.BASE_URL}api/login/uploadDocuments`, formData);
  }

  deleteDocument(document: { DocumentId: number, FileName: string, FileType: string }) {
    return this.http.post(`${this.baseUrl}/deleteDocument`, document);
  }

  // Chunked upload for large files (>50MB)
  uploadDocumentInChunks(file: File, folderId: number, onProgress?: (progress: number) => void): Promise<void> {
    const chunkSize = 1 * 1024 * 1024; // 1MB per chunk
    const totalChunks = Math.ceil(file.size / chunkSize);
    const uploadChunk = (part: number): Promise<void> => {
      const start = (part - 1) * chunkSize;
      const end = Math.min(file.size, start + chunkSize);
      const chunk = file.slice(start, end);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContentString = (reader.result as string).split(',')[1] || '';
          const payload = {
            FileInfo: {
              FilePath: file.name,
              FileType: file.type,
              FileContentString: fileContentString,
              FileHeader: '',
              Part: part,
              IsLastPart: part === totalChunks,
              folderId: folderId
            },
            IsSaved: false,
            ErrorMessage: ''
          };
          this.http.post(`${this.baseUrl}/uploadChunckFileInfo`, payload, { headers: { 'X-No-Loader': 'true' } })
            .subscribe({
              next: () => {
                if (onProgress) onProgress(Math.round((part / totalChunks) * 100));
                if (part < totalChunks) {
                  uploadChunk(part + 1).then(resolve).catch(reject);
                } else {
                  resolve();
                }
              },
              error: reject
            });
        };
        reader.readAsDataURL(chunk);
      });
    };
    return uploadChunk(1);
  }
}
