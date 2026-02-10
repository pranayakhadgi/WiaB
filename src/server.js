require('dotenv').config();

const express = require('express');
const db = require('./config/database');


//THE HOLY BACKENDDD
const app = express();
const organizationsRouter = require('./routes/organizations');
app.use('/organizations', organizationsRouter);
const PORT = process.env.PORT || 3000;

//middleware typshit
app.use(express.json());

//route placeholder
app.get('/', (req, res) => {
res.json({ message: 'Equipment Inventory API' });
});

app.get('/health', async(req, res) => {
try {
const dbResult = await 
db.query('SELECT NOW() as time');
//--------------------------------------
res.json({
status: 'healthy',
timestamp: new
Date().toISOString(),
database: {
connected: true,
serverTime: dbResult.rows[0].time
}
});
} catch(err) {
res.status(503).json({
status: 'unhealthy',
timestamp: new
Date().toISOString(),
database: {
connected: false,
error: err.message
}
});
}
});

//Start server
app.listen(PORT, () => {
console.log(`Server initiated on port #${PORT}`);
});
