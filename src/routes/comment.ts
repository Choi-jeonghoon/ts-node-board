import express from 'express';
import { commentController } from '../controllers';
const router = express.Router();

router.post('/comment', commentController.createComment); //λκΈ μμ±

export default router;
