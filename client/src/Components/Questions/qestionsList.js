import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import openSocket from 'socket.io-client';
import { updateGameScoreAction, endGameHandler, endGameToAll } from '../../redux';
import { updateScore } from '../../Helpers/updateScore';
import { socketToListen } from '../../Helpers/socket.ioHelper';
import { getQuestionsIds } from '../../Helpers/questionsHelper';
import InputRadio from './inputRadio';

let socket;
const QuestionList = ({ questions, myData }) => {
    const dispatch = useDispatch();
    const { game } = useSelector(state => state.game)
    socket = openSocket(socketToListen);
    useEffect(() => {
        socket.on('scoreFromServer', (scoreData) => {
            if(game.id === scoreData.gameId){
                const newScores = updateScore(scoreData.userId, game.users);
                dispatch(updateGameScoreAction(newScores));
            }
        });

        socket.on('serverEndGame', (gameResult) => {
            if(game.id === gameResult.id){
                dispatch(endGameToAll(gameResult));
            }
        })
    }, [socketToListen])
    
    let questionList = questions.length ? (
        questions.map((question, index) => {
            return(
                <div key={index}>
                    <p><b>{index+1}. </b>{question.content}</p>
                    <InputRadio questionId={question.id} choises={question.choises} socket={socket} selectedGame={game} myData={myData} />
                </div>
            )
        })
    ) : (false);

    // <div>There is no question!</div>
    let btnDisplayer = <input type="submit" value="Submit"></input>;
    if(!questionList) btnDisplayer = null;

    const submitResult = (e) => {
        e.preventDefault();
        dispatch(endGameHandler(game))
    }

    return(
        <form onSubmit={submitResult}>
            <h2>Game Questions</h2>
            {questionList}
            {btnDisplayer}
      </form>
    );
}

export default QuestionList;