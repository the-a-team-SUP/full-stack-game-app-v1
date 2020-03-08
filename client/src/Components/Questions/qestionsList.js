import React from 'react';
import { useSelector } from 'react-redux';
import InputRadio from './inputRadio';

const QuestionList = ({questions}) => {
    console.log('======dfgdfgdfg========');
    console.log(questions);
    console.log('==============');
    

    // const questions = useSelector(state => state.question.questions);
    const questionList = questions.length ? (
        questions.map((question, index) => {
            return(
                <div key={index}>
                    <p><b>{index+1}. </b>{question.content}</p>
                    <InputRadio questionId={question.content} choises={question.choises} />
                </div>
            )
        })
    ) : (
        <div>There is no question!</div>
    )

    return(
        <form>
            {questionList}
            <input type="submit" value="Submit"></input>
      </form>
    );
}

export default QuestionList;