import { Router } from 'express';
import userRouter from './endpoints/user.routes';
import skillRouter from './endpoints/skill.routes';

const apiRouter: Router = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/skills', skillRouter)


export default apiRouter;