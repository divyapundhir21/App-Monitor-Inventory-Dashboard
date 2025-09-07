const axios = require('axios');
const Application = require('./models/Application');


async function checkUrl(url, timeoutMs = 8000) {
if (!url) return { status: 'UNKNOWN', httpCode: null, responseTimeMs: null };
const start = Date.now();
try {
const resp = await axios.get(url, { timeout: timeoutMs });
const now = Date.now();
const status = resp.status >= 200 && resp.status < 400 ? 'UP' : 'DOWN';
return { status, httpCode: resp.status, responseTimeMs: now - start };
} catch (err) {
return { status: 'DOWN', httpCode: err.response?.status || null, responseTimeMs: null };
}
}


async function checkAllApps() {
const apps = await Application.find({});
for (const app of apps) {
const target = app.prodUrl || app.testUrl;
const result = await checkUrl(target);
app.statusHistory = (app.statusHistory || []).slice(-49);
app.statusHistory.push({
url: target,
status: result.status,
httpCode: result.httpCode,
responseTimeMs: result.responseTimeMs,
checkedAt: new Date()
});
app.currentStatus = result.status;
app.lastCheckedAt = new Date();
await app.save();
}
}


async function checkAppById(appId) {
const app = await Application.findById(appId);
if (!app) throw new Error('App not found');
const target = app.prodUrl || app.testUrl;
const result = await checkUrl(target);
app.statusHistory = (app.statusHistory || []).slice(-49);
app.statusHistory.push({
url: target,
status: result.status,
httpCode: result.httpCode,
responseTimeMs: result.responseTimeMs,
checkedAt: new Date()
});
app.currentStatus = result.status;
app.lastCheckedAt = new Date();
await app.save();
return app;
}


module.exports = { checkUrl, checkAllApps, checkAppById };