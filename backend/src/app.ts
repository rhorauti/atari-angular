import 'dotenv/config'
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { dataSource } from './core/migrations';
import '@core/containers';
import { router } from '@core/routes';
import { errors } from 'celebrate';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errors());

dataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`)
  });
})



