import express from "express";
import shortid from "shortid";

const router = express.Router;
const cache = new CacheService();

router.post("/api/v1/url", async (req, res) => {
  try {
    const { url, ttl } = req.body;

    if (!url) return res.status(400).json({ message: "Url is required" });

    const id = shortid.generate();

    const shortUrl = `http://localhost:4000/api/v1/url/${id}`;

    await cache.set(id, url, ttl ?? 24 * 60 * 60); // default 24 hour

    return res.json({ message: "Created", url: shortUrl });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/api/v1/url/:short", async (req, res) => {
  try {
    const { short } = req.params;

    const url = await cache.get(short);

    if (!url) {
      return res.status(400).json({ message: "Url not found" });
    }

    return res.redirect(url);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
