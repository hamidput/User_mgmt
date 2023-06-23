const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all team members
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_members');
    res.json(rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new team member
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  try {
    const { rows } = await pool.query(
      'INSERT INTO team_members (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a team member
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const { rows } = await pool.query(
      'UPDATE team_members SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a team member
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query('DELETE FROM team_members WHERE id = $1', [id]);
    res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
