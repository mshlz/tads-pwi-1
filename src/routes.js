const { ValidationError } = require("./helpers/http");
const LinkService = require("./services/LinkService");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello world!");
});

/**
 * Link shortener routes
 */

/** List all shortened links */
router.get("/links", (req, res) => {
  const result = LinkService.getAllLinks();

  return res.json(result);
});

/** Get stats from shortened link */
router.get("/links/:hash", (req, res) => {
  const { hash } = req.params;
  const result = LinkService.getLink(hash);

  return res.json(result);
});

/** Create a new shortened link */
router.post("/links", (req, res) => {
  const { link } = req.body;

  if (!link) {
    throw new ValidationError("Link field is required", {
      link: ["Link field is required"],
    });
  }

  const result = LinkService.createLink(link);

  return res.json(result);
});

/** Redirect to the original link */
router.get("/l/:hash", (req, res) => {
  const { hash } = req.params;
  const originalLink = LinkService.getOriginalLink(hash);

  return res.redirect(originalLink);
});

module.exports = router;
