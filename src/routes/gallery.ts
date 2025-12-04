import express from 'express';
import Gallery from '../models/Gallery';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const image = new Gallery({
      ...req.body,
      createdBy: (req as any).userId
    });
    await image.save();
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
