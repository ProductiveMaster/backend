// DEBUG=app:* node scripts/seedApiKeys.js
const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const MongoLib = require('../lib/db');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:users',
  'create:users',
  'update:users',
  'delete:users',
  'create:joboffer', 
  'update:joboffer',
  'delete:joboffer',
  'read:joboffer',
  'update:jobapplication',
  'read:jobapplication'
];

const masterScopes = [
  'signin:auth',
  'signup:auth',
  'create:users',
  'create:joboffer',
  'update:joboffer',
  'read:joboffer',
  'create:jobapplication',
  'update:jobapplication',
  'read:jobapplication'
];

const tpCoachScopes = [
  'signin:auth',
  'signup:auth',
  'create:joboffer',
  'update:joboffer',
  'read:joboffer',
  'update:jobapplication',
  'read:jobapplication'
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
    type: 'admin'
  },
  {
    token: generateRandomToken(),
    scopes: masterScopes,
    type: 'master'
  },
  {
    token: generateRandomToken(),
    scopes: tpCoachScopes,
    type: 'tpcoach'
  }
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
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