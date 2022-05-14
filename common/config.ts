const config = {
  logs: {
    requestFilename: 'logs/request.log',
    errorFilename: 'logs/error.log',
  },
  rateLimiter: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  },
};

export default config;
