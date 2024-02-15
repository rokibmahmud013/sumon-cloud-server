export interface ISubSchema {
  status: 'pending' | 'approved' | 'expired' | 'trial';
  site: string;
  category: string[];
  startDate: Date;
  endDate: Date;
}

export interface ISubscription {
  user: any;
  subscriptions: ISubSchema[];
}
