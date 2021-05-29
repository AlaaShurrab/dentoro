require('dotenv').config();

const { Pool } = require('pg');

let dbUrl = '';
let ssl = {
  rejectUnauthorized: false,
};
const {
  env: { NODE_ENV, TEST_DB_URL, DEV_DB_URL, DATABASE_URL },
} = process;

switch (NODE_ENV) {
  case 'production':
    dbUrl = DATABASE_URL;
    break;

  case 'development':
    dbUrl = DEV_DB_URL;
    ssl = false;
    break;

  case 'test':
    dbUrl = TEST_DB_URL;
    ssl = false;
    break;

  default:
    throw new Error('There is no Database url !!!');
}

const option = {
  connectionString: dbUrl,
  ssl,
};

module.exports = new Pool(option);
