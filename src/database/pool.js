import { Pool } from 'pg';
import config from '../../env';

const databaseConfig = { connectionString: config.database_url };
const pool = new Pool(databaseConfig);

export default pool;