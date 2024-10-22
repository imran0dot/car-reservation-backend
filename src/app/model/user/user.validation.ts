import { z } from "zod";

// Zod schema for User validation
export const userSchema = z.object({
  userId: z.string().uuid(), // Assuming UUID for userId
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  driverLicenseNumber: z.string().optional(),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
  role: z.enum(['customer', 'admin', 'support']),
  address: z.string().optional(),
});
