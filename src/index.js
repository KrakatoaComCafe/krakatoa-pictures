import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import {BrowserRouter as Router, Redirect, Route, Switch, matchPath} from 'react-router-dom';

function verificaAutenticacao(nextState, replace) {

    const match = matchPath('/timeline', {
        path: nextState.match.url,
        exact: true
    });

    let valida = false;
    if(match !== null) {
        valida = match.isExact;
    }

    if (valida && localStorage.getItem('auth-token') === null) {
        return (
            <Redirect to={
                {
                    pathname: '/',
                    state: {msg: 'usuario não autenticado'}
                }
            }/>
        );
    }
    return <App/>;

}

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact={true} path="/" component={Login}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/timeline/:login?" render={verificaAutenticacao}/>
            </Switch>
        </Router>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
