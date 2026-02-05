import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.apiUrl;

  getChannel(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/api/v1/secrets/channel_id`, 
      { headers: 
        { 
          'Authorization': 'Bearer s3cure_cpanel_consumer_token',
        } 
      });
  }

  getData(): Observable<Response> {
    return this.http.get<Response>(`${this.baseUrl}/api/v1/secrets/api_key`,
      {
        headers:
        {
          'Authorization': 'Bearer s3cure_cpanel_consumer_token'
        }
      });
  }
}
