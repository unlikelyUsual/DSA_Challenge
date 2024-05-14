const redis = require("redis");

class CacheService {
  client = redis.createClient();
  constructor() {}

  async get(key) {
    return await this.client.getEx(key);
  }

  async set(key, value, ttl) {
    return await this.client.setEx(key, ttl, value);
  }

  async increment(key) {
    return await this.client.incr(key);
  }
}

module.exports = CacheService;
