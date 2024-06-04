const router = require('express').Router();

// Import the modular routers for tips and feedback

const homeRoutes = require('./homeRoutes');

router.use('/homeRoutes', homeRoutes);

module.exports = router;