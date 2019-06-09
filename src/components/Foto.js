import React, {Component} from "react";
import {Link} from 'react-router';
import Pubsub from 'pubsub-js';
import {URL_LOCAL, URL_HEROKU} from '../environment';

const URL = URL_HEROKU;

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">

                <FotoHeader foto={this.props.foto}/>

                <img alt="foto" className="foto-src"
                     src={this.props.foto.urlFoto}/>

                <FotoInfo foto={this.props.foto}/>

                <FotoAtualizacoes foto={this.props.foto}/>

            </div>
        );
    }
}

class FotoHeader extends Component {
    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">

                    <img
                        src={this.props.foto.urlPerfil}
                        alt="" role="img"/>

                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                            {this.props.foto.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data">{this.props.foto.horario}</time>
            </header>
        );
    }
}

class FotoInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likers: this.props.foto.likers,
            comentarios: this.props.foto.comentarios
        }
    }

    componentWillMount() {
        Pubsub.subscribe('atualiza-liker', (topic, infoLiker) => {
            if (this.props.foto.id === infoLiker.fotoId) {
                const possivelLiker = this.state.likers.find(liker => liker.login === infoLiker.liker.login);
                if (possivelLiker === undefined) {
                    const novosLikers = this.state.likers.concat(infoLiker.liker);
                    this.setState({
                        likers: novosLikers
                    });
                } else { //fim do if interno
                    const novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                    this.setState({
                        likers: novosLikers
                    })
                }
            }//if externo
        });

        Pubsub.subscribe('novos-comentarios', (topic, infoComentario) => {
            if(this.props.foto.id === infoComentario.fotoId) {
                const novosComentarios = this.state.comentarios.concat(infoComentario.novoComentario);
                this.setState({
                    comentarios: novosComentarios
                })
            }
        });
    }

    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.state.likers.map(liker => {
                            return (
                                <Link key={liker.login} to={`timeline/${liker.login}`}>
                                    {liker.login}
                                </Link>
                            );
                        })
                    }

                    curtiram

                </div>

                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor </a>
                    {this.props.foto.comentario}
                </p>

                <ul className="foto-info-comentarios">


                    {
                        this.state.comentarios.map(comentario => {
                            return (
                                <li key={comentario.id} className="comentario">
                                    <Link to={`/timeline/${comentario.login}`} className="foto-info-autor">
                                        {comentario.login}
                                    </Link>
                                    {comentario.texto}
                                </li>
                            );
                        })
                    }

                </ul>
            </div>
        );
    }
}

class FotoAtualizacoes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likeada: this.props.foto.likeada
        }
    }

    like(event) {
        event.preventDefault();
        const url = URL + `/api/fotos/${this.props.foto.id}` +
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
                this.setState({likeada: !this.state.likeada});
                Pubsub.publish('atualiza-liker', {
                    liker, //liker: liker
                    fotoId: this.props.foto.id
                });
            })
    }

    comenta(event) {
        event.preventDefault();

        const url = URL +
            `/api/fotos/${this.props.foto.id}/comment` +
            `?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(
                {
                    texto: this.comentario.value
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
                    fotoId: this.props.foto.id,
                    novoComentario // novoComentario: novoComentario
                });
            });
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a onClick={this.like.bind(this)}
                   className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'}>
                    Likar
                </a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta.bind(this)}>
                    <input type="text" placeholder="Adicione um comentário..."
                           className="fotoAtualizacoes-form-campo" ref={input => this.comentario = input}/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>
            </section>
        );
    }
}
