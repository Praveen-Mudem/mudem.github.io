import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from './Const';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  getFolderById(folderId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getFolderById/${folderId}`);
  }
  private baseUrl = CONFIG.BASE_URL + 'api/Document';

  constructor(private http: HttpClient) {}

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
    return this.http.post(`${this.baseUrl}/saveFolderInfo`, data);
  }
}
