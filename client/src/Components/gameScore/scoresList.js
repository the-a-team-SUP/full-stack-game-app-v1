import React from 'react';
import { userExist } from '../../helpers/userHelpers';

const ScoresList = ( { scoreList, usersList } ) => {
    const scores =  scoreList.sort((a, b) => (b.score - a.score));
    const scoreListHoler = scores.map(( data, index ) => {
        const userData = userExist(data.userId, usersList);
        console.log('+++++++++++++');
        console.log(usersList);
        console.log(data.userId);
        console.log(userData);
        console.log('+++++++++++');
            return (
                <div className="scores" key={ index }>
                    <br /><hr /><br />
                    <img src={userData.picture || null} alt="profile" />
                    <p><b>{ userData.name}</b></p>
                    <p>{userData.email || null}</p>
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