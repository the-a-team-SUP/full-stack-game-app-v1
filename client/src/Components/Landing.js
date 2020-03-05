import React, { Component } from "src/Components/node_modules/react";
import "../App.css";

class Landing extends Component {
  render() {
    return (
      <div className="wrapper">
        <div>
          <h4>Online Users</h4>
          <div className="users">
            <image alt="" src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="></image>{" "}
            <b>
              <p>Doddy</p>
            </b>
            <p>kwizeradoddy@gmail.com</p>
          </div>
          <br></br>
          <div className="users">
            <img alt="" src="https://st4.depositphotos.com/9637256/22048/i/1600/depositphotos_220489228-stock-photo-delicious-homemade-whole-cake-mascarpone.jpg"></img>{" "}
            <b>
              <p>Karen</p>
            </b>
            <p>kgiramata57@gmail.com</p>
          </div>
          <br></br>
          <div className="users">
			<img alt="" src="https://images-na.ssl-images-amazon.com/images/I/71EFb-BEAeL._AC_SL1400_.jpg"></img> <b><p>Igor</p></b><p>igor@gmail.com</p>
		</div>
        <br></br>
        </div>
        <div class="container">
		<div class="userSide">
		<img src="https://scontent.fkgl3-1.fna.fbcdn.net/v/t31.0-8/p960x960/18595201_1388101917942882_8338415819528657694_o.jpg?_nc_cat=111&_nc_sid=85a577&_nc_eui2=AeGHMCbPiqtJPHzN2POLLaN-oiKJ8uSwlDLn4DPz1WKGRfqzIQvLFiUHN4DZnLLPddENRgJSb9w9ePc13SEyXDG2mfruTR9H0mXN8r38Hxo_7A&_nc_ohc=4ILfuPtH8EkAX-V2rcm&_nc_pt=5&_nc_ht=scontent.fkgl3-1.fna&_nc_tp=6&oh=db0d3a586f50de626dd59959e22da0a1&oe=5E97FB61"></img>
		<b><p>Guevara</p></b>
		<p>manziguevara@gmail.com</p>
		<hr></hr>
		<h2>Game: Sports</h2>
		<div>
			<form>
 <p> <b>1. </b>Who is the best football player of all time?</p>
  <input type="radio" id="ronaldo" name="player" required></input>
  <label for="ronaldo">Ronaldo</label><br></br>
  <input type="radio" id="messi" name="player" required></input>
  <label for="messi">Messi</label><br></br>
  <input type="radio" id="ronaldinho" name="player" required></input>
  <label for="ronaldinho">Ronaldinho</label>

  <br></br>
   <p> <b>2. </b>Who is the all time top scorer?</p>
 <input type="radio" id="ronaldo" name="scorer" required></input>
  <label for="ronaldo">Ronaldo</label><br></br>
  <input type="radio" id="messi" name="scorer" required></input>
  <label for="messi">Messi</label><br></br>
  <input type="radio" id="ronaldinho" name="scorer" required></input>
  <label for="ronaldinho">Ronaldinho</label>
  <br></br>
   <p> <b>3. </b>Which club signed the most expensive players this season?</p>
 <input type="radio" id="real" name="club" required></input>
  <label for="real">Real Madrid</label><br></br>
  <input type="radio" id="barca" name="club" required></input>
  <label for="barca">Barcelona</label><br></br>
  <input type="radio" id="mancity" name="club" required></input>
  <label for="mancity">Man City</label>
  <br></br>  
   <p> <b>4. </b>Which team won the UCL final in 2017</p>
  <input type="radio" id="real" name="team" required></input>
  <label for="real">Real Madrid</label><br></br>
  <input type="radio" id="barca" name="team" required></input>
  <label for="barca">Barcelona</label><br></br>
  <input type="radio" id="mancity" name="team" required></input>
  <label for="mancity">Man City</label>
  <br></br>  
   <p> <b>5. </b>Who is the most paid Athlete in the world?</p>
 <input type="radio" id="ronaldo" name="athlete" required></input>
  <label for="ronaldo">Ronaldo</label><br></br>
  <input type="radio" id="messi" name="athlete" required></input>
  <label for="messi">Messi</label><br></br>
  <input type="radio" id="lebron" name="athlete" required></input>
  <label for="lebron">Lebron James</label>
  <input type="submit" value="Submit"></input>
  
</form>
		</div>
	</div>
	</div>
      </div>
    );
  }
}

export default Landing;
