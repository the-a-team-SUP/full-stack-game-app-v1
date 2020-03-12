import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import jwt from 'jsonwebtoken';

class FacebookAuth extends Component {
    state = { message: '' }
    addToStore = (token) => {
        try {
            const verified = jwt.verify(token, 'mysecretkey');
            let { name, picture, userID, email } = verified;
            const firstName = name.split(' ')[0];
            localStorage.setItem('token', token);
            this.props.addUserToStore({
                name,
                email,
                picture,
                firstName,
                userID,
                authenticated: true
            });
        } catch (error) {
            console.log(error);
        }
    };
    loginBtnClicked = async () => {
        localStorage.removeItem('message');
        console.log('login btn clicked');
    };
    componentDidMount = () => {
        const token = localStorage.getItem('token');
        const message = localStorage.getItem('message');
        this.setState({ message: message })
        if (token) {
            this.addToStore(token);
        } else {
            const incomingToken = qs.parse(window.location.search, { ignoreQueryPrefix: true }).token;
            if (incomingToken) {
                this.addToStore(incomingToken);
            } else {
            }
        }
    };
    render() {
        let facebookData;
        if (this.props.loggedInUsers[0] && this.props.loggedInUsers[0].authenticated) {
            facebookData = (
                this.props.history.push('/list')
            );
        } else {
            facebookData = (
                <div>
                    <section id="showcase">
                        <div className="main">
                            <img alt="Facebook Logo" src={`${process.env.PUBLIC_URL}Asserts/Images/gamelogo.png`} className="logo" />
                            <h2 className="highlight">full-stack-game-app-v1</h2>
                            <p>
                                full-stack-game-app-v1 is a coolest game ever !! This is a coolest Multiple choice game or objective response is a form of an objective assessment in which respondents are asked to select only correct answers from the choices offered as a list. The multiple choice format is most frequently used in educational testing, in market research, and in elections, when a person chooses between multiple candidates or parties.
						</p>
                            <h3>{this.state.message || this.props.message}</h3>
                            <a href='https://express-react-redux-game.herokuapp.com/api/auth/facebook'>
                                <button className="button" onClick={this.loginBtnClicked}>Login With Facebook</button>
                            </a>
                        </div>
                    </section>
                </div>
            );
        }
        return (
            <div>
                {facebookData}
            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        loggedInUsers: state.user.loggedInUsers,
        message: state.user.message
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addUserToStore: (user) => { dispatch({ type: 'LOGIN_USER', newUser: user }) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);