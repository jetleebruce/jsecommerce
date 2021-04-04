const fs = require("fs");

class UserRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Create a repository requires a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async checkForFile() {}
}

const repo = new UserRepository("users.json");
