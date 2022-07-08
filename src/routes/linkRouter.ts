import { Router } from 'express';
import * as LinkController from "../controllers/LinkController";

const router = Router({ mergeParams: true });

/**
 * Link shortener routes
 */

/** List all shortened links */
router.get("/", LinkController.getAll);

/** Get stats from shortened link */
router.get("/:hash", LinkController.getByHash);

/** Delete shortened link */
router.delete("/:hash", LinkController.deleteByHash);

/** Create a new shortened link */
router.post("/", LinkController.create);

export default router