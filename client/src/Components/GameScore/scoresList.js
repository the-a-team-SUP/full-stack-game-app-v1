import React from 'react';
import { userExist } from '../../Helpers/usersHelper';

const ScoresList = ( { scoreList, usersList }) => {
    
    const scoreListHoler = scoreList.map( ( data, index ) =>
    {
        const userData = userExist( data.userId, usersList );
            return(
                <div className="scores" key={ index }>
                    <br />
                    <hr />
                    <br />
                    <img src={userData.picture} alt="profile" />
                    <p><b>{userData.name} { data.userId }</b></p>
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