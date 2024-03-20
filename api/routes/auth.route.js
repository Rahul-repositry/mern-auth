import express from "express";
const router = express.Router();
import { signup } from "../controllers/auth.controller.js";
import { test } from "../controllers/user.controller.js";
router.get("/test", test);
router.post("/signup", signup);
// router.post('/signin', signup);
// router.post('/google', signup);
// router.post('/signout', signup);

export default router;
