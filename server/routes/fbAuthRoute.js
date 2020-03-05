import Router from "express";
import userController from "../controllers/userController";

const router = Router();

router.post("/facebooklogin", userController.login);
router.get("/loggedinusers", userController.getLoggedInUsers);

export default router;
