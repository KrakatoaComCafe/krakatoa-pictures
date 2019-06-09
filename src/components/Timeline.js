import React, {Component} from "react";
import Foto from './Foto';
import Pubsub from 'pubsub-js';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import {URL_LOCAL, URL_HEROKU} from '../environment';

const URL = URL_HEROKU;

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
                            <Foto key={foto.id} foto={foto}/>)
                    }
                </CSSTransitionGroup>

            </div>
        );
    }
}
