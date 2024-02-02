import { ISubscription } from './../subscription/subscription.interface';
import { createSubscriptionService } from '../subscription/subscription.service';
import { IUser } from './user.interface';
import { User } from './user.model';

export const createUserService = async (data: IUser) => {
  try {
    const result = await User.create(data);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getAllUserService = async (status: any) => {
  try {
    const query: any = {
      role: { $ne: 'admin' },
      isActive: { $ne: false },
    };
    if (status && status !== 'all') {
      query.userType = status;
    }

    return await User.find(query).select('-Password').sort({ updatedAt: -1 });
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateUserByIdService = async (id: any, data: any) => {
  const result = await User.findByIdAndUpdate(id.toString(), data);
  return result;
};

export const emailVerificationService = async (id: any, token: any) => {
  let message: string;
  const result: any = await User.findById(id);

  if (result?.token == token) {

    const subScriptionData:ISubscription= {
      user:result._id,
      subscriptions:[
        {
          status:'trial',
          site:'Mega',
          category:['login'],
          startDate:new Date() ,
          endDate: new Date(+new Date() + 3 *24 * 60 * 60 * 1000)
        },
        {
          status:'trial',
          site:'Skip',
          category:['login'],
          startDate:new Date() ,
          endDate: new Date(+new Date() + 3 *24 * 60 * 60 * 1000)
        },
        {
          status:'trial',
          site:'eros',
          category:['login'],
          startDate:new Date() ,
          endDate: new Date(+new Date() + 3 *24 * 60 * 60 * 1000)
        },
        {
          status:'trial',
          site:'tryst',
          category:['login'],
          startDate:new Date() ,
          endDate: new Date(+new Date() + 3 *24 * 60 * 60 * 1000)
        },
        {
          status:'trial',
          site:'PD',
          category:['login'],
          startDate:new Date() ,
          endDate: new Date(+new Date() + 3 *24 * 60 * 60 * 1000)
        }
      ]
    }
  await createSubscriptionService(subScriptionData)
    await User.findByIdAndUpdate(
      { _id: result._id },
      {
        $set: {
          isActive: true,
        },
      },
      { new: true },
    );
    // Create A new Trial SubScription

   
    

    message = 'Account Verification Successfully';
  } else {
    throw new Error('Email Varification Link Expired');
  }
  return { message, result };
};
