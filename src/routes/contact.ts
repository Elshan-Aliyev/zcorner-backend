import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('Contact form:', req.body);
    res.json({ message: 'Message received' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
