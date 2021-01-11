import mongoose, { Schema, Document } from 'mongoose';

export interface Address extends Document {
    name: string;
    coordinates: [number]
}

export interface IUser extends Document {
    name: string;
    dob: string;
    description: string;
    createdAt: Date;
    address: Address;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    description: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    address: {
        name: { type: String },
        coordinates: { type: [Number] }
    }
});

// Export the model and return IUser interface
export default mongoose.model<IUser>('User', UserSchema);