import dotenv from 'dotenv';
dotenv.config();

export default {
    database_url: process.env.DATABASE_URL,
    secret: process.env.SECRET,
    environment: process.env.NODE_ENV,
    port: process.env.PORT || 4000
}