import  { Router } from 'express';
const { getCity, getImage } = require('./controller')

const router = Router();

router.get('/', getCity)
router.get('/image', getImage)

module.exports = router;