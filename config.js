// config.js
/**
 * Hardcoded environment variables for demo purposes.
 * Each environment level (dev, staging, prod) has its own set.
 */
module.exports = {
  dev: {
    DB_HOST: 'dev.db.local',
    API_KEY: 'dev123'
  },
  staging: {
    DB_HOST: 'staging.db.internal',
    API_KEY: 'staging456'
  },
  prod: {
    DB_HOST: 'prod.db.public',
    API_KEY: 'prod789'
  }
};
