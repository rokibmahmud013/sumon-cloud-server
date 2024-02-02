import { INotice } from './notice.interface';
import { Notice } from './notice.model';

export const createNoticeService = async (data: INotice) => {
  try {
    const result = Notice.create(data);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
export const deleteNoticeService = async (id: string) => {
  try {
    const result = Notice.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
export const getAllNoticeService = async () => {
  try {
    const result = Notice.find({}).sort({ updatedAt: -1 });
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
