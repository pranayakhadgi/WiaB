const express = require('express');
const router = express.Router();
const db = require('../config/database');

// POST /reservations - Create new reservation
router.post('/', async (req, res) => {
    // instantiate the variables from the request body
    const { organization_id, location_id, start_time, end_time, items } = req.body;

    try {
        await db.query('BEGIN');

        // Create reservation
        const resResult = await db.query(
            `INSERT INTO reservations (organization_id, location_id, start_time, end_time, status)
            VALUES ($1, $2, $3, $4, 'pending') 
            RETURNING *`,
            [organization_id, location_id, start_time, end_time]
        );

        const reservationId = resResult.rows[0].reservation_id;

        // If items are provided, link them
        if (items && Array.isArray(items)) {
            for (const item of items) {
                await db.query(
                    `INSERT INTO reservation_items (reservation_id, item_id, quantity_requested, quantity_returned)
                    VALUES ($1, $2, $3, 0)`,
                    [reservationId, item.item_id, item.quantity_requested || 1]
                );
            }
        }

        await db.query('COMMIT');
        res.status(201).json(resResult.rows[0]);
    } catch (err) {
        await db.query('ROLLBACK');
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
