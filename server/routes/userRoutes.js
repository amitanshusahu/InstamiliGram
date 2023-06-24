const router = require('express').Router();

const userController = require('../controllers/userController');
const { login, signup } = userController;

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;