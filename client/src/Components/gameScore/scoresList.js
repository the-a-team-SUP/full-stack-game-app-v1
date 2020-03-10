import React from 'react';
import { userExist } from '../../helpers/userHelpers';

const ScoresList = ( { scoreList, usersList } ) =>
{
  const scores=  scoreList.sort( ( a, b ) =>
    {
        return b.score - a.score
    })
    const scoreListHoler = scores.map( ( data, index ) =>
    { 
        const userData = userExist( data.userId.toString(), usersList );
        return (
           
                <div className="scores" key={ index }>
                    <br />
                    <hr />
                    <br />
                    <img src={userData.picture} alt="profile" />
                    <p><b>{ userData.name }</b></p>
                    <p>{userData.email}</p>
                    <p className="score"><b>{data.score}/5</b></p>
                    <br />
                    
                </div>
        )
       
        })
       
    return(
        <div>
            <h2>Game Score</h2>
            {scoreListHoler}
      </div>
    );
}

export default ScoresList;