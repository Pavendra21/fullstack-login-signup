const express = require("express")
const router = express.Router()
const upload = require('../multer/multerConfig')


const { signup, login, remove, edit, logout, uploadFile } = require("../Controllers/Handle")
const { getUser } = require("../Authentication/jwt")

router.post('/signup', upload.single('image'), signup);
router.post('/login', login)
router.delete('/:id', remove)
router.get('/profile', getUser)
router.put('/profile/:id', edit);
router.get('/logout', logout)
router.post('/upload', upload.single('image'), uploadFile);

module.exports = router;