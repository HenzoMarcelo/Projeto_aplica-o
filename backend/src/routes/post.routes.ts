import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticateToken);

router.get("/", postController.listPosts);
router.get("/:id", postController.getPost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;

