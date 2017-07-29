import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ajaxCall } from "./utils";
import * as consts from "./consts";

class HangManGame extends Component {

  constructor(props) {
    super(props);

    this.onStartGame = this.onStartGame.bind(this);
    this.onNewKey = this.onNewKey.bind(this);

    this.state = {
      game_key: "",
      num_tries_left: "",
      phrase: "",
      state: null,
      gameStarted: false
    }
  }

  onStartGame (e) {
    e.preventDefault();
    const email = this.emailInput.value;
    ajaxCall(consts.startGameURL, "POST", {
      email
    }).then((success) => {
      const finalObj = Object.assign({}, JSON.parse(success), {
        gameStarted: true
      })
      this.setState(finalObj);
    }).then((error) => {
      console.log(error);
    });
  }

  onNewKey (e) {
    e.preventDefault();
    const newKey = this.newKey.value;
    ajaxCall(consts.newKeyURL(this.state.game_key), "POST", {
      guess: newKey
    }).then((success) => {
      this.setState(JSON.parse(success));
      this.newKey.value = "";
    }).then((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="hangmangame">
        <form className="form-inline">
        <div className={!this.state.gameStarted ? "": "hidden"}>
          <input className="form-control" type="email" placeholder="Enter email id" ref={(emailInput) => {
            this.emailInput = emailInput;
          }}/>
          <button className="btn btn-default" onClick={this.onStartGame}>Enter email and start game</button>
        </div>
        </form>

        <table className={!this.state.gameStarted ? "hidden table table-bordered" : "table table-bordered"}>
          <tr>
            <td>Number of tries left</td>
            <td>{this.state.num_tries_left}</td>
          </tr>
          <tr>
            <td>Phrase</td>
            <td>{this.state.phrase}</td>
          </tr>
          <tr>
            <td>Game State</td>
            <td>{this.state.state}</td>
          </tr>


          <tfoot>
          <tr>
            <td>
              <input className="form-control"type="text" placeholder="Enter new key" ref={(newKey) => {
                this.newKey = newKey;
              }}/>
            </td>
            <td>
              <button className="btn btn-default" onClick={this.onNewKey}>Submit Key</button>
            </td>
          </tr>
          </tfoot>
        </table>

      </div>
    );
  }
}

export default HangManGame;
