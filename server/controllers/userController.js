/* eslint-disable require-jsdoc */
import userHelper from "../helpers/userHelper";

class UserController {
  static async login(req, res) {
    const {
      name, email, picture, userID
    } = req.body;
    const exists = await userHelper.userExists(userID);
    let updated;
    if (exists) {
      updated = await userHelper.login(userID, true);
    } else {
      updated = await userHelper.saveUser({
        name,
        email,
        picture,
        userID,
        isLoggedIn: true
      });
    }
    if (updated) {
      return res
        .status(200)
        .json({ status: 200, message: "successfully logged in" });
    }
    return res.status(500).json({ status: 500, message: "error logging in" });
  }

  static async getLoggedInUsers(req, res) {
    const users = await userHelper.findLoggedInUsers(true);
    res.status(200).json({ status: 200, data: users });
  }


  static async logout(req, res) {
    let updated;
    const { userID } = req.body;
    const exists = await userHelper.userExists(userID);

    if (exists.isLoggedIn === false) {
      return res.status(200).json({ status: 200, message: 'Already logged out' });
    }

    if (exists) {
      updated = await userHelper.login(userID, false);
    }

    if (updated) {
      return res.status(200).json({ status: 200, message: 'successfully logged out' });
    }

    return res.status(400).json({ status: 400, message: 'Something wrong happen' });
  }
}

export default UserController;
