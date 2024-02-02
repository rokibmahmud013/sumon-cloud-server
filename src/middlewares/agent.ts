import { Request, Response, NextFunction } from 'express';
import useragent from 'express-useragent';

export const agentMiddleware = (
  req: Request & {
    agent?: {
      ip?: string;
      browser?: string;
      version?: string;
      os?: string;
      platform?: string;
      source: string;
    };
  },
  res: Response,
  next: NextFunction,
) => {
  const ip: any = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const userAgentString = req.headers['user-agent'] || '';
  const userAgentData = useragent.parse(userAgentString);
  req.agent = {
    ip,
    browser: userAgentData.browser,
    version: userAgentData.version,
    os: userAgentData.os,
    platform: userAgentData.platform,
    source: userAgentData.source,
  };

  next();
};
