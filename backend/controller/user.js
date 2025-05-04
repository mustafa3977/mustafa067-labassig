import bcrypt from 'bcrypt';
import UserModel from '../model/StudentFeedBack.js';

export class User {
    async register(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All the fields are required" });
        }
        try {
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(409).json({ message: "User is already registered" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({ name, email, password: hashedPassword });
            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            return res.status(200).json({
                message: "Login successful",
                user, // optional: exclude password before sending
            });
        } catch (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}