import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchQuestionRequest } from '../redux';
import QuestionList from '../Components/Questions/qestionsList';

class Landing extends Component {
  componentDidMount(){
    this.props.getQuestions();
  }
  
  render() {
    const {questions} = this.props.question;
    
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
		<h2>Game</h2>
		<div>
      <QuestionList questions={questions} />
		</div>
	</div>
	</div>
      </div>
    );
  }
}

const mapActionToProps = dispatch => {
  return {
    getQuestions: () => dispatch(fetchQuestionRequest())
  }
}

const mapStateToProps = (state) => {
  return { question: state.question }
};

export default connect(mapStateToProps, mapActionToProps)(Landing);
