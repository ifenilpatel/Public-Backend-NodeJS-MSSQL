const sql = require("mssql");

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  server: process.env.DATABASE_HOST,
  database: process.env.DATABASE_TITLE,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  pool: {
    max: 20,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const dbPool = async (req, res, next) => {
  try {
    const pool = await sql.connect(config);
    req.sql = pool;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = dbPool;
