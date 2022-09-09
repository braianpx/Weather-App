import  { Router } from 'express';
const { getCity } = require('./controller')

const router = Router();

router.get('/', getCity)

module.exports = router;