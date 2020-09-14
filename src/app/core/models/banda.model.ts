import { Musica } from './musica.model'

export interface Banda {
    _id: String
    nome: String
    genero?: String
    imagem?: String
    musicas?: Musica[]
}