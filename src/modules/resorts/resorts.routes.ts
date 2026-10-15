import { Router } from "express";
import {
  getResorts,
  getResort,
} from "../resorts/resorts.controller";

const router = Router();

router.get("/", getResorts);

router.get("/:id", getResort);

export default router;