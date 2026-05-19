import userModel from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (user) => jwt.sign(
  { id: user._id, email: user.email, name: user.username },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = req.file?.path || (req.file?.filename ? `/uploads/${req.file.filename}` : '');

    const newUser = await userModel.create({ username, email, password: hashedPassword, avatar });
    const token = createToken(newUser);

    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar
    };

    res.status(201).json({ success: true, message: 'User registered successfully', user: userResponse, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = createToken(user);
    const userResponse = { id: user._id, username: user.username, email: user.email, avatar: user.avatar };

    res.status(200).json({ success: true, message: 'Login successful', user: userResponse, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const me = async (req, res) => {
  try {
    const user = await userModel.findById(req.user).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, currentUser: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export { register, login, me };
