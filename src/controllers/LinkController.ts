import { ValidationError } from "../helpers/http";
import { safeThrow } from "../helpers/safe-throw";
import { LinkService } from "../services/LinkService";

// --------------------------------------------------------------
// API actions
// --------------------------------------------------------------
/** List all shortened links */
export const getAll = safeThrow(async (req, res) => {
  const result = await LinkService.getAllLinks();

  return res.json(result);
});

/** Get stats from shortened link */
export const getByHash = safeThrow(async (req, res) => {
  const { hash } = req.params;
  const result = await LinkService.getLink(hash);

  return res.json(result);
});

/** Delete shortened link */
export const deleteByHash = safeThrow(async (req, res) => {
  const { hash } = req.params;
  const result = await LinkService.deleteLink(hash);

  return res.json(result);
});

/** Create a new shortened link */
export const create = safeThrow(async (req, res) => {
  const { link } = req.body;

  if (!link) {
    throw new ValidationError("Link field is required", {
      link: ["Link field is required"],
    });
  }

  const result = await LinkService.createLink(link);

  return res.json(result);
});


// --------------------------------------------------------------
// Page actions
// --------------------------------------------------------------

/** Redirect to the original link */
export const redirectShortLink = safeThrow(async (req, res) => {
    const { hash } = req.params;
    const originalLink = await LinkService.getOriginalLink(hash);

    return res.redirect(originalLink);
});

/** Render links page */
export const renderLinksPage = (req, res) => {
    res.render("links", { user: req.session['user']});
}