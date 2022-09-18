import { DataSource } from "typeorm";
import config  from "../index";
 import User from "../../entities/user.entity";
     
const databaseConfig  = new DataSource({
  type: "mysql",
  port: Number(config.database.port),
  username: config.database.user,
  password: config.database.password!,
  database: config.database.name!,
  logging: true,
  entities: [User],
  subscribers: [],
  migrations: [],
}) 

export default databaseConfig;
