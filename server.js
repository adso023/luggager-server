import express from 'express';
import cors from 'cors';
import env from './env';
import userRoute from './src/routes/userRoute';
import tripRoute from './src/routes/tripRoute';
import bagRoute from './src/routes/bagRoute';
import itemRoute from './src/routes/itemRoute';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', userRoute);
app.use('/', tripRoute);
app.use('/', bagRoute);
app.use('/', itemRoute);

app.listen(env.port).on('listening', () => {
    console.log(`🚀 are live on ${env.port}`);
});
