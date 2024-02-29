import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { dataSource } from './migrations'
import '@src/containers'
import { router } from '@src/routes'
import 'reflect-metadata'

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}!`)
    })
  })
  .catch((e: any) => {
    console.log(e)
  })
