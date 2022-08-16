import express from 'express';
import { commentController } from '../controllers';
const router = express.Router();

router.post('/comment', commentController.createComment); //댓글 작성

export default router;
