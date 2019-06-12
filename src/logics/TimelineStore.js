import {URL} from "../environment";
import Pubsub from "pubsub-js";

export default class TimelineStore {

    constructor(fotos) {
        this.fotos = fotos;
    }

    lista(urlPerfil) {
        fetch(urlPerfil)
            .then(res => res.json())
            .then(fotos => {

                this.fotos = fotos;
                Pubsub.publish('timeline', this.fotos);
            });
    }

    like(fotoId) {
        const url = URL + `/api/fotos/${fotoId}` +
            `/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        fetch(url, {method: 'POST'})
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Não foi possível realizar o like da foto');
                }
            })
            .then(liker => {
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.likeada = !fotoAchada.likeada;
                const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === liker.login);

                if (possivelLiker === undefined) {
                    fotoAchada.likers.push(liker);
                } else { //fim do if interno
                    const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoAchada.likers = novosLikers;
                }

                Pubsub.publish('timeline', this.fotos);
            });
    }

    comenta(fotoId, textoComentario) {
        const url = URL +
            `/api/fotos/${fotoId}/comment` +
            `?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(
                {
                    texto: textoComentario
                }),
            headers: new Headers(
                {
                    'Content-type': 'application/json'
                })
        };

        fetch(url, requestInfo)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Não foi possível comentar');
                }
            })
            .then(novoComentario => {
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.comentarios.push(novoComentario);

                Pubsub.publish('timeline', this.fotos);
            });
    }

    subscribe(callback) {
        Pubsub.subscribe('timeline', (topic, fotos) => {
            callback(fotos);
        })
    }
}
