import { logoutUser } from '../redux/user/userActions';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../App.css";

class Logout extends Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (!token) this.props.history.push("/");
    };

    removeToken() {
        const token = localStorage.removeItem('token');
        return token;
    }
    render() {
        return (
            <div>
                <button className="btn"
                    onClick={(() => {
                        if (this.props.loggedInUsers.length !== 0) {
                            this.props.logoutThisUser(this.props.loggedInUsers[0].userID);
                            this.removeToken();
                            this.props.history.push("/");
                        }
                    })}
                >
                    <i className="fa fa-sign-out"> </i> Logout
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedInUsers: state.user.loggedInUsers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutThisUser: (userID) => { dispatch(logoutUser(userID)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout));
