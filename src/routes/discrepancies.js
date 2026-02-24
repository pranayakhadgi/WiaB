const express = require('express');
const router = express.Router();
const db = require('../config/database');

// PUT /discrepancies/:id/resolve - Mark discrepancy as resolved
router.put('/:id/resolve', async (req, res) => {
    const discrepancyId = req.params.id;

    try {
        //first check if the discrepancy exists
        const check = await db.query(
            'SELECT * FROM discrepancies WHERE discrepancy_id = $1', [discrepancyId]
        );

        if (check.rowCount == 0) {
            return res.status(404).json({ error: 'Discrepancy not found' });
        }

        //update discrepancy to resolved
        const result = await db.query(
            `UPDATE discrepancies SET status = 'resolved', resolved_at = CURRENT_TIMESTAMP 
            WHERE discrepancy_id = $1 RETURNING *`, [discrepancyId]
        );

        res.json({
            message: 'Discrepancy resolved',
            discrepancy: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
