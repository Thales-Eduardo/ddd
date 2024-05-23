import { Router } from "express";

import { CustomerRouter } from "./customer.routes";

export const router = Router();

router.use("/customer", CustomerRouter);
