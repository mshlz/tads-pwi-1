const { customAlphabet, urlAlphabet } = require("nanoid");

class LinkService {
  static storage = {};

  static createLink(original, size = 4) {
    const hash = customAlphabet(urlAlphabet, size)();
    this.storage[hash] = original;

    return {
      original,
      hash,
    };
  }

  static getLink(hash) {
    return this.storage[hash];
  }

  static getAllLinks() {
    return Object.entries(this.storage).map((v) => {
      return {
        hash: v[0],
        original: v[1],
      };
    });
  }
}

module.exports = LinkService;
