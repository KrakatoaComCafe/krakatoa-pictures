import React, {Component} from "react";
import Foto from './Foto';
import Pubsub from 'pubsub-js';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {URL} from '../environment';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fotos: []
        }
        this.login = this.props.login;
    }

    componentWillMount() {
        Pubsub.subscribe('timeline', (topic, fotos) => {
            this.setState({
                fotos //fotos: fotos
            });
        })
    }

    loadFotos() {
        let urlPerfil;

        if (this.login === undefined) {
            urlPerfil = URL + `/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = URL + `/api/public/fotos/${this.login}`;
        }

        // fetch('https://krakatoa-picture-backend.herokuapp.com/api/public/fotos/krakatoa')
        // fetch('http://localhost:9090/api/public/fotos/krakatoa')
        fetch(urlPerfil)
            .then(res => res.json())
            .then(fotos => {
                this.setState({
                    fotos: fotos
                });
            });
        // fetch('http://localhost:8080/api/public/fotos/rafael');
    }

    componentDidMount() {
        this.loadFotos();

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.loadFotos();
        }
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
                Pubsub.publish('atualiza-liker', {
                    liker, //liker: liker
                    fotoId //fotoId: fotoId
                });
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
                Pubsub.publish('novos-comentarios', {
                    fotoId, //fotoId: fotoId
                    novoComentario // novoComentario: novoComentario
                });
            });
    }

    render() {
        return (

            <div className="fotos container">

                <CSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}
                >
                    {
                        this.state.fotos.map(foto =>
                            <Foto key={foto.id} foto={foto} like={this.like} comenta={this.comenta}/>)
                    }
                </CSSTransitionGroup>

            </div>
        );
    }
}
