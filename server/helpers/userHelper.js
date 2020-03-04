import models from "../models";

const { User } = models;

/**
 * This class contains
 * all methods required to save/edit/retrieve/delete
 * the user's data
 */
class UserHelper {
  /**
   * Saves the user in the DB.
   * @param {object} user The request sent by a user.
   * @returns {object} The users's data.
   */
  static async saveUser(user) {
    const acceptedUser = await User.create(
      {
        ...user,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fields: [
          "name",
          "picture",,
          "email",
          "userID",
          "isLoggedIn",
          "createAt",
          "updatedAt"
        ]
      }
    );
    return acceptedUser;
  }

   /**
     * Finds the user's email if he/she exists.
     * @param {string} id users table field.
     * @returns {object} The users's data.
   */
  static async userExists(id) {
    const user = await User.findOne({ where: { userID: id } });
    return user;
  }

  /**
     * updates the isLoggedIn field on a user's record.
     * @param {string} id users id table field.
     * @param {boolean} state is loggedin field update.
     * @returns {object} The users's data.
   */
  static async login(id, state) {
    const user = await User.update({ isLoggedIn: state }, { where: { userID: id } });
    return user;
  }

}

export default UserHelper;
