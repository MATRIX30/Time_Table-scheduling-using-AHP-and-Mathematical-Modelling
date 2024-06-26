import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private apiUrl = ''; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getTimetables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
}
}
