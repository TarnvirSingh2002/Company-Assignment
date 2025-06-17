import bcrypt  from('bcryptjs');
import jwt from('jsonwebtoken');
import User from('../models/User');

// --- Register User ---
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user', // Default to 'user' if not specified
        });

        // Generate JWT
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

// --- Login User ---
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = { user: { id: user.id, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.json({ message: 'Logged in successfully', token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};