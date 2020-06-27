import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Please add an email']
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

export default mongoose.model('User', UserSchema);