import { Schema, Types, model } from 'mongoose';
import { IOrder } from './order.interface';

const ordersSchema = new Schema<IOrder>(
  {
    // paymentMethod: {
    //   type: String,
    //   required: true,
    // },
    // amount: {
    //   type: Number,
    //   required: true,
    // },
    site: {
      type: String,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },

    // paymentNumber: {
    //   type: String,
    //   required: true,
    // },
    // trxId: {
    //   type: String,
    //   required: true,
    // },
    status: {
      type: String,
      enum: ['pending', 'approved'],
      default: 'pending',
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const Order = model<IOrder>('Order', ordersSchema);
