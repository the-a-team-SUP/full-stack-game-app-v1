import React, { Component } from "react";
import openSocket from 'socket.io-client';
import { createGameHandler, updateGameList } from '../redux';
import { connect } from "react-redux";
import Logout from './Logout';
import "../styles/List.scss";

class List extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { updateGameList } = this.props;
    const socket = openSocket("http://127.0.0.1:4000");
    socket.on('gameCreated', (game) => {
      console.log(game);
      updateGameList(game)
    })
    socket.on('alreadyJoined', (game) => {
      console.log(game);
    })
  }

  createGameButtonHandler = () => {
    const { history, createGameHandler, users } = this.props;
    // history.push('/landing');
    createGameHandler({ userID: users[0].id, name: users[0].name });
  }

  render() {
    const { game, gameList, users } = this.props;
    const games = gameList.map((g, index) => <li key={index}><p>GameId : {g.id} with {g.users.length} participants <button>Join Game</button></p></li>);
    return (

      <div className="wrapper">
        <div className="center-div">
          <div className="games">
            <Logout history={this.props.history} />
            <h2>All available games</h2>
            <ul>
              {games}
            </ul>
          </div>
          <div className="buttons">
            <button onClick={this.createGameButtonHandler}>Create Game</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.loggedInUsers,
    game: state.game.game,
    gameList: state.game.gameList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGameHandler: (game) => dispatch(createGameHandler(game)),
    updateGameList: (game) => dispatch(updateGameList(game))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
