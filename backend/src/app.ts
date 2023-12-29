import 'dotenv/config'
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}!`)
});

app.use(cors());


