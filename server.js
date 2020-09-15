import express from 'express';
import cors from 'cors';
import env from './env';
import userRoute from './src/routes/userRoute';
import tripRoute from './src/routes/tripRoute';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', userRoute);
app.use('/', tripRoute);

app.listen(env.port).on('listening', () => {
    console.log(`🚀 are live on ${env.port}`);
});
