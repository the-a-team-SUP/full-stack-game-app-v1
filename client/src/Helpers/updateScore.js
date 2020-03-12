export const updateScore = (userID, users) => {
    return users.map((data) => (userID === data.userId) ? ({ ...data, score: ++data.score }) : (data));
}