import { updateSubscriptionService } from '../subscription/subscription.service';
import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

export const createOrderService = async (data: IOrder) => {
  try {
    await User.findOneAndUpdate(
      { _id: data.userId },
      { $set: { 'Order.status': 'pending' } },
      { new: true },
    );
    const result = await Order.create(data);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
export const approvalOrderService = async (queries: any) => {
  try {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);



    const result = await Order.findOneAndUpdate(
      { _id: queries.id },
      { $set: { status: 'approved' } },
    );

    const subScriptionData = {
      status:'approved',
      site:result?.site,
      category:result?.category,
      endDate:endDate,
      user:result?.userId
    }
    await User.findOneAndUpdate({_id:result?.userId},{$set:{userType:'paid'}})
    await  updateSubscriptionService(subScriptionData)

    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getAllOrderService = async () => {
  try {
    const result = await Order.find({}).populate('userId', 'email name');
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
