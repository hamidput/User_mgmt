const express = require('express');
const app = express();
const port = 3000; // Choose your desired port

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
const teamMembersRouter = require('./routes/teamMembers');
app.use('/team-members', teamMembersRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
