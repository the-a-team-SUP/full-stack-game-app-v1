import Router from "express";
import passport from 'passport';
import userController from "../controllers/userController";

const router = Router();
router.use(passport.initialize());

router.get('/failed', (req, res) => { res.send('failed'); });
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/failed' }), userController.login);
router.post('/facebooklogout', userController.logout);
router.get("/loggedinusers", userController.getLoggedInUsers);

export default router;
