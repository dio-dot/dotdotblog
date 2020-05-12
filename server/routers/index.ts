import express, { Router } from "express";
import upload from "./upload";
import path from "path";

const router: Router = express.Router();
router.use("/upload", upload);
router.use("/image", express.static(path.join(__dirname, "/../static/images")));

export default router;
