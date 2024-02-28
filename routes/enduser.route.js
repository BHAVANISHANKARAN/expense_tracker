import express from "express";
import enduserController from "../controllers/enduser.controller.js";

const router = express.Router();

router.route("/signup").post(enduserController.signup);
router.route("/login").post(enduserController.login);
router.route("/logout").post(enduserController.logout);

export default router;
