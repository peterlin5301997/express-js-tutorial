const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const members = require('./MembersData'); // imports Members data
const logger = require('./middleware/Logger'); // imports Logger

const app = express();

// Init Middleware
// app.use(logger)

// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Homepage Route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Member App',
    members
  });
});

// Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
