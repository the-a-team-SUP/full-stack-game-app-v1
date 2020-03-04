const initialStatus = {
    loggedInUsers: [

    ]
};

const reducer = (state = initialStatus, action) => {
    if(action.type === 'LOGIN_USER'){
        const incomingUserData = action.newUser;
        let newId;
        if(state.loggedInUsers.length){
            newId = state.loggedInUsers[state.loggedInUsers.length-1].id +1;
        } else {
            newId = 1;
        }
        incomingUserData.id = newId;
        const updatedLoggedInUsers = [
            ...state.loggedInUsers,
            incomingUserData
        ];
        return {
            ...state,
            loggedInUsers: updatedLoggedInUsers
        }
    }
    return state;
};

export default reducer;
