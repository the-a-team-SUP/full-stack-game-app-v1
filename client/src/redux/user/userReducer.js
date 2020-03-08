import { LOGIN_USER, LOGOUT_USER } from "./userTypes";
import axios from 'axios';

const initialStatus = {
  loggedInUsers: [
    {
      name: 'Izabayo',
      email: "izabayo@stackup.com",
      picture: 'https://scontent-jnb1-1.xx.fbcdn.net/v/t1.0-9/11008804_813019598783174_5403540366515761916_n.jpg?_nc_cat=111&_nc_sid=7aed08&_nc_eui2=AeHFCfn4a-DcI6Qr_wjUnauBfFhWIqw0Ga2cuMlneuUhOG-M6QPMBO2fP31P-flAJ7lTe2KowHeqO237IzE89lNOeyGFN-G7lbBJpZNuD55eqg&_nc_ohc=D8b_3dZv95MAX_0AQPV&_nc_ht=scontent-jnb1-1.xx&oh=91a8872926ff6244e38979b47e9ddb11&oe=5E982E15',
      userID: 1
    },
    {
      name: 'Doddy',
      email: "dody@stackup.com",
      picture: 'https://cdn.cnn.com/cnnnext/dam/assets/191114120109-dog-aging-project-1-super-tease.jpg',
      userID: 2
    },
    {
      name: 'christian',
      email: "christian@stackup.com",
      picture: 'https://img.huffingtonpost.com/asset/5dcc613f1f00009304dee539.jpeg?cache=QaTFuOj2IM&ops=crop_834_777_4651_2994%2Cscalefit_720_noupscale&format=webp',
      userID: 3
    },
    {
      name: 'Karen Giramata',
      email: "karen@stackup.com",
      picture: 'https://scontent-jnb1-1.xx.fbcdn.net/v/t1.0-9/282908_481889085208631_1454687981_n.jpg?_nc_cat=104&_nc_sid=210fed&_nc_eui2=AeGk_zgxzj5qWWqDQPB-KN5RjA6NqpvxDHEqMNEzzSdyNuQZXMtddSyIaaaGa2N3P4i5vbau63fFPyW36Q2SIcFLxyi7RGYuJAqeiSKYdcjDEw&_nc_ohc=_F9zaovc0wQAX9xM4PT&_nc_ht=scontent-jnb1-1.xx&oh=7a8facdb65c006ddbbf8525cb2907b83&oe=5E90AB10',
      userID: 4
    },
    {
      name: 'Manzi Guevara',
      email: "guevar@stackup.com",
      picture: 'https://scontent-jnb1-1.xx.fbcdn.net/v/t1.0-9/1470187_545513135535102_539884773_n.jpg?_nc_cat=107&_nc_sid=05277f&_nc_eui2=AeEbFax_OoF1imf6bpmwg5GHe8NndJcHShgIx_uxOOne_-N6hSQncXBSx60bocBZJazHBoyXSOXHzWo9uZY3U6090yI4NobzCDaoTfhobfk6PA&_nc_ohc=6uKuA5IhvYIAX96avUz&_nc_ht=scontent-jnb1-1.xx&oh=fe52ad8346560d30b3cb55f2b9122ff0&oe=5E95208D',
      userID: 5
    }
  ]
};

const reducer = (state = initialStatus, action) => {
  if (action.type === LOGIN_USER) {
    const incomingUserData = action.newUser;
    const updatedLoggedInUsers = [
      ...state.loggedInUsers,
      incomingUserData
    ];
    return {
      ...state,
      loggedInUsers: updatedLoggedInUsers
    }
  } else if (action.type === "ADD_LOGGEDIN_USER_FROM_SOCKET") {
    return {
      ...state,
      loggedInUsers: [...state.loggedInUsers, action.newUser]
    };
  } else if (action.type === "ADD_FETCHED_USERS") {
    return {
      ...state,
      loggedInUsers: [...state.loggedInUsers, ...action.users]
    };
  } else if (action.type === LOGOUT_USER) {
    const userToLogout = action.user
    const unloggedOutUsers = state.loggedInUsers.filter(users => {
      return users.userID !== userToLogout;
    })
    axios.post('api/facebooklogout', { userID: userToLogout })
      .then((information) => {
        if (information.data.status === 200) {
          window.FB.logout(() => window.location.href = '/');
        }
      })
      .catch(error => { console.log(error) });
    return {
      ...state,
      loggedInUsers: unloggedOutUsers
    }
  }
  return state;
};

export default reducer;
