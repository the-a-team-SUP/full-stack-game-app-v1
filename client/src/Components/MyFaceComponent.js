import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { postUser } from '../redux';

class MyFaceComponent extends Component {
    loginBtnClicked = () => {
        console.log('login btn clicked');
    };
    facebookResponse = (response) => {
        if(response.status !== 'unknown'){
            const { name, picture, userID, email } = response;
            this.props.addUserToStore({
                name,
                email,
                picture,
                userID,
                authenticated: true
            });
            this.props.history.push("/list")
        }
    };
    render(){
        let facebookData;
        // if(this.state.authenticated){
            // facebookData = (
                // <div>
                //     <p>Hello { `${this.state.firstName}` }</p>
                //     <p><img alt='profilepic' src={`https://graph.facebook.com/${this.state.userID}/picture?type=large`}></img></p>
                // </div>
            // );
        // } else {
            facebookData = (
                <FacebookLogin
                appId='853316458415497'
                autoLoad={true}
                fields='name, picture, email'
                onClick={this.loginBtnClicked}
                callback={this.facebookResponse}
                />  
            );
        // }
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
        addUserToStore: (user) => dispatch({ type: 'LOGIN_USER', newUser: user })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyFaceComponent);
