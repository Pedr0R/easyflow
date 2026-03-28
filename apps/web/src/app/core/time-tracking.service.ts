import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Punch {
  id: string;
  tipo: 'ENTRADA' | 'SAIDA';
  latitude: number;
  longitude: number;
  timestamp: string;
  observacao?: string;
}

@Injectable({ providedIn: 'root' })
export class TimeTrackingService {
  private http = inject(HttpClient);

  getTodayPunches(): Observable<Punch[]> {
    return this.http.get<Punch[]>(`${environment.apiUrl}/pontos/today`);
  }

  punch(tipo: 'ENTRADA' | 'SAIDA', latitude: number, longitude: number, observacao?: string): Observable<Punch> {
    const payload = { tipo, latitude, longitude, observacao };
    return this.http.post<Punch>(`${environment.apiUrl}/pontos`, payload);
  }
}
