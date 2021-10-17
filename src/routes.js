const { ValidationError, NotFoundError } = require("./helpers/http");
const LinkService = require("./services/LinkService");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Olá mundo!");
});


/**
 * Link shortener routes
 */

/** List all shortened links */
router.get("/links", (req, res) => {
  const result = LinkService.getAllLinks();

  return res.json(result);
});

/** Create a new shortened link */
router.post("/links", (req, res) => {
  const { link } = req.body;

  if (!link) {
    throw new ValidationError("Link field is required", { link: ["Link field is required"] });
  }

  const result = LinkService.createLink(link);

  return res.json(result);
});

/** Redirect to the original link */
router.get("/l/:hash", (req, res) => {
  const { hash } = req.params;
  const originalLink = LinkService.getLink(hash);

  if (!originalLink) {
    throw new NotFoundError("Link not found");
  }

  return res.redirect(originalLink);
});

module.exports = router;
