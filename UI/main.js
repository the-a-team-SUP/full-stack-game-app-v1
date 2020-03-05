const socket = io();

const createGame = document.querySelector(".createGame");
const joinGameButton = document.querySelector(".joinGame");
const input = document.getElementById('name');
const leaveGame = document.querySelector(".leaveGame");

let user;
input.addEventListener('keyup', (e) => {
  e.preventDefault();
  user = e.target.value;
})

createGame.addEventListener('click', (e) => {
  e.preventDefault();
  sendGame();
});

joinGameButton.addEventListener('click', (e) => {
  e.preventDefault();
  joinGame();
});

socket.on('gameCreated', (data) => {
  console.log("Game Created! ID is: " + data.gameId)
  // log(data.username + ' created Game: ' + data.gameId);
  // alert("Game Created! ID is: "+ JSON.stringify(data));
});

socket.on('alreadyJoined', (data) => {
  console.log('You are already in an Existing Game: ' + data.gameId)
  // log(data.username + ' created Game: ' + data.gameId);
  // alert("Game Created! ID is: "+ JSON.stringify(data));
});

socket.on('joinSuccess', (data) => {
  console.log('You have successfully joined the game: ' + data.gameId)
  // log(data.username + ' created Game: ' + data.gameId);
  // alert("Game Created! ID is: "+ JSON.stringify(data));
});

socket.on('leftGame', (data) => {
  console.log('Leaving Game ' + data.gameId)
  // log(data.username + ' created Game: ' + data.gameId);
  // alert("Game Created! ID is: "+ JSON.stringify(data));
});

const sendGame = (user) => {
  socket.emit('makeGame', { name: user});
};

const joinGame = () => {
  socket.emit('joinGame', { name: user});
};

const leaveGame = () => {
  socket.emit('leaveGame');
};
