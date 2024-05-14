const CacheService = require("../CacheService");

const cache = new CacheService();
const MAX_COUNT = 100; // 100 api call in 5 mins

const rateLimit = async (req, resp, next) => {
  try {
    const { ip } = req;
    const key = `RATE_IP:${ip}`;
    const count = await cache.get(key);
    if (!count) {
      await cache.set(key, 1, 60 * 5); // 5 minutes
    } else {
      if (count > MAX_COUNT)
        return resp.status(400).json({ message: "Limit reached" });

      await cache.increment(key);
    }
    next();
  } catch (err) {
    resp.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = rateLimit;
