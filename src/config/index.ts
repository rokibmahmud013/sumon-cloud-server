import 'dotenv/config';

export const mongoUrl: any = process.env.mongoDB_URI;
export const port = process.env.PORT;
export const token_secret: any = process.env.TOKEN_SECRET;
