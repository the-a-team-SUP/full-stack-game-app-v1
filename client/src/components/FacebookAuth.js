import React, { Component } from 'react';
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
            const result = axios.post('https://express-react-redux-game.herokuapp.com/api/facebooklogin', {
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
        }
    };
    render(){
        let facebookData;
        if(this.props.loggedInUsers[0] && this.props.loggedInUsers[0].authenticated){
            facebookData = (
                <div>
                    <p>Hello { `${this.props.loggedInUsers[0].firstName}` }</p>
                    <p><img alt='profilepic' src={this.props.loggedInUsers[0].picture}></img></p>
                </div>
            );
        } else {
            facebookData = (
                <FacebookLogin
                appId='853316458415497'
                autoLoad={true}
                fields='name, picture, email'
                onClick={this.loginBtnClicked}
                callback={this.facebookResponse}
                />  
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
