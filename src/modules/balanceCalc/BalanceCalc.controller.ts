

import { NextFunction, Request, Response } from "express"
import { Subscription } from "../subscription/subscription.model";

export const getAdminBalanceController = async(req:Request,res:Response,next:NextFunction) => {
  try {
    const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentYear = now.getFullYear();
const currentMonthName = now.toLocaleString('default', { month: 'long' });



const subscription = await Subscription.aggregate([
    {
       $match: {
         updatedAt: {
           $gte: new Date(currentYear, currentMonth - 1, 1),
           $lt: new Date(currentYear, currentMonth, 1)
         },
         "subscriptions.status": "approved",
         
       }
    }
   ]);
   

// const totalSubscription =  subscription.subscriptions.map((sub:any) => 
const totalLength = subscription.reduce((total:any, sub:any) => {
    return total + sub.subscriptions.length;
}, 0);


    res.status(200).json({
        status: 200,
        success: true,
        message: 'success',
        totalSell: totalLength,
        adminAmount:totalLength * 500,
        totalUser:subscription.length,
        monthName: currentMonthName
       
       
      });
  } catch (error) {
    next(error)
  }
}