const { customAlphabet, urlAlphabet } = require("nanoid");
const { NotFoundError } = require("../helpers/http");

class LinkService {
  static storage = {};

  static createLink(original, size = 4) {
    const hash = customAlphabet(urlAlphabet, size)();
    this.storage[hash] = {
      original,
      visits: 0,
    };

    return {
      original,
      hash,
    };
  }

  static getOriginalLink(hash) {
    const link = this.storage[hash];

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    link.visits++;

    return link.original;
  }

  static getLink(hash) {
    const link = this.storage[hash];

    if (!link) {
      throw new NotFoundError("Link not found");
    }

    return { hash, ...link };
  }

  static deleteLink(hash) {
    const link = this.storage[hash];

    if (!link) {
      throw new NotFoundError("Link not found");
    }
    delete this.storage[hash];

    return { hash, ...link };
  }

  static getAllLinks() {
    return Object.entries(this.storage).map((v) => {
      return {
        hash: v[0],
        original: v[1].original,
        visits: v[1].visits,
      };
    });
  }
}

module.exports = LinkService;
