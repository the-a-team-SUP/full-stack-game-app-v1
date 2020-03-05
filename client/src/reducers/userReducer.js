const initialStatus = {
    loggedInUsers: [

    ]
};

const reducer = (state = initialStatus, action) => {
    if(action.type === 'LOGIN_USER'){
        const incomingUserData = action.newUser;
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
