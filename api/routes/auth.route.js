import express from "express";
const router = express.Router();
import { signup, signin, google } from "../controllers/auth.controller.js";
import { test } from "../controllers/user.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
// router.post('/signout', signup);

export default router;
