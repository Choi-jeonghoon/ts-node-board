import express from 'express';
import boardRouter from './board';
import commentRouter from './comment';
// import { specs, swaggerUi } from '../modules/swagger';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

const swaggerSpec = YAML.load(path.join(__dirname, '../swagger/apiDocs.yaml'));
const router = express.Router();

router.use(boardRouter);
router.use(commentRouter);
// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
