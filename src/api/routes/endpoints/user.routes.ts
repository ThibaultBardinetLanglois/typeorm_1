import { Router } from 'express';
import { UserController } from '../../controllers/user.controller';

const userRouter = Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getById)
userRouter.post('/', UserController.create);
userRouter.put('/:id', UserController.update);
userRouter.delete('/:id', UserController.delete);


export default userRouter;