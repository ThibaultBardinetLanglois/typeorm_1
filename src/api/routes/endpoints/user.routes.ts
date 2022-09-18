import { Router } from 'express';
import { UserController } from '../../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getById)
userRouter.post('/', UserController.create);


export default userRouter;