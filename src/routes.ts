import { ValidationError } from "./helpers/http";
import { safeThrow } from "./helpers/safe-throw";
import { LinkService } from "./services/LinkService";
import { Router } from 'express'

const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});

/**
 * Link shortener routes
 */

/** List all shortened links */
router.get("/api/links", safeThrow(async (req, res) => {
  const result = await LinkService.getAllLinks();

  return res.json(result);
}));

/** Get stats from shortened link */
router.get("/api/links/:hash", safeThrow(async (req, res) => {
  const { hash } = req.params;
  const result = await LinkService.getLink(hash);

  return res.json(result);
}));

/** Delete shortened link */
router.delete("/api/links/:hash", safeThrow(async (req, res) => {
  const { hash } = req.params;
  const result = await LinkService.deleteLink(hash);

  return res.json(result);
}));

/** Create a new shortened link */
router.post("/api/links", safeThrow(async (req, res) => {
  const { link } = req.body;

  if (!link) {
    throw new ValidationError("Link field is required", {
      link: ["Link field is required"],
    });
  }

  const result = await LinkService.createLink(link);

  return res.json(result);
}));

/** Redirect to the original link */
router.get("/l/:hash", safeThrow(async (req, res) => {
  const { hash } = req.params;
  const originalLink = await LinkService.getOriginalLink(hash);

  return res.redirect(originalLink);
}));

export default router