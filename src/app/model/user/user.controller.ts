import { catchAsync } from "../../features/catchAsync";
import { createToken } from "../../features/createToken";
import User from "./user.model";
import sendResponse from "../../features/sendResponse";
import { Request, Response } from "express";
import config from "../../config";


// Register route handler 
export const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phoneNumber } = req.body as unknown as {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
  };

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: 'User already exists.' });
    return;
  }

  // Create a new user document
  const newUser = new User({
    name,
    email,
    password,
    phoneNumber,
    role: 'customer'
  });

  // Save the new user
  await newUser.save();

  // Create JWT token
  const tokenUserData = {
    userId: newUser._id.toString(),
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
  }

  
  // Create JWT token
  const accessToken = createToken(tokenUserData, config.jwt_secret as string, '1h');
  const refreshToken = createToken(tokenUserData, config.jwt_refresh as string, '365d');
  // Set the JWT as a cookie
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: config.node_env === 'production' });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: config.node_env === 'production' });

  // Send success response
  sendResponse(res, {
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
      },
    },
    statusCode: 200,
    success: true,
    message: 'User registered successfully',
  });
});


// Login route handler

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    sendResponse(res, {
      data: {},
      statusCode: 404,
      success: false,
      message: 'Invalid username or password',
    });
    return;
  };



  const isPasswordValid = await user.comparePassword!(password as string);
  if (!isPasswordValid) {
    sendResponse(res, {
      data: {},
      statusCode: 404,
      success: false,
      message: 'Invalid username or password',
    });
    return;
  };

  const tokenUserData = {
    userId: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  }

  // Create JWT token
  const accessToken = createToken(tokenUserData, config.jwt_secret as string, '1h');
  const refreshToken = createToken(tokenUserData, config.jwt_refresh as string, '365d');
  // Set the JWT as a cookie
  res.cookie('accessToken', accessToken, { httpOnly: true, secure: config.node_env === 'production' });
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: config.node_env === 'production' });

  // Send success response
  sendResponse(res, {
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    },
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
  });
});
