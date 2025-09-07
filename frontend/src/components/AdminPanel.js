import React, { useState } from 'react';
import API from '../api';

export default function AdminPanel({ reload }) {
  const [form, setForm] = useState({
    appId: '',
    appName: '',
    technicalOwner: '',
    prodUrl: '',
    testUrl: '',
    domain: 'Cloud',
    isVendorApp: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/apps', form, {
      headers: { Authorization: 'Bearer your_admin_token' }
    });
    reload();
  };

  return (
    <form className="card p-3 mt-3" onSubmit={handleSubmit}>
      <h5>Add New App</h5>
      <input className="form-control mb-2" name="appId" placeholder="App ID" value={form.appId} onChange={handleChange} />
      <input className="form-control mb-2" name="appName" placeholder="App Name" value={form.appName} onChange={handleChange} />
      <input className="form-control mb-2" name="technicalOwner" placeholder="Technical Owner" value={form.technicalOwner} onChange={handleChange} />
      <input className="form-control mb-2" name="prodUrl" placeholder="Prod URL" value={form.prodUrl} onChange={handleChange} />
      <input className="form-control mb-2" name="testUrl" placeholder="Test URL" value={form.testUrl} onChange={handleChange} />

      <select className="form-control mb-2" name="domain" value={form.domain} onChange={handleChange}>
        <option value="Cloud">Cloud</option>
        <option value="PowerApps">PowerApps</option>
        <option value="Power BI">Power BI</option>
        <option value="Other">Other</option>
      </select>

      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" name="isVendorApp" checked={form.isVendorApp} onChange={handleChange} />
        <label className="form-check-label">Vendor App?</label>
      </div>

      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
}
