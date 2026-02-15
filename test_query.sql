SELECT
o.name AS club,
i.name AS item,
ri.quantity_requested,
ri.quantity_returned,
d.type AS issue,
d.status AS flag_status
FROM organizations o
JOIN reservations r ON o.organization_id = r.organization_id
JOIN reservation_items ri ON
r.reservation_id = ri.reservation_id
JOIN items i ON ri.item_id = i.item_id
LEFT JOIN discrepancies d ON
ri.reservation_item_id = d.reservation_item_id 
WHERE d.type = 'ghost_return';
