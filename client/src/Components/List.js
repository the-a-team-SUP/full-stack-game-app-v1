import React, { Component } from "react";
import openSocket from 'socket.io-client';
import axios from 'axios';
import {
  createGameHandler,
  updateGameList,
  updateGame,
  joinGameHandler,
  addJoinedUser,
  retrieveQuestionRequest
} from '../redux';
import { connect } from "react-redux";
import Logout from './Logout';
import "../styles/List.scss";

class List extends Component {
  fecthLoggedInUsers = () => {
    axios
      .get("https://express-react-redux-game.herokuapp.com/api/loggedinusers")
      .then( res =>
      {
        this.props.addFetchedUsers(res.data.data);
      })
      .catch(err => {});
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fecthLoggedInUsers()
    const { history, updateGame, updateGameList, addJoinedUser, game } = this.props;
    const socket = openSocket("https://express-react-redux-game.herokuapp.com/");
    socket.on('gameCreated', (game) => {
      updateGameList(game)
      updateGame(game)
      if(game.users.length >= 5) {
        socket.emit('join-room', game.id);
      }
    })

    socket.on('joinSuccess', (game) => {
      addJoinedUser(game)
      if(game.users.length >= 5) {
        socket.emit('join-room', game.id);
      }
    })

    socket.on('QuestionsFromServer', (questionArray) => {
      if(this.props.game.id === questionArray.gameId){
        this.props.getQuestions(questionArray.questions);
      }
    });

    socket.on('alreadyJoined', (game) => {
      alert('You are already in the game', game);
    })
    socket.on('redirect', (id) => {
      history.push('/landing')
    })
  }

  joinGameButtonHandler = (game) => {
    const { history, joinGameHandler, users, gameToCheck } = this.props;
    game.users.push({userId: users[0].userID, score: 0});
    joinGameHandler(game);
  }

  createGameButtonHandler = () => {
    const { history, createGameHandler, users } = this.props;
    createGameHandler({ userID: users[0].userID, name: users[0].name });
  }

  render() {
    const { history, gameList, users } = this.props;

    if (!users[0]) history.push('/')

    const games = gameList.map((g, index) => <li key={index}><p>GameId : {g.id} with {g.users.length} participants <button onClick={() => this.joinGameButtonHandler(g)}>Join Game</button></p></li>);
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
    gameToCheck: state.game,
    gameList: state.game.gameList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGameHandler: (game) => dispatch(createGameHandler(game)),
    updateGame: (game) => dispatch(updateGame(game)),
    updateGameList: (game) => dispatch(updateGameList(game)),
    joinGameHandler: (game) => dispatch(joinGameHandler(game)),
    addJoinedUser: (game) => dispatch(addJoinedUser(game)),
    getQuestions: (questionsArray) => dispatch(retrieveQuestionRequest(questionsArray)),
    addFetchedUsers: users => dispatch({ type: "ADD_FETCHED_USERS", users: users })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
