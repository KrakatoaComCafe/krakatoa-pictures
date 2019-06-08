import React, {Component} from 'react'
import Header from './components/Header';
import Timeline from './components/Timeline';

class App extends Component{

    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log(this.props.params.login);
    }

    render()
    {
        return (
            <div id="root">
                <div className="main">

                    <Header/>

                    <Timeline login={this.props.params.login}/>

                </div>
            </div>
        );
    }
}

export default App;
