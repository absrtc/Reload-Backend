const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express.Router();

const config = JSON.parse(fs.readFileSync("./Config/config.json").toString());

app.get("/api/launcher/paks", (req, res) => {
  fs.readdir(config.launcher.paksDir, (err, f) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to read paks, build may be invalid!" });
    }

    const files = f
      .filter((file) => file.endsWith(".pak"))
      .map((file) => {
        const filePath = path.join(config.launcher.paksDir);
        const stats = fs.statSync(filePath);

        return {
          name: file,
          size: stats.size,
        };
      });

    res.json(files);
  });
});

module.exports = app;
