import React, { Component } from "src/Components/node_modules/react";
import openSocket from 'socket.io-client';
import "../styles/List.scss";

class List extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:3000"
    };
  }

  createGameButtonHandler = () => {
    const { endpoint } = this.state;
    const socket = openSocket(endpoint);
    console.log('Clicked the button');
    socket.emit('makeGame', { name: 'Igor'});
  }

  render() {
    return (
      <div className="wrapper">
        <div className="center-div">
          <div className="games">
            <h2>All available games</h2>
            <ul>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
              <li><p>GameId : weyeyte with 6 participants <button>Join Game</button></p></li>
            </ul>
          </div>
          <div className="buttons">
            <button onClick={this.createGameButtonHandler}>Create Game</button>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
