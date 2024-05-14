const logger = (req, resp, next) => {
  console.log("API : ", req.method, req.url, req.body, req.headers);
  next();
};

module.exports = logger;
