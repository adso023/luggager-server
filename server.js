import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import env from './env';
import userRoute from './src/routes/userRoute';
import tripRoute from './src/routes/tripRoute';
import bagRoute from './src/routes/bagRoute';
import itemRoute from './src/routes/itemRoute';

const app = express();

app.use(logger(':date[clf] ":method :url"'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', userRoute);
app.use('/', tripRoute);
app.use('/', bagRoute);
app.use('/', itemRoute);

app.listen(env.port).on('listening', () => {
    console.log(`🚀 are live on ${env.port}`);
});
