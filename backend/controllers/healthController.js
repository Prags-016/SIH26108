const env = require('../config/env');
const { sendJson } = require('../utils/http');

function getHealth(req, res) {
  sendJson(res, 200, {
    status: 'ok',
    data_last_synced: env.dataLastSynced
  });
}

module.exports = { getHealth };
