import express from 'express';
import SiteSettings from '../models/SiteSettings';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

const defaultSettings = {
  heroImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200',
  primaryColor: '#007bff',
  secondaryColor: '#6c757d',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  buttonStyle: {
    borderRadius: '4px',
    padding: '0.5rem 1rem'
  }
};

router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(defaultSettings);
    }
    res.json(settings);
  } catch (error) {
    console.error('Settings GET error:', error);
    res.status(500).json({ message: 'Server error', error: String(error) });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;
    let settings = await SiteSettings.findOne();
    
    if (!settings) {
      settings = await SiteSettings.create({ ...defaultSettings, ...updates });
    } else {
      Object.assign(settings, updates);
      settings.updatedAt = new Date();
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    console.error('Settings PUT error:', error);
    res.status(500).json({ message: 'Server error', error: String(error) });
  }
});

export default router;
