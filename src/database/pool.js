import { Pool } from 'pg';
import config from '../../env';

const databaseConfig = { connectionString: config.database_url, ssl: {rejectUnauthorized: false }};
const pool = new Pool(databaseConfig);

export default pool;
