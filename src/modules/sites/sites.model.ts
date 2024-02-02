import { Schema, model } from 'mongoose';
import { ISites } from './sites.interface';

const siteSchema = new Schema<ISites>(
  {
    siteUrl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sites: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const WebLink = model<ISites>('WebLink', siteSchema);
