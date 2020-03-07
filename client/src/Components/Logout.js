import { logoutUser } from '../redux/user/userActions';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import "../App.css";

class Logout extends Component {
    // componentDidMount() {
    //     if (this.props.loggedInUsers.length === 0) {
    //         this.props.history.push("/");
    //     }
    // }
    render() {
        return (
            <div>
                <button
                    onClick={(() => {
                        if (this.props.loggedInUsers.length === 0) { this.props.history.push("/") } else {
                            this.props.logoutThisUser(this.props.loggedInUsers[0].userID);
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
