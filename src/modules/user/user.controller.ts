import { NextFunction, Request, Response } from 'express';
import { UserValidationSchema } from './user.validation';
import {
  createUserService,
  emailVerificationService,
  findUserByEmail,
  getAllUserService,
} from './user.service';
import { genarateToken } from '../../utils/token';
import { invalidateToken } from '../../middlewares/verifyToken';
import { User } from './user.model';
import { sendMail } from '../../utils/emailSender';
import { expiredFunc } from '../subscription/subscription.service';

// const expiredSubScription = (date: Date): boolean => {
//   const currentDate = new Date();
//   return currentDate > date;
// };

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // creating a schema validation using Zod
    const parseData: any = UserValidationSchema.parse(req.body);
    const user = await createUserService(parseData);
    const token = genarateToken(user);
    user.token = token;
    const data = await User.findByIdAndUpdate(
      { _id: user._id },
      {
        $set: {
          token: token,
        },
      },
      { new: true },
    );

    const message = `${process.env.BASE_URL}/auth/verify/${data?._id}/${token}`;

    await sendMail(user.email, 'Verify Email', message);

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Please Check your Email To Verify Your Account',
      data: data,
    });
  } catch (error: any) {
    next(error);
  }
};

// for login controller

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: 'fail',
        message: 'Please provide your credentials',
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        status: 'fail',
        error: 'No user found. Please create an account',
      });
    }

    const isPasswordValid = (user as any).comparePassword(
      password,
      user?.password,
    );

    if (!isPasswordValid) {
      return res.status(403).json({
        status: 'fail',
        message: 'Password is not correct',
      });
    }

    // if (!user.isActive) {
    //   return res.status(401).json({
    //     status: 'fail',
    //     error: 'Please Verify Your Account',
    //   });
    // }

    const prevToken = user?.token;

    if (prevToken) {
      invalidateToken(prevToken);
    }
    const token = genarateToken(user);
    user.token = token;
    await User.findByIdAndUpdate(user._id, { token });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const { password: pwd, ...others } = user.toObject();

    // make expired For All Plans And Progammes
    if (user.isActive) {
      await expiredFunc(user?._id);
    }

    return res.status(200).json({
      status: 'success',
      message: 'Successfully logged in',
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user: any = await findUserByEmail((req as any)?.user?.email);

    if (user.isActive) {
      await expiredFunc(user?._id);
    }

    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status } = req.query;
    const user = await getAllUserService(status);

    return res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = (req?.headers as any)?.authorization?.split(' ')?.[1];

    if (token) {
      invalidateToken(token);
    }

    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, token } = req.params;
    await emailVerificationService(id, token);
    return res.render('success', {
      loginPath: `${process.env.FRONTEND_URL}/signin`,
    });
  } catch (error) {
    next(error);
  }
};

export const resendEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
try {
  const {id} = req.query
  const user:any = await User.findById(id)
  const message = `${process.env.BASE_URL}/auth/verify/${id}/${user.token}`;

  await sendMail(user.email, 'Verify Email', message);

  return res.status(201).json({
    status: 201,
    success: true,
    message: 'Please Check your Email To Verify Your Account',
    
  });
} catch (error) {
  next(error);
}
};

export const changeEmailAndVerify = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
try {
  const {id} = req.query
  const user:any = await User.findOneAndUpdate(
    {_id:id},
    {$set:{email:req.body.email}},
    {new: true}
  )
  const message = `${process.env.BASE_URL}/auth/verify/${id}/${user.token}`;

  await sendMail(user.email, 'Verify Email', message);

  return res.status(201).json({
    status: 201,
    success: true,
    message: 'Please Check your Email To Verify Your Account',
    
  });
} catch (error) {
  next(error);
}
};
