import  { Router } from 'express';
const { getCity, getCities } = require('./controller')

const router = Router();

router.get('/', getCity)
router.get('/all', getCities)

module.exports = router;