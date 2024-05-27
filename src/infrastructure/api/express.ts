import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";

import helmet from "helmet";
import { Sequelize } from "sequelize-typescript";
import { CustomerModel } from "../customer/repository/sequelize/customer.model";
import { ProductModel } from "../product/repository/sequelize/product.model";

export const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppErrors) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export class AppErrors {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });
  await sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}
setupDb();
