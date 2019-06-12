import React, {Component} from "react";
import Foto from './Foto';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {URL} from '../environment';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fotos: []
        }
        this.login = this.props.login;
        // Alternativamente o código abaixo foi feito diretamente no render
        // this.like = this.like.bind(this);
        // this.comenta = this.comenta.bind(this);
    }

    componentWillMount() {
        this.props.store.subscribe(fotos => {
            this.setState({
                fotos //fotos: fotos
            });
        });
    }

    loadFotos() {
        let urlPerfil;

        if (this.login === undefined) {
            urlPerfil = URL + `/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = URL + `/api/public/fotos/${this.login}`;
        }

        this.props.store.lista(urlPerfil);

        // fetch('https://krakatoa-picture-backend.herokuapp.com/api/public/fotos/krakatoa')
        // fetch('http://localhost:9090/api/public/fotos/krakatoa')
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
        this.props.store.like(fotoId);
    }

    comenta(fotoId, textoComentario) {
        this.props.store.comenta(fotoId, textoComentario);
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
                            <Foto key={foto.id} foto={foto} like={this.like.bind(this)}
                                  comenta={this.comenta.bind(this)}/>)
                    }
                </CSSTransitionGroup>

            </div>
        );
    }
}
