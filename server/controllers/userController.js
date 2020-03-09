/* eslint-disable require-jsdoc */
import jwt from 'jsonwebtoken';
import userHelper from "../helpers/userHelper";

class UserController {
  static async login(req, res) {
    let picture;
    // eslint-disable-next-line no-underscore-dangle
    const { name, email, id } = req.user._json;
    const userID = parseInt(id, 10);
    const exists = await userHelper.userExists(userID);
    let updated;
    if (exists) {
      updated = await userHelper.login(userID, true);
    } else {
      picture = `https://graph.facebook.com/${userID}/picture?type=large`;
      updated = await userHelper.saveUser({
        name, email, picture, userID, isLoggedIn: true
      });
    }
    if (updated) {
      const token = jwt.sign({
        name, email, userID, picture
      }, process.env.SECRET_KEY);
      return res.redirect(`https://localhost:3000/?token=${token}`);
    }
    return res.status(500).json({ status: 500, message: 'error logging in' });
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
