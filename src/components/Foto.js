import React, {Component} from "react";
import {Link} from 'react-router';

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">

                <FotoHeader foto={this.props.foto}/>

                <img alt="foto" className="foto-src"
                     src={this.props.foto.urlFoto}/>

                <FotoInfo foto={this.props.foto}/>

                <FotoAtualizacoes/>

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
    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">

                    {
                        this.props.foto.likers.map(liker => {
                            return (
                                <Link to={`/timeline/${liker.login}`}>
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
                        this.props.foto.comentarios.map(comentario => {
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
    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="#" className="fotoAtualizacoes-like">Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..."
                           className="fotoAtualizacoes-form-campo"/>
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit"/>
                </form>
            </section>
        );
    }
}
