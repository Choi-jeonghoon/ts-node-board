import express from 'express';
import boardRouter from './board';
import commentRouter from './comment';
import { specs, swaggerUi } from '../modules/swagger';

const router = express.Router();
router.use(boardRouter);
router.use(commentRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

export default router;
