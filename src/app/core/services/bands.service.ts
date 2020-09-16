import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Banda } from './../../core/models/banda.model'
import { API_URL } from './../api'

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  constructor(
    private http: HttpClient
  ) { }

  findAllBands(): Observable<HttpResponse<Banda[]>> {
    return this.http.get<Banda[]>(`${API_URL}/banda/listarTodas`, { observe: 'response' })
  }

  createNewBand(body: Banda): Observable<HttpResponse<Banda>>{
    return this.http.post<Banda>(`${API_URL}/banda/criar`, body, {observe: 'response'})
  } 
}
