const express = require('express');
const router = express.Router();
const db = require('../config/database');
// removed stray node-pg-migrate import

// GET /items - lists all equipement with locations
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT
             i.item_id,
             i.name,
             i.category,
             i.status,
             l.name as location_name,
             l.type as location_type 
            FROM items i
            LEFT JOIN locations l ON i.current_location_id = l.location_id
            ORDER BY i.name 
        `);

        res.json({
            count: result.rowCount,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
