import databaseConfig  from "../config/database/config";
import config from "../config/index";


export class DataBaseLoader {
  public static openConnection = async () => {
    databaseConfig.initialize()
      .then(() => {
        console.log(`Database ${config.database.name} is connected and is running on port ${config.database.port}`);
      })  
      .catch(err => {
        console.error('Unable to connect to the database')
        console.error(err)
        throw new Error("Unable to connect to database")
      })
  }
}