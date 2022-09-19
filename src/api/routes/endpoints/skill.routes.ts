import { Router } from 'express';
import { SkillController } from '../../controllers/skill.controller';

const skillRouter = Router();

skillRouter.get('/', SkillController.getAll);
skillRouter.get('/:id', SkillController.getById)
skillRouter.post('/', SkillController.create);
skillRouter.put('/:id', SkillController.update);
skillRouter.delete('/:id', SkillController.delete);


export default skillRouter;