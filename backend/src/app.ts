import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import { dataSource } from './core/migrations';
import '@core/containers';
import { router } from '@core/routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

dataSource.initialize().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}!`)
  });
})



