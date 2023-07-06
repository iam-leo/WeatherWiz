import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  apiKey = environment.API_KEY
  
  constructor(private http: HttpClient) { }

  getClima(ciudad: string): Observable<any>{
    const URL = environment.URL_BASE + `q=${ciudad}&appid=${this.apiKey}&lang=es`
    
    return this.http.get(URL)
  }
}
