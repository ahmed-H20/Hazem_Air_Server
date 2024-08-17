const express = require('express')
const router = express.Router();

const userController = require("../controllers/userController");

router.get('/', userController.getAllUsers);
router.get('/:id', userController.findUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateClient);
router.patch('/', userController.doanloadExelData);

module.exports = router;