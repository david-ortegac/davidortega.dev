import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackService {
  private readonly http: HttpClient = inject(HttpClient);

  getChannel(): Observable<Response> {
    return this.http.get<Response>('https://ghasecrets.davidortega.dev/api/v1/secrets/channel_id', 
      { headers: 
        { 
          'Authorization': 'Bearer s3cure_cpanel_consumer_token',
        } 
      });
  }

  getData(): Observable<Response> {
    return this.http.get<Response>('https://ghasecrets.davidortega.dev/api/v1/secrets/api_key',
      {
        headers:
        {
          'Authorization': 'Bearer s3cure_cpanel_consumer_token'
        }
      });
  }
}
