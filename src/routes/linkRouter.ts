import { Router } from 'express';
import { ValidationError } from "../helpers/http";
import { safeThrow } from "../helpers/safe-throw";
import { LinkService } from "../services/LinkService";

const router = Router({ mergeParams: true });

/**
 * Link shortener routes
 */

/** List all shortened links */
router.get("/", safeThrow(async (req, res) => {
  const result = await LinkService.getAllLinks();

  return res.json(result);
}));

/** Get stats from shortened link */
router.get("/:hash", safeThrow(async (req, res) => {
  const { hash } = req.params;
  const result = await LinkService.getLink(hash);

  return res.json(result);
}));

/** Delete shortened link */
router.delete("/:hash", safeThrow(async (req, res) => {
  const { hash } = req.params;
  const result = await LinkService.deleteLink(hash);

  return res.json(result);
}));

/** Create a new shortened link */
router.post("/", safeThrow(async (req, res) => {
  const { link } = req.body;

  if (!link) {
    throw new ValidationError("Link field is required", {
      link: ["Link field is required"],
    });
  }

  const result = await LinkService.createLink(link);

  return res.json(result);
}));

export default router