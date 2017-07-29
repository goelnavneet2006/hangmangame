import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import HangManGame from "./hangmangame";

class App extends Component {

  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.state = {
      hangManGames: []
    }
  }

  startNewGame() {
    const hangManGames = this.state.hangManGames;
    hangManGames.push(<HangManGame/>);

    this.setState(
      hangManGames
    );
  }

  render() {
    return (
      <div>
        <h3>Welcome to Hang Man Game</h3>

        {
          this.state.hangManGames.map((hangmangame, index) => {
            return <HangManGame key={index}/>;
          })
        }

        <button className="btn btn-default" onClick={this.startNewGame}>Start new game</button>
      </div>
    );
  }
}

export default App;
