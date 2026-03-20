const express = requiew('express');
const router = express.Router();
const { getTasks, createTask } = require('../controllers/taskController');

router.get('/', getTasks);
router.post('/', createTask);

module.exports = router; 