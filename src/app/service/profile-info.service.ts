import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProfileInfoService {
	private baseUrl = '/api/User';

	constructor(private http: HttpClient) {}


	getMyOverviewInfo(): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/getMyOverviewInfo`);
	}

	getApplicationTokenInfo(): Observable<{ ResultInfo: { Result: string } }> {
		return this.http.get<{ ResultInfo: { Result: string } }>(`${this.baseUrl}/getApplicationTokenInfo`);
	}

    

	generateNewToken(): Observable<{ Value: string, Result: string  }> {
		return this.http.post<{ Value: string, Result: string }>(`${this.baseUrl}/generateNewToken`, {});
	}
}
