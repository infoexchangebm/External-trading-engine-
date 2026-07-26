import { Router, type IRouter } from "express";
import healthRouter from "./health";
import signalsRouter from "./signals";
import dataRouter from "./data";
import webhookRouter from "./webhook";
import configRouter from "./config";
import scannerRouter from "./scanner";

const router: IRouter = Router();

router.use(healthRouter);
router.use(signalsRouter);
router.use(dataRouter);
router.use(webhookRouter);
router.use(configRouter);
router.use(scannerRouter);

export default router;
