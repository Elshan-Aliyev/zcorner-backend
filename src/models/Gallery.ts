import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title?: string;
  description?: string;
  badge?: string;
  image: string;
  textColor?: string;
  textSize?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema({
  title: { type: String },
  description: { type: String },
  badge: { type: String },
  image: { type: String, required: true },
  textColor: { type: String, default: '#000000' },
  textSize: { type: String, default: 'medium' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IGallery>('Gallery', GallerySchema);
