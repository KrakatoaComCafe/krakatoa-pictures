import React, {Component} from 'react';
import queryString from 'querystring';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            msg: queryString.parse(this.props.location.search).msg
        };
        // this.envia = this.envia.bind(this);
    }

    envia(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.login.value,
                senha: this.senha.value
            }),
            headers: new Headers({ //fetch api
                'Content-type': 'application/json'
            })
        };

        //fetch('http://localhost:8080/api/public/login')
        fetch('https://instalura-api.herokuapp.com/api/public/login', requestInfo)
            .then(res => {
                if (res.ok) {
                    return res.text();
                } else {
                    throw new Error('Não foi possível fazer o login');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                this.props.history.push('timeline');

            })
            .catch(err => {
                this.setState({
                    msg: err.message
                });
            })
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Krakatoa Picture</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input}/>
                    <input type="password" ref={(input) => this.senha = input}/>
                    <input type="submit" value="Fazer login"/>
                </form>
            </div>
        );
    }
}
