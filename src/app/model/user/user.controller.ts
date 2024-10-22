import { catchAsync } from "../../features/catchAsync";
import { createToken } from "../../features/createToken";
import User from "./user.model";
import sendResponse from "../../features/sendResponse";
import { Request, Response } from "express";


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
      const token = createToken({ 
        userId: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    });

      // Set the JWT as a cookie
      res.cookie('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
     });

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
    }

    // Create JWT token
    const token = createToken({ 
        userId: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
    });
    // Set the JWT as a cookie
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

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
