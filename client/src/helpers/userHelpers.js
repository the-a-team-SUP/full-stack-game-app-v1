export const userExist = (userId, users) => {
    return users.find( data => data.userID == userId );
}
