import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
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

  createNewSong(body: Musica): Observable<HttpResponse<Musica>> {
    return this.http.post<Musica>(`${API_URL}/musica/criar`, body, { observe: 'response' })
  }

  validatorUniqueSongName(songName: string) {
    let myParams = new HttpParams()
    myParams = myParams.append('nome', songName)
    return this.http.get<any>(`${API_URL}/musica/validarNomeMusica`, { params: myParams })
  }

  updateSongById(songId: String, body: Musica): Observable<HttpResponse<Musica>> {
    return this.http.put < Musica > (`${API_URL}/musica/atualizar/${songId}`, body, { observe: 'response' })
  
}

deleteSongById(songId: String): Observable < HttpResponse < Musica >> {
  return this.http.delete<Musica>(`${API_URL}/musica/apagar/${songId}`, { observe: 'response' })
}

}



