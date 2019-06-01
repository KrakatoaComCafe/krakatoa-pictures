import React, {Component} from "react";
import Foto from './Foto';

export default class Timeline extends Component {

    render() {
        return (

            <div className="fotos container">
                <Foto imageSource="https://i.ibb.co/kJ5Ymg7/20-final.jpg"/>
                
                <Foto imageSource="https://i.ibb.co/y0qRKTF/8.jpg"/>

            </div>
        );
    }
}
