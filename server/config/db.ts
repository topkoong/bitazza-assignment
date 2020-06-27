import { connect } from 'mongoose';
import { mongoUri } from '.';

const connectDB = async () => {
    const conn = await connect(mongoUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;