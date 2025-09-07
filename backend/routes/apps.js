const express = require('express');
const router = express.Router();
const App = require('../models/App'); // adjust path if needed
const auth = require('../middleware/auth'); // if you have auth middleware

// ✅ GET all apps
router.get('/', async (req, res) => {
  try {
    const apps = await App.find();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch apps' });
  }
});

// ✅ SEARCH apps by App ID or Technical Owner
// Example: GET /api/apps/search?query=abc
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const apps = await App.find({
      $or: [
        { appId: { $regex: query, $options: 'i' } },
        { technicalOwner: { $regex: query, $options: 'i' } }
      ]
    });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: 'Search failed' });
  }
});

// ✅ GET app by ID
router.get('/:id', async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch app' });
  }
});

// ✅ CREATE app (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    const app = new App(req.body);
    await app.save();
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create app' });
  }
});

// ✅ UPDATE app (Admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const app = await App.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.json(app);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update app' });
  }
});

// ✅ DELETE app (Admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const app = await App.findByIdAndDelete(req.params.id);
    if (!app) return res.status(404).json({ error: 'App not found' });
    res.json({ message: 'App deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete app' });
  }
});

module.exports = router;
