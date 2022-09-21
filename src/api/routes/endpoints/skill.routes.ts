import { Router } from 'express';
import * as SkillController from '../../controllers/skill.controller';

const skillRouter: Router = Router();

skillRouter.get('/', SkillController.getAll);
skillRouter.get('/:id', SkillController.getById)
skillRouter.post('/', SkillController.create);
skillRouter.put('/:id', SkillController.update);
skillRouter.delete('/:id', SkillController.deleteSkill);


export default skillRouter;