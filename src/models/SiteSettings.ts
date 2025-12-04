import mongoose, { Schema, Document } from 'mongoose';

export interface ISectionStyles {
  backgroundColor?: string;
  headerColor?: string;
  headerSize?: string;
  headerWeight?: string;
  textColor?: string;
  textSize?: string;
  textWeight?: string;
}

export interface ISiteSettings extends Document {
  heroImage: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  buttonStyle: {
    borderRadius: string;
    padding: string;
  };
  sectionStyles?: {
    [key: string]: ISectionStyles;
  };
  updatedAt: Date;
}

const SiteSettingsSchema: Schema = new Schema({
  heroImage: { type: String, required: true, default: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1200' },
  primaryColor: { type: String, default: '#007bff' },
  secondaryColor: { type: String, default: '#6c757d' },
  fontFamily: { type: String, default: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
  buttonStyle: {
    borderRadius: { type: String, default: '4px' },
    padding: { type: String, default: '0.5rem 1rem' }
  },
  sectionStyles: { type: Schema.Types.Mixed, default: {} },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
