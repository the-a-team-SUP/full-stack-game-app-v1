import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class OnUsers extends Component {
  // fecthLoggedInUsers = () => {
  //   axios
  //     .get("http://localhost:4000/api/loggedinusers")
  //     .then( res =>
  //     {
  //       this.props.addFetchedUsers(res.data.data);
  //     })
  //     .catch(err => {});
  // };
  render() {
    const { users } = this.props;
    const usersList = users.length ? (
      users.map((user, index) => {
        return (
          <div className="users" key={index}>
            <p>
              <img src={user.picture} alt="profilePic"></img>
            </p>
            <b>
              <p>{user.userame}</p>
            </b>
            <p>{user.email}</p>
          </div>
        );
      })
    ) : (
      <div>
        <p> No user is online yet</p>
      </div>
    );
    return <div>{usersList}</div>;
  }

  componentDidMount(){
      // this.fecthLoggedInUsers()
  }
}

const mapStateToProps = state => {
  return {
    users: state.user.onlineUsers
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     addFetchedUsers: users =>
//       dispatch({ type: "ADD_FETCHED_USERS", users: users })
//   };
// };

export default connect(mapStateToProps)(OnUsers);
