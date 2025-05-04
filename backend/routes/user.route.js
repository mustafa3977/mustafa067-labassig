import express from 'express';
import { User } from '../controller/user.js';

const router = express.Router();

const user = new User();

// Routes
router.post('/user/register', (req, res) => user.register(req, res));
router.post('/user/login', (req, res) => user.login(req, res));

export default router;