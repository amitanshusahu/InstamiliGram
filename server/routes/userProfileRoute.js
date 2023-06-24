const router = require('express').Router();
const createprofile = require('../controllers/userProfileController');
const { createUserProfile, getUserProfile } = createprofile;
const { protect } = require("../modules/jwt");

router.post('/createprofile', protect, createUserProfile);
router.post('/getprofile', getUserProfile);

module.exports = router;