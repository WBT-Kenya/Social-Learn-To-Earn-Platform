const { Router } = require('express');

const authController = require('../controllers/authController'); //import

const router = Router();
router.get('/signup',authController.signup_get); //uses get request handler that sends back sign up view.
router.post('/signup',authController.signup_post); //communicate with db and add a new user
router.get('/login',authController.login_get);
router.post('/login',authController.login_post);

module.exports = router;