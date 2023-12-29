const { Signup, Login, CheckPassword, UpdatePassword } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login)
router.post('/', userVerification)
router.get('/password/:id', CheckPassword);
router.put('/password/:id', UpdatePassword);

module.exports = router;