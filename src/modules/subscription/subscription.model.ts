
import { Schema, Types, model } from 'mongoose';
import { ISubSchema, ISubscription } from './subscription.interface';

const subSchema = new Schema<ISubSchema>({
    status: {
        type: String,
        enum: ['pending', 'approved','expired','trial'],
        default: 'pending',
      },
      site: {
        type: String,
        required: true,
      },
      category: {
        type: [String],
        required: true,
      },
      startDate:{
        type: Date,
        default:new Date(),
      },
      endDate: {
        type: Date,
        default:new Date(),
      }
},{
    timestamps: true
})

const subscriptionSchema = new Schema<ISubscription>(
  {
    user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    subscriptions:[subSchema]
    
  },
  { timestamps: true },
);


subscriptionSchema.set('toObject', { virtuals: true });
subscriptionSchema.set('toJSON', { virtuals: true });


export const Subscription = model<ISubscription>('Subscription', subscriptionSchema);
