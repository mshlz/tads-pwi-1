const { customAlphabet, urlAlphabet } = require("nanoid");
const { NotFoundError } = require("../helpers/http");
const Link = require("../models/Link");

class LinkService {
  static storage = {};

  static async createLink(original, size = 4) {
    const hash = customAlphabet(urlAlphabet, size)();

    const link = await Link.create({
      hash,
      original,
    });

    return link;
  }

  static async getOriginalLink(hash) {
    const link = await Link.findOne({ where: { hash } });

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    link.visits++;
    await link.save();

    return link.original;
  }

  static async getLink(hash) {
    const link = await Link.findOne({ where: { hash } });

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    return link;
  }

  static async deleteLink(hash) {
    const link = await Link.findOne({ where: { hash } });

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    const result = await link.destroy()

    return { success: !!result };
  }

  static async getAllLinks() {
    return Link.findAll();
  }
}

module.exports = LinkService;
