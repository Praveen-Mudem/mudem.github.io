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
  

  deleteDocument(document: { DocumentId: number, FileName: string, FileType: string }) {
    return this.http.post(`${this.baseUrl}/deleteDocument`, document);
  }
}
