import React, { Component } from "react";
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { socketToListen } from '../Helpers/socket.ioHelper';
import { retrieveQuestionRequest } from '../redux';
import QuestionList from '../Components/Questions/qestionsList';
import OnUsers from './OnUsers'
import ScoreList from '../Components/gameScore/scoresList';
import Logout from './Logout';
import UserHeader from './UserHeader/userHeader';

let socket;
class Landing extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) this.props.history.push("/");
    
    // socket = openSocket(socketToListen);
    // socket.on('QuestionsFromServer', (questionArray) => {
    //   if(this.props.game.game.id === questionArray.gameId){
    //     this.props.getQuestions(questionArray.questions);
    //   }
    // });
  }

  render() {
    const { questions } = this.props.question;
    const { game, isGameOpen } = this.props.game;
    const { loggedInUsers, onlineUsers } = this.props.users;
    const getArrayObject = (array, indexParam) => {
      let userObject;
      array.map((data, index) => {
        if(index === indexParam) userObject = data;
      })
      return {...userObject};
    }
    const getAllUsers = [
      ...onlineUsers,
      loggedInUsers[0]
    ]
    let result;
    if (isGameOpen === "done")
      result = <ScoreList scoreList={ game.users } usersList={ getAllUsers } />;
    else if(game.users.length > 4)
      result = <QuestionList questions={questions} myData={getArrayObject(loggedInUsers, 0)} />;
    else
      result = <p>Wait for 5 users, please.</p>;

    return (
      <div className="wrapper">
        <div>
          <h4>Online Users</h4>
          <OnUsers />
          <br></br>
        </div>
        <div className="container">
          <div className="userSide">
            <Logout history={this.props.history} />
            <UserHeader userData={getArrayObject(loggedInUsers, 0)} />
            <hr></hr>
            <div>
            {result}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.question,
    users: state.user,
    game: state.game
  }
};

const mapActionToProps = dispatch => {
  return {
    // getQuestions: (questionsArray) => dispatch(retrieveQuestionRequest(questionsArray))
  }
}

export default connect(mapStateToProps, mapActionToProps)(Landing);
