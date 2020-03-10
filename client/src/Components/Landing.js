import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchQuestionRequest } from '../redux';
import QuestionList from '../Components/Questions/qestionsList';
import OnUsers from './OnUsers'
import ScoreList from '../Components/gameScore/scoresList';
import Logout from './Logout';

class Landing extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) this.props.history.push("/");
    this.props.getQuestions();
  }

  render() {
    const { questions } = this.props.question;
    const { users } = this.props.selectedGame;
    const {onlineUsers }= this.props.onlineUsers;
    const { isGameOpen } = this.props.isGameOpen;
    let result;
    if ( isGameOpen === "done"  )
    { 
      if(onlineUsers.length > 4){
        result = <ScoreList scoreList={ users } usersList={ onlineUsers } />;
      }
    }
 else
    {
      result= <QuestionList questions={ questions } />
    }
    
    return (
      <div className="wrapper">
        <div>
          <h4>Online Users</h4>
          <OnUsers />
          <br></br>
        </div>
        <div className="container">
          <div class="userSide">
            <Logout history={this.props.history} />
            <img src="https://scontent.fkgl3-1.fna.fbcdn.net/v/t31.0-8/p960x960/18595201_1388101917942882_8338415819528657694_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_eui2=AeGHMCbPiqtJPHzN2POLLaN-oiKJ8uSwlDLn4DPz1WKGRfqzIQvLFiUHN4DZnLLPddENRgJSb9w9ePc13SEyXDG2mfruTR9H0mXN8r38Hxo_7A&_nc_ohc=4ILfuPtH8EkAX-V2rcm&_nc_pt=5&_nc_ht=scontent.fkgl3-1.fna&_nc_tp=6&oh=db0d3a586f50de626dd59959e22da0a1&oe=5E97FB61"></img>
            <b><p>Guevara</p></b>
            <p>manziguevara@gmail.com</p>
            <hr></hr>
            <h2>Game</h2>
            <div>
            {result}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapActionToProps = dispatch => {
  return {
    getQuestions: () => dispatch(fetchQuestionRequest())
  }
}

const mapStateToProps = (state) => {
  return {
    question: state.question,
    selectedGame: state.game.game,
    onlineUsers: state.user,
    isGameOpen: state.game
  }
};

export default connect(mapStateToProps, mapActionToProps)(Landing);
