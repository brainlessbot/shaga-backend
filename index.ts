import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './common/config';
import routes from './routes';

const { DB_HOST, DB_NAME, PORT = 3000 } = process.env;

const app = express();

app.use(rateLimit(config.rateLimiter));
app.use(helmet());

app.use(cors());
app.options('*', cors() as express.RequestHandler);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${DB_HOST}/${DB_NAME}`);

app.use(routes);

app.listen(PORT);
