import React, {Component} from "react";
import Foto from './Foto';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fotos: []
        }
        this.login = this.props.login;

    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    carregaFotos() {
        let urlPerfil;

        if(this.login === undefined) {
            urlPerfil = `https://instalura-api.herokuapp.com/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `https://instalura-api.herokuapp.com/api/public/fotos/${this.login}`;
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
