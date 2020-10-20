import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
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

  createNewBand(body: Banda): Observable<HttpResponse<Banda>> {
    return this.http.post<Banda>(`${API_URL}/banda/criar`, body, { observe: 'response' })
  }

  validatorUniqueBandName(bandName: string) {
    let myParams = new HttpParams()
    myParams = myParams.append('nome', bandName)
    return this.http.get<any>(`${API_URL}/banda/validarNomeBanda`, { params: myParams })
  }

  findBandByName(bandName: String): Observable<HttpResponse<Banda>> {
    return this.http.get<Banda>(`${API_URL}/banda/listarUma/${bandName}`, { observe: 'response' })
  }

  updateBandById(bandId: String, body: Banda): Observable<HttpResponse<Banda>> {
    return this.http.put<Banda>(`${API_URL}/banda/atualizar/${bandId}`, body, { observe: 'response' })

  }

  deleteBandById(bandId: String): Observable<HttpResponse<Banda>> {
    return this.http.get<Banda>(`${API_URL}/banda/apagar/${bandId}`, { observe: 'response' })
  }
}
