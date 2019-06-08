import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import {Router, Route, browserHistory} from 'react-router';
import {matchPattern} from 'react-router/lib/PatternUtils';

function verificaAutenticacao(nextState, replace) {

    const result = matchPattern('/timeline(/:login)', nextState.location.pathname);
    const enderecoPrivado = result.paramValues[0] === undefined;

    if (enderecoPrivado && localStorage.getItem('auth-token') === null) {
        replace('/?msg=Você precisa estar logado para acessar o endereço');
    }

}

ReactDOM.render(
    (
        <Router history={browserHistory}>
                <Route path="/" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/timeline(/:login)" component={App} onEnter={verificaAutenticacao}/>
        </Router>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
