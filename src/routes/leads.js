import express from 'express';
import { createLead } from '../services/leadService.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { name, phone, source, message } = req.body;

    if (!name || !phone || !source) {
        return res.status(400).json({ error: 'Name, phone, and source are required' });
    }
    if (typeof name !== 'string' || typeof phone !== 'string' || typeof source !== 'string') {
        return res.status(400).json({ error: 'Name, phone, and source must be strings' });
    }

    try {
        const lead = await createLead({ name, phone, source, message });
        res.status(201).json({ data: lead });
    } catch (error) {
        next(error); 
    }
});

export default router;
