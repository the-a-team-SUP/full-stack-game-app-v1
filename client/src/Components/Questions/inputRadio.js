import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { updateGameScoreAction } from '../../redux';
import { updateScore } from '../../Helpers/updateScore';

const InputRadio = ({questionId, choises, socket, selectedGame, myData}) => {
    const dispatch = useDispatch();

    const checkAnswer = (answer) => {
        if(answer){
            const newScores = updateScore(myData.userID, selectedGame.users);
            console.log('=========answer==========')
            console.log(answer)
            console.log('=========corresct score to save==========')
            console.log(newScores)
            console.log('===================')
            dispatch(updateGameScoreAction(newScores))
            socket.emit('scoreFromClient', { userId: myData.userID, gameId: selectedGame.id });
        }
    }

    const choiseList = choises.map((choise, index) => {
        const option = JSON.parse(choise);
        return(
            <div key={index}>
                <input type="radio" name={questionId} value={option.isCorrect} onClick={() => checkAnswer(option.isCorrect)} required />
                <label for={questionId}>{option.answer}</label>
            </div>
        )
    })

    return(<div>{choiseList}</div>);
}

export default InputRadio;