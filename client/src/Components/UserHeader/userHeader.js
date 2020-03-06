import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserHeader = ({userData}) => {
    return(
        <div>
            <img src={userData.picture || null} alt={userData.name} />
            <b><p>{userData.name}</p></b>
            <p>{userData.email || null}</p>
      </div>
    );
}

export default UserHeader;