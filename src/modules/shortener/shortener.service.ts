import { IShortener } from './shortener.interface';
import { Shortener } from './shortener.model';

export const createShortLinkService = async (data: IShortener) => {
  try {
    const result = Shortener.create(data);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getAllShortLinkService = async () => {
  try {
    const result = await Shortener.find({}).sort({ updatedAt: -1 });
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
