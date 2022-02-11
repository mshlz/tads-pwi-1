import { customAlphabet, urlAlphabet } from "nanoid";
import { NotFoundError } from "../helpers/http";
import { Link } from "../models/Link";

class LinkService {
  static storage = {};

  static async createLink(original: string, size = 4) {
    const hash = customAlphabet(urlAlphabet, size)();

    const link = Link.create({
      hash,
      original,
    });

    return link.save();
  }

  static async getOriginalLink(hash: string) {
    const link = await Link.findOne({ where: { hash } });

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    link.visits++;
    await link.save();

    return link.original;
  }

  static async getLink(hash: string) {
    const link = await Link.findOne({ where: { hash } });

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    return link;
  }

  static async deleteLink(hash: string) {
    const link = await Link.findOne({ where: { hash } });

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    const result = await link.remove()

    return { success: !!result };
  }

  static async getAllLinks() {
    return Link.find();
  }
}

module.exports = LinkService;
