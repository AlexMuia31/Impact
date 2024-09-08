import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import cors from "cors";
import cron from 'node-cron';
import {onRampCompleteTxn } from './routes/onRampTxnChecker';
import {offRampCompleteTxn } from "./routes/offRampTxnChecker"
import { config } from "./config";

const app = express();


const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } [${new Date().toLocaleString()}]`
  );
  next();
};

// config
if (config.APP.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "../.env" });
}

// Cors Options
var corsOptions = {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  optionSuccessStatus:200,
  credentials:true,
};


// middlewares
app.use(express.json());
app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(logger);

// ROOT ROUTE
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "[ROOT ROUTE]: OFF-THE-RAMP API WORKS!",
  });
});

// Import Routes
import "./routes";
import "./database"

// CRON JOBS
// Schedule the cron job to check Completed ONRAMP transactions
export const onRampcronJob = () => {
  let task = cron.schedule(`*/${config.APP.ONRAMPCRON_TIME} * * * *`, async () => {
    console.log('Running ONRAMP Txn Checker task every 5 minutes');
    const resp =await onRampCompleteTxn().then((data) => {
      return data
    });
    console.log("CRON JOB RESPONSE::", resp);

  });
  task.start();
}
// onRampcronJob();

// Schedule the cron job to check Completed OFFRAMP  transactions
export const offRampcronJob = () => {
  let task = cron.schedule(`*/${config.APP.OFFRAMPCRON_TIME} * * * *`, async () => {
    console.log('Running OFFRAMP Txn Checker task every 3 minutes');
    const resp =await offRampCompleteTxn("10","0757607611","USDT").then((data) => {
      return data
    });
    console.log("CRON JOB RESPONSE::", resp);

  });
  task.start();
}
// offRampcronJob();

// Error Handlers
app.use("*", (req: Request, res: Response) => {
  console.log(req.originalUrl);
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export { app };
