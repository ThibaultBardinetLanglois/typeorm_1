import { Router } from 'express';
import * as UserController from '../../controllers/user.controller';

const userRouter: Router = Router();

userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getById)
userRouter.post('/', UserController.create);
userRouter.put('/:id', UserController.update);
userRouter.delete('/:id', UserController.deleteUser);

userRouter.put('/:id/skills', UserController.updateUserSkills);


export default userRouter;