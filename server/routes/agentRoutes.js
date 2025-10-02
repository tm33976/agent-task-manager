const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, agentController.createAgent);
router.get('/', authMiddleware, agentController.getAllAgents);

module.exports = router;