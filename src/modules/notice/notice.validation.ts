import { z } from 'zod';

export const noticeValidationSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
});
