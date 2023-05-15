const express = require('express');
const router = express.Router();
const {
    getusers,
    CreatePost,
    getRelatedPosts,
    getSinglePost
} = require('../controllers/index2.js');

//get all posts
router.route('/').get(getusers);

//Post posts wtf
router.route('/').post(CreatePost);


router.route('/Relatedposts/:username').get(getRelatedPosts);

router.route('/:id').get(getSinglePost);

module.exports = router;