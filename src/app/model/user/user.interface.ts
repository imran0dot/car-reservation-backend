// User Interface
export interface IUser {
    isModified(arg0: string): unknown;
    userId: string;
    name: string;
    email: string;
    password: string;
    driverLicenseNumber?: string; 
    phoneNumber: string;
    role: 'customer' | 'admin';
    address?: string; 
    comparePassword: (password: string) => boolean;
  }
  