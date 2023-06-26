const router = require("express").Router();
const { protect } = require('../modules/jwt');
const statusController = require('../controllers/statusController');
const { uploadStatus, getStatus } = statusController;

router.post('/uploadstatus', protect, uploadStatus);
router.get('/getstatus', protect, getStatus);

module.exports = router;