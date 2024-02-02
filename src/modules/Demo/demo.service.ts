import { IDemo } from './demo.interface';
import { Demo } from './demo.model';

export const createNoticeService = async (data: IDemo) => {
  try {
    const result = Demo.create(data);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
