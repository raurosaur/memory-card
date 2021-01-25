import {Component} from 'react';

export default class Card extends Component{
    
    render(){
        return(
            <div className = 'card'>
                <div>
                    <img src = {this.props.image} alt = {this.props.image}></img>
                </div>
            </div>
        );
    }
}