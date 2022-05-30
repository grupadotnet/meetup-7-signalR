import React, {Component} from 'react';
import Img from '../assets/img/logo.png'

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <img src={Img}/>
            </div>
        );
    }
}
