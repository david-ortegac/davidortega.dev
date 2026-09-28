import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../models/Response';
import { ChannelVideo } from '../models/YoutubeSearchItemSnippet';
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

  getTutorials(limit = 12, order: 'oldest' | 'newest' = 'newest'): Observable<ChannelVideo[]> {
    const params = new HttpParams().set('limit', limit).set('order', order);
    return this.http.get<ChannelVideo[]>(`${this.baseUrl}/api/v1/tutorials`, { params });
  }
}
