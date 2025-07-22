import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from './Const';

@Injectable({
  providedIn: 'root'
})
export class SharedFolderService {
  private baseUrl = CONFIG.BASE_URL;

  constructor(private http: HttpClient) {}

  getSharedFolderInfo(folderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}api/Login/GetSharedFolderInfo?folderId=${folderId}`);
  }

  validateSharedFolderInfo(folderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}api/Login/ValidateSharedFolderInfo`, folderData);
  }

  getSharedFolderFilesInfo(folderData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}api/Login/GetSharedFolderFilesInfo`, folderData);
  }
}
