// DEBUG=app:* node scripts/mongo/seedApiKeys.js
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:scripts:api-keys');
const MongoLib = require('../lib/db');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:users',
  'create:users',
  'update:users',
  'delete:users',
];

const publicScopes = [
  'signin:auth',
  'signup:auth'
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes
  }
];

function generateRandomToken() {
  const buffer = bcrypt.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const store = require('../models/apiKeys');
    MongoLib.connect();
    const promises = apiKeys.map(async apiKey => {
      const created = new store(apiKey);
      await created.save();
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api keys have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();