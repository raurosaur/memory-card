import { Component } from "react";
import Card from "./Components/Card";
import * as imgArray from "./images.json";

let images = imgArray.default.map(el => `./Images/${el}.jpg`);
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

class App extends Component{
  state = {
    images : images,
    history: [],
    score: 0,
    responses: 0,
  }
  shuffle(){
    this.setState({ images: shuffle(images) });
  }
  componentDidMount(){
    this.shuffle();
  }
  handleClick({target}, getGame){
    this.setState({
      history: [...this.state.history, target.alt],
      responses: this.state.responses+ 1,
      score: this.state.score+1
    });
    this.shuffle();
  }
  reset(){
    this.setState({
      images: images,
      history: [],
      score: 0,
      responses: 0
    });
  }
  checkRepeat(){
    const {history} = this.state,
    result = (history.length === new Set(history).size);
    return result;
  }
  render(){
    const {score, responses} = this.state;
    const isGameOver = this.checkRepeat();
    return (
      <div className="body">
        <header>Memory Card Game</header>
        <div className = 'score'>
          Score: {!isGameOver ? score-1 : score}
        </div>
        <div className = 'container'>
          {(responses < 5 && isGameOver) ? images.map(el => (<div onClick={(e) => this.handleClick(e)}><Card image = {el}/></div>)) 
          : <button onClick = {() => this.reset()}>Try Again!</button>}
        </div>
        <footer>Created by Raurosaur</footer>
      </div>
    );
  }
}

export default App;
