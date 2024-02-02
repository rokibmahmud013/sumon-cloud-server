import { Subscription } from './../subscription/subscription.model';
import { ISubscription } from './subscription.interface';
export const createSubscriptionService = async (data: ISubscription) => {
    try {
      const result = await Subscription.create(data);
      return result;
    } catch (error) {
      throw new Error(error as any);
    }
  };

  export const getAllSubscriptionByIdService = async (id:any) => {
    try {
      const result = await Subscription.findOne({user:id}).populate('user', 'email name');
      return result;
    } catch (error) {
      throw new Error(error as any);
    }
  };

  export const getAllSubscriptionService = async (status:any) => {
    const query: any = {
      role: { $ne: 'admin' },
      isActive: { $ne: false },
    };
    if (status && status !== 'all') {
      query['subscription.status'] = status;
    }
    try {
      const result = await Subscription.find({}).populate('user', 'email name');
      return result;
    } catch (error) {
      throw new Error(error as any);
    }
  };

  export const updateSubscriptionService = async (data:any) => {
    try {

  
      await Subscription.findOneAndUpdate(
        { user: data?.user, 'subscriptions.site': data?.site },
        {
            $set: {
                'subscriptions.$.status': 'approved',
                'subscriptions.$.category': data.category,
                'subscriptions.$.endDate': data.endDate,
            },
        },
        { new: true },
    );
    
  
      const result = await Subscription.findOneAndUpdate(
        { user: data.user },
        { $set: { status: 'approved' } },
      );
      return result;
    } catch (error) {
      throw new Error(error as any);
    }
  };





  export const expiredFunc = async (id: any) => {
      try {
          const currentDate = new Date();
  
          const doc = await Subscription.findOne({user: id});
          
  
          if (!doc) throw new Error(`No document found with id ${id}`);
  
          doc.subscriptions = doc.subscriptions.map(subscription => {
              if (subscription.endDate < currentDate) {
                  subscription.status = "expired";
              }
              return subscription;
          });
  
          await doc.save();
  
          return doc;
      } catch (err:any) {
          throw new Error(err);
      }
  }
  