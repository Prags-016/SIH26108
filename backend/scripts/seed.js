const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require('mongoose');
const { connectDB, disconnectDB } = require('../config/db');
const Standard = require('../models/Standard');
const standards = require('../data/standards');

async function seed() {
  const ids = standards.map((item) => item.id);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    throw new Error(`Duplicate standard ids in seed data: ${duplicates.join(', ')}`);
  }

  await connectDB();
  await Standard.init();

  let upserts = 0;
  for (const doc of standards) {
    await Standard.updateOne({ id: doc.id }, { $set: doc }, { upsert: true });
    upserts += 1;
  }

  const removed = await Standard.deleteMany({ id: { $nin: ids } });
  console.log(`Seeded ${upserts} Indian Standards into ${mongoose.connection.name}.`);
  console.log(`Removed ${removed.deletedCount} catalogue rows that are no longer in the seed file.`);
  console.log('Example: IS-269 Ordinary Portland Cement.');
}

seed()
  .catch((err) => {
    console.error(err.message || err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDB();
  });
