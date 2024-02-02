// import {io} from '../../index';
import { io } from '../../index';
import IInfo from './information.interface';
import { Information } from './information.model';

export const createInfoService = async (data: IInfo) => {
  try {
    const result = await Information.create(data);

    const userId = data?.user.toString();
    io.to(userId).emit('infoUpdate', { message: 'Data updated', data: result });
    io.emit('conversion', { message: 'Data updated', data: result });
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getAllInfoService = async (query: any) => {
  try {
    const result = await Information.aggregate([
      { $match: query },
      { $sort: { updatedAt: -1 } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: 'id',
          as: 'userArray',
        },
      },
      {
        $addFields: {
          user: {
            $cond: {
              if: { $eq: ['$userArray', []] },
              then: { name: null, email: null, _id: null },
              else: {
                $arrayElemAt: ['$userArray', 0],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: {
            name: '$user.name',
            email: '$user.email',
            _id: '$user._id',
          },
          email: 1,
          password: 1,
          repassword: 1,
          otp: 1,
          agent: 1,
          siteName: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    io.emit('allInfoUpdate', { message: 'Data updated', data: result });

    return result; // Assuming there might be multiple matching documents
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateInfoService = async (id: any, data: IInfo) => {
  try {
    const result = await Information.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { upsert: true, new: true },
    );

    const userId = data?.user?.toString();
    io.to(userId).emit('infoUpdate', {
      message: 'Data  updated',
      data: result,
    });
    io.emit('conversion', { message: 'Data updated', data: result });

    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
