import { Router } from "express";

import { CustomerRouter } from "./customer.routes";
import { ProductRouter } from "./product.routes";

export const router = Router();

router.use("/customer", CustomerRouter);
router.use("/product", ProductRouter);
