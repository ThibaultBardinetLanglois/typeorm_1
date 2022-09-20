import { DataSource } from "typeorm";
import config  from "../index";
import User from "../../entities/user.entity";
import Skill from "../../entities/skill.entity";
import { SkillToUser } from "../../entities/skillToUser.entities";
     
const databaseConfig  = new DataSource({
  type: "mysql",
  port: Number(config.database.port),
  username: config.database.user,
  password: config.database.password!,
  database: config.database.name!,
  logging: true,
  entities: [User, Skill, SkillToUser],
  subscribers: [],
  migrations: [],
  synchronize: true
}) 

export default databaseConfig;
