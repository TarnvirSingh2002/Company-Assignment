import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // Hashed
    role: { type: String, enum: ['host', 'guest'], default: 'guest' }
});

export default mongoose.model('User', userSchema);
