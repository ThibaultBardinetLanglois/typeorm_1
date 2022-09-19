import Skill from "../entities/skill.entity";
import databaseConfig from "../config/database/config";

const skillRepository = databaseConfig.getRepository(Skill);

export class SkillService {

  public static async getAll(): Promise<Array<Skill>> {
    console.log("coucou");
    
    return await skillRepository.find();
  }

  public static async getById(id: number): Promise<Skill | null> {
    return await skillRepository.findOneBy({
      id: id
    });
  }

  public static async create(skill: Skill): Promise<Skill> {
    return await skillRepository.save(skill);
  }

  public static async update(skillId: number, skill: Skill): Promise<Skill> {
    const skillToUpdate = await skillRepository.findOneBy({
      id: skillId
    });
    const updatedSkill = {...skillToUpdate, ...skill};
    return await skillRepository.save(updatedSkill);
  }

  public static async delete(skillId: number) {
    const skillToRemove = await skillRepository.findOneBy({id: skillId});
    if (skillToRemove) {
      return await skillRepository.remove(skillToRemove);
    } else {
      throw new Error("Problem to remove skill or skill doesn't exist in database")
    }
  }
}