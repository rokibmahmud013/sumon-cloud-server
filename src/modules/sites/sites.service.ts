import { ISites } from './sites.interface';
import { WebLink } from './sites.model';

export const createSitesService = async (data: ISites) => {
  try {
    const result = WebLink.create(data);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
export const deleteSitesService = async (id: string) => {
  try {
    const result = WebLink.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
export const getAllSitesService = async (query: any) => {
  try {
    const result = WebLink.find(query);
    return result;
  } catch (error) {
    throw new Error(error as any);
  }
};
