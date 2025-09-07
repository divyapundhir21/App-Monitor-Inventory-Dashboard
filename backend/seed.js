// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Application = require('./models/Application');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await Application.deleteMany({});

  const apps = [
    {
      appId: 'APP001',
      appName: 'Customer Portal',
      technicalOwner: 'John Doe',
      secondaryOwner: 'Jane Smith',
      businessOwner: 'Carol Manager',
      informationSteward: 'Dave Analyst',
      productLine: 'Retail',
      prodUrl: 'https://customer-portal.example.com/health',
      testUrl: 'https://test-customer-portal.example.com/health',
      prodResourceGroup: 'RG-Customer-Prod',
      testResourceGroup: 'RG-Customer-Test',
      techStack: ['NodeJS', 'MongoDB'],
      domain: 'Cloud',
      currentStatus: 'UNKNOWN'
    },
    {
      appId: 'APP002',
      appName: 'Inventory Tracker',
      technicalOwner: 'Alice Johnson',
      secondaryOwner: 'Bob Brown',
      businessOwner: 'Charlie CFO',
      informationSteward: 'Eve Data',
      productLine: 'Supply Chain',
      prodUrl: 'https://inventory.example.com/health',
      testUrl: 'https://test-inventory.example.com/health',
      prodResourceGroup: 'RG-Inventory-Prod',
      testResourceGroup: 'RG-Inventory-Test',
      techStack: ['.NET', 'SQL Server'],
      domain: 'Power BI',
      isVendorApp: true,
      vendorDetails: {
        vendorName: 'TCS Ltd',
        contactPerson: 'Ravi Malhotra',
        email: 'support@tcs.com',
        phone: '+91-9876543210',
        contractExpiry: new Date('2026-12-31')
      },
      currentStatus: 'UNKNOWN'
    }
  ];

  await Application.insertMany(apps);
  console.log('✅ Seed data inserted');
  mongoose.connection.close();
}

seed();