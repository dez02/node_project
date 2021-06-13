const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

router.get('/', authCtrl.getUsers);
router.get('/me', verifyToken, authCtrl.getUsers);




module.exports = router;