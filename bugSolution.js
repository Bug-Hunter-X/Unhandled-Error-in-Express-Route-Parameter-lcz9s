const express = require('express');
const app = express();
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Validate userId.  More robust validation may be needed in production
  if (isNaN(userId) || userId <= 0) {
    return res.status(400).send('Invalid user ID');
  }
  // ...database query or other operations using userId...
  // Example of error handling during database interaction
  db.query('SELECT * FROM users WHERE id = $1', [userId], (err, result) => {
    if (err) {
      return res.status(500).send('Database error');
    }
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.send(result.rows[0]);
  });
});
app.listen(3000, () => console.log('Server listening on port 3000'));