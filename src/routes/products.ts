import express from 'express';
import Product from '../models/Product';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page, limit } = req.query;
    const query = page ? { page } : {};
    const limitNum = limit ? parseInt(limit as string) : 0;
    
    const products = await Product.find(query).limit(limitNum);
    res.json(products);
  } catch (error) {
    console.error('Products GET error:', error);
    res.status(500).json({ message: 'Server error', error: String(error) });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      createdBy: (req as any).userId
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
