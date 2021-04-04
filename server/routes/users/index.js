const router = require('express').Router();
require('../../controllers');
const { addUser } = require('../../controllers');

router.post('/login');
router.get('/logout');
router.post('/signup', addUser);

module.exports = router;
