import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  productLink?: string;
  mainImage: string;
  additionalImages: string[];
  page: 'wishlist' | 'marketplace';
  buyNowLink?: string;
  buttons: {
    addToCart: boolean;
    view: boolean;
    giftCard: boolean;
    donate: boolean;
    buyNow: boolean;
    tradeOffer: boolean;
  };
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  productLink: { type: String },
  mainImage: { type: String, required: true },
  additionalImages: [{ type: String }],
  page: { type: String, enum: ['wishlist', 'marketplace'], required: true },
  buyNowLink: { type: String },
  buttons: {
    addToCart: { type: Boolean, default: false },
    view: { type: Boolean, default: false },
    giftCard: { type: Boolean, default: false },
    donate: { type: Boolean, default: false },
    buyNow: { type: Boolean, default: false },
    tradeOffer: { type: Boolean, default: false }
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IProduct>('Product', ProductSchema);
