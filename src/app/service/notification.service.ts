import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from './Const';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = CONFIG.BASE_URL + 'api/user';

  constructor(private http: HttpClient) { }

  // Get all notes
  getNoteList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getNoteList`);
  }

  // Get specific note info (now also returns RemainderTypeList)
  getNoteInfo(noteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getNoteInfo/`+noteId );
  }

  // Delete specific note (should use DELETE method, but using GET as per API)
  deleteNoteInfo(noteId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/deleteNoteInfo/` + noteId);
  }

  // Save (insert/update) note info
  saveNoteInfo(note: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveNoteInfo`, note);
  }
}
