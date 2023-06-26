//Routes
export const postLogin = 'http://localhost:3000/api/auth/login';
export const postSignup = 'http://localhost:3000/api/auth/signup';
export const postCreateProfile = 'http://localhost:3000/api/user/createprofile';
export const postCreateContact = 'http://localhost:3000/api/contact/createcontact';
export const postGetProfile = 'http://localhost:3000/api/user/getprofile';
export const postSavePost = 'http://localhost:3000/api/post/savepost';
export const getFeed = 'http://localhost:3000/api/post/getfeed';
export const postGetUserPost = 'http://localhost:3000/api/post/userpost';
export const postIsFollowing = 'http://localhost:3000/api/contact/isfollowing';
export const postFollow = 'http://localhost:3000/api/contact/follow';
export const postUnFollow = 'http://localhost:3000/api/contact/unfollow';
export const postUploadStauts = 'http://localhost:3000/api/status/uploadstatus';
export const getStauts = 'http://localhost:3000/api/status/getStatus';

// User / auth
export const TOKEN = localStorage.getItem("TOKEN");
export const USERNAME = localStorage.getItem("USERNAME");
export const USER_PROFILE = JSON.parse(localStorage.getItem("USER_PROFILE"));