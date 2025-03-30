import { FileJsonTodoApi } from './fileJsonTodoApi';
import { MongoDbTodoApi } from './mongoDbTodoApi';
import { ITodoApi } from './mongoDbTodoApi';

export class FactoryApi {
  static getClass(dbType?: string): ITodoApi {
    if (!dbType || dbType === 'FILE') {
      return new FileJsonTodoApi();
    } else if (dbType === 'MONGODB') {
      return new MongoDbTodoApi();
    } else {
      console.warn(`Unknown DB_TYPE: ${dbType}, falling back to file-based implementation`);
      return new FileJsonTodoApi();
    }
  }
}