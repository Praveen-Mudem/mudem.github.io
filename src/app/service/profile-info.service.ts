import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CONFIG from './Const';

@Injectable({
	providedIn: 'root'
})
export class ProfileInfoService {
	readonly baseUrl = CONFIG.BASE_URL+'/api/User';

	constructor(private http: HttpClient) {}


	getMyOverviewInfo(): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/getMyOverviewInfo`);
	}

	getApplicationTokenInfo(): Observable<{ ResultInfo: { Result: string } }> {
		return this.http.get<{ ResultInfo: { Result: string } }>(`${this.baseUrl}/getApplicationTokenInfo`);
	}

    

	generateNewToken(payload:{ Key: string }) {
		return this.http.post(`${this.baseUrl}/generateNewToken`, payload);
	}

	getFileCopyTokenInfo(): Observable<any> {
		return this.http.get<any>(`${this.baseUrl}/getFileCopyTokenInfo`);
	}
}
