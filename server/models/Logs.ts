import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;
const UserLogsSchema: Schema = new Schema({
    name: {
        type: String,
        default: 'Logs'
    },
    userLogs: [{
        user: {
            type: ObjectId,
            ref: 'User',
        },
        loggedInAt: { type: Date, default: Date.now },
    }]
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
});

export default mongoose.model('Logs', UserLogsSchema);