import React, {Component} from "react";
import Foto from './Foto';
import Pubsub from 'pubsub-js';
import {URL_LOCAL} from '../environment';

const URL = URL_LOCAL;

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

        if(this.login === undefined) {
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
        if(nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.loadFotos();
        }
    }

    render() {
        return (

            <div className="fotos container">

                {
                    this.state.fotos.map(foto =>
                        <Foto key={foto.id} foto={foto} />
                    )
                }

                {/*
                    <Foto imageSource="https://i.ibb.co/kJ5Ymg7/20-final.jpg"/>

                <Foto imageSource="https://i.ibb.co/y0qRKTF/8.jpg"/>
                */}

            </div>
        );
    }
}
