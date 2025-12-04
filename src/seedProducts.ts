import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';
import User from './models/User';

dotenv.config();

const sampleProducts = [
  {
    title: "Sample Wishlist Item 1",
    description: "Add your wishlist item description here",
    price: 29.99,
    mainImage: "https://via.placeholder.com/300",
    additionalImages: [],
    page: "wishlist",
    buttons: {
      giftCard: true,
      donate: true,
      view: true
    }
  },
  {
    title: "Sample Wishlist Item 2",
    description: "Add your wishlist item description here",
    price: 49.99,
    mainImage: "https://via.placeholder.com/300",
    additionalImages: [],
    page: "wishlist",
    buttons: {
      giftCard: true,
      donate: true,
      view: true
    }
  },
  {
    title: "Sample Marketplace Item 1",
    description: "Add your marketplace item description here",
    price: 15.99,
    mainImage: "https://via.placeholder.com/300",
    additionalImages: [],
    page: "marketplace",
    buttons: {
      addToCart: true,
      buyNow: true,
      tradeOffer: true,
      view: true
    }
  }
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || '';
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create admin user if doesn't exist
    let adminUser = await User.findOne({ email: 'admin@zcorner.com' });
    if (!adminUser) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@zcorner.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin user created');
    }

    // Add products
    for (const product of sampleProducts) {
      const newProduct = new Product({
        ...product,
        createdBy: adminUser._id
      });
      await newProduct.save();
      console.log(`Created: ${product.title}`);
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
