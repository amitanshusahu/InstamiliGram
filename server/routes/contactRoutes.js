const routes = require('express').Router();
const { protect } = require("../modules/jwt");
const contactsController = require('../controllers/contactsController');
const { follow, createContact, isFollowing, unfollow, getFollowers, getNotification, getContacts } = contactsController;

routes.post('/createcontact', protect, createContact);
routes.post('/follow', protect, follow);
routes.post('/unfollow', protect, unfollow);
routes.post('/isfollowing', protect, isFollowing);
routes.get('/getfollowers', protect, getFollowers);
routes.get('/getnotification', protect, getNotification);
routes.get('/getcontacts', protect, getContacts);

module.exports = routes;