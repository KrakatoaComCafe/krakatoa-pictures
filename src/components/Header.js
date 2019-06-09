import React, {Component} from "react";
import Pubsub from 'pubsub-js';
import {URL} from '../environment';

export default class Header extends Component {

    pesquisa(event) {
        event.preventDefault();

        const url = URL + `/api/public/fotos/${this.loginPesquisado.value}`;

        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(fotos => {
                Pubsub.publish('timeline',fotos);
            })
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Krakatoa Pictures
                </h1>

                <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Pesquisa"
                        className="header-busca-campo"
                        ref={input => this.loginPesquisado = input}
                    />
                    <input type="submit" value="Buscar" className="header-busca-submit"/>
                </form>


                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a key="" href="#">
                                ♡
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}
