import userHelper from '../helpers/userHelper';

class UserController {
    static async login(req, res) {
        const { name, email, picture, userID } = req.body;
        const exists = await userHelper.userExists(userID);
        let updated;
        if(exists){
            updated = await userHelper.login(userID, true); 
        } else {
            updated = await userHelper.saveUser({ name, email, picture, userID, isLoggedIn: true });
        }
        if(updated){
            return res.status(200).json({ status: 200, message: 'successfully logged in' });
        }
        return res.status(500).json({ status: 500, message: 'error logging in' });
    }
};

export default UserController;