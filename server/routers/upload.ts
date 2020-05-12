import express, { Router, Response, Request, NextFunction } from "express";
import multer from "multer";
import path from "path";

const router: Router = express.Router();

const imageUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "server/static/iamges");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post(
  "/image",
  imageUpload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.file.filename);
  }
);
export default router;
