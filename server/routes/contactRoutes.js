const routes = require('express').Router();
const { protect } = require("../modules/jwt");
const contactsController = require('../controllers/contactsController');
const { follow, createContact, isFollowing, unfollow } = contactsController;

routes.post('/createcontact', protect, createContact);
routes.post('/follow', protect, follow);
routes.post('/unfollow', protect, unfollow);
routes.post('/isfollowing', protect, isFollowing);

module.exports = routes;