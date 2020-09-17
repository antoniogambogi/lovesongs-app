import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Musica } from './../models/musica.model'
import { API_URL } from './../api'

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  constructor(private http: HttpClient) { }

  findAllSongs(): Observable<HttpResponse<Musica[]>> {
    return this.http.get<Musica[]>(`${API_URL}/musica/listarTodas`, { observe: 'response' })
  }

  findSongByName(songName: String): Observable<HttpResponse<Musica>> {
    return this.http.get<Musica>(`${API_URL}/musica/listarUma/${songName}`, { observe: 'response' })
  }

  createNewSong(body: Musica): Observable<HttpResponse<Musica>>{
    return this.http.post<Musica>(`${API_URL}/musica/criar`, body, {observe: 'response'})
  }
}
