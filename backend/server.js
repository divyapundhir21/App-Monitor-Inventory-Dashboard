const express = require('express');
const mongoose = require('mongoose');
const App = require('./models/Application');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/appmonitor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Get all apps
app.get('/api/apps', async (req, res) => {
  const { search } = req.query;
  let query = {};
  if(search) {
    query = {
      $or: [
        { appId: { $regex: search, $options: 'i' } },
        { technicalOwner: { $regex: search, $options: 'i' } }
      ]
    };
  }
  const apps = await App.find(query);
  res.json(apps);
});

// Add app (admin only)
app.post('/api/apps', async (req, res) => {
  const newApp = new App(req.body);
  await newApp.save();
  res.status(201).json(newApp);
});

// Update app (admin only)
app.put('/api/apps/:id', async (req, res) => {
  const updatedApp = await App.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedApp);
});

// Delete app (admin only)
app.delete('/api/apps/:id', async (req, res) => {
  await App.findByIdAndDelete(req.params.id);
  res.json({ message: 'App deleted' });
});

app.listen(5000, () => console.log('Server running on port 5000'));
