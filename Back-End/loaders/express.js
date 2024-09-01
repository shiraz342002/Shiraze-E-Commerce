import express from "express"
import cors from "cors"
import helmet from "helmet"
import bodyParser from "body-parser"
import authenticate from "../middlewares/authenticate.js"
import { protectedRouter, unProtectedRouter } from "../routes/index.js"
import multer from 'multer';
import path  from 'path';


export default async function expressLoader({ app }) {
  app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));
 


  app.use(express.json())
  app.use(bodyParser.json())

  app.use("/api", authenticate)
  app.use("/api", protectedRouter)
  app.use("/", unProtectedRouter)
}
