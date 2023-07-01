const router = require('express').Router();
const createprofile = require('../controllers/userProfileController');
const { createUserProfile, getUserProfile, me } = createprofile;
const { protect } = require("../modules/jwt");

router.post('/createprofile', protect, createUserProfile);
router.post('/getprofile', getUserProfile);
router.get('/me', protect, me)

module.exports = router;