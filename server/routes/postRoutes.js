const routes = require('express').Router();
const { protect } = require("../modules/jwt");
const postController = require('../controllers/postController');
const {savepost, getFeed, userPost} = postController;

routes.post('/savepost', protect, savepost);
routes.get('/getfeed', protect, getFeed);
routes.post('/userpost', userPost);

module.exports = routes;