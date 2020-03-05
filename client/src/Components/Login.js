import React, { Component } from 'react';
import logo from './Asserts/Images/gamelogo.png';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import axios from 'axios';

class FacebookAuth extends Component {
    loginBtnClicked = () => {
        console.log('login btn clicked');
    };
    facebookResponse = (response) => {
        if(response.status !== 'unknown'){ 
            let { name, picture, userID, email } = response;
            userID = parseInt(userID, 10);
            picture = `https://graph.facebook.com/${userID}/picture?type=large`;
            const result = axios.post('http://localhost:4000/api/facebooklogin', {
                name,
                email,
                picture,
                userID
            });
            const firstName = name.split(' ')[0];
            this.props.addUserToStore({
                name,
                email,
                picture,
                firstName,
                id: userID,
                authenticated: true
            });
            console.log(this.props.loggedInUsers);
        }
    };
    render(){
        let facebookData;
        if(this.props.loggedInUsers[0] && this.props.loggedInUsers[0].authenticated){
            facebookData = (
                this.props.history.push('/landing')
            );
        } else {
            facebookData = (
                <div>
                <section id="showcase">
                    <div className="main">
                        <img alt="Facebook Logo" src={logo} className="logo" />
                        <h2 className="highlight">full-stack-game-app-v1</h2>
                        <p>
                            full-stack-game-app-v1 is a coolest game ever !! This is a coolest Multiple choice game or objective response is a form of an objective assessment in which respondents are asked to select only correct answers from the choices offered as a list. The multiple choice format is most frequently used in educational testing, in market research, and in elections, when a person chooses between multiple candidates or parties.
						            </p>
                        <FacebookLogin className="button"
                        appId='853316458415497'
                        autoLoad={true}
                        fields='name, picture, email'
                        onClick={this.loginBtnClicked}
                        callback={this.facebookResponse}
                        />
                    </div>
                </section>

            </div>  
            );
        }
        return (
            <div>
                { facebookData }
            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        loggedInUsers: state.loggedInUsers
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addUserToStore: (user) => { dispatch ({ type: 'LOGIN_USER', newUser: user }) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);
