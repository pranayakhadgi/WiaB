const express = require('express');
const router = express.Router();
const db = require('.../config/database');

// POST /reservations - Create new reservation
router.post('/', async (req, res) => {

    //instantiate the vairables from the reqwuest body
    const  { organization_id, location_id, start_time, end_time, items } = req.body;

    try {
        await db.query('BEGIN');

        // Create reservation
        const resResult = await db.query(
            `INSERT INTO reservations (organization_id, location_id, start_time,
            end_time, status)
            VALUES ($1, $2, $3, $4, 'pending') 
            RETURNING *`,
            
    }

    });
