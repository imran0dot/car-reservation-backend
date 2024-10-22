import mongoose, { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt"

const userSchema = new Schema<IUser>({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString()
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    driverLicenseNumber: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 10
    },
    role: {
        type: String,
        required: true,
        enum: ['customer', 'admin']
    },
    address: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

// make the password encrypted 
userSchema.pre('save', async function (next) {
    const user = this as IUser;

    // Only hash the password if it has been modified (or is new)
    if (!user?.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        throw new Error('password did not encrypted')
    }
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};
// Creating Mongoose Model
const User = model<IUser>('User', userSchema);

export default User;