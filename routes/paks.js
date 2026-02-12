const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express.Router();

const paksdir = path.join("C:\\Users\\User\\Documents\\testPath\\Fortnite 8.51\\FortniteGame\\Content\\Paks");

app.get("/api/launcher/paks", (req, res) => {
    fs.readdir(paksdir , (err, f) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read paks, build may be invalid!" });
        }

        const files = f
            .filter(file => file.endsWith(".pak"))
            .map(file => {
                const filePath = path.join(PAKS_DIR, file);
                const stats = fs.statSync(filePath);

                return {
                    name: file,
                    size: stats.size
                };
            });

        res.json(files);
    });
});

module.exports = app;
