const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());

// Enable CORS
app.use(cors(
    {
        origin: '*'
    }
));

// GET /mentors: Fetch all mentors
app.get('/mentors', (req, res) => {
    db.all('SELECT * FROM Mentors', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            mentors: rows
        });
    });
});

// POST /bookings: Create a new booking
app.post('/bookings', (req, res) => {
    const { student_id, mentor_id, booking_time } = req.body;
    const sql = `INSERT INTO Bookings (student_id, mentor_id, booking_time) VALUES (?, ?, ?)`;

    db.run(sql, [student_id, mentor_id, booking_time], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            booking_id: this.lastID
        });
    });
});

// GET /bookings: Retrieve bookings for a student or mentor
app.get('/bookings', (req, res) => {
    const { student_id, mentor_id } = req.query;

    let sql = 'SELECT * FROM Bookings WHERE 1=1';
    const params = [];

    if (student_id) {
        sql += ' AND student_id = ?';
        params.push(student_id);
    }

    if (mentor_id) {
        sql += ' AND mentor_id = ?';
        params.push(mentor_id);
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            bookings: rows
        });
    });
});

// POST /mentors: Add a new mentor
app.post('/mentors', (req, res) => {
    const { name, availability, areas_of_expertise, is_premium } = req.body;
    const sql = `INSERT INTO Mentors (name, availability, areas_of_expertise, is_premium) VALUES (?, ?, ?, ?)`;

    db.run(sql, [name, availability, areas_of_expertise, is_premium], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            mentor_id: this.lastID
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
