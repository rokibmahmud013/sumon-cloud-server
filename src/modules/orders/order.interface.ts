export interface IOrder {
  // paymentMethod: string;
  // paymentNumber: string;
  // amount: number;
  site: string;
  category: [string];
  // trxId: string;
  userId: any;
  status: 'pending' | 'approved';
}
