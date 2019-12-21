const express = require('express');
const path = require('path');
const members = require('./MembersData'); // imports Members data
const logger = require('./middleware/Logger'); // imports Logger

const app = express();

// Init Middleware
app.use(logger)

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
