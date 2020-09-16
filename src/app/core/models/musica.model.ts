import { Banda } from './banda.model'

export interface Musica {
    _id: String,
    nome: String,
    album?: String,
    anoMusica?: Date,
    letra?: String,
    video: String,
    banda: Banda
}